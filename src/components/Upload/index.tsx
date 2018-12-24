/*
 <Upload
    ref="upload"
    uploadTypes={[".zip", ".rar"]}
    size={102400}
 />
*/
import * as React from "react";
if (typeof window !== "undefined") {     // tslint:disable-next-line:no-var-requires     require("./style.css"); }
    export interface IProps {
        uploadText?: string | JSX.Element;
        multiple?: boolean;
        uploadTypes?: string[];
        size?: number;
        helpInfo?: string;
        src?: string | ArrayBuffer;
        getName?: (name?: string) => {};
        getImg?: (img?: File[]) => void;
        accept?: string;
    }
    export interface IStates extends IProps {
        file: File[];
        errorInfo?: string;
        fileInfo?: string;
        imgShow: boolean;
    }
    export default class Upload extends React.Component<IProps, IStates> {
        private multiple: boolean = this.props.multiple || false;
        constructor(props?: IProps) {
            super(props);
            this.state = {
                file: null,
                imgShow: true,
                src: props.src,
            };
        }
        public isType(name: string) {  //验证格式的正则
            let result = true;
            const _name = name.split(".")[0];
            const types = this.props.uploadTypes;// tslint:disable-line:strict-boolean-expressions
            if (this.props.getName) {
                this.props.getName(_name);
            }
            if (types) {
                result = types.some((item: string) => {
                    const reg = new RegExp(`${item}$`, "im");// tslint:disable-line:strict-boolean-expressions
                    return reg.test(name);
                });
                if (result === false) {
                    if (this.props.getName) {
                        this.props.getName();
                    }
                    this.setState({
                        errorInfo: "此文件格式不符合要求",
                    });
                }
            }
            return result;
        }
        public isPic(name: string) { //验证是否图片
            const types = [".png", ".jpg", ".gif", ".jpeg", ".bmp"];// tslint:disable-line:strict-boolean-expressions
            return types.some((item: string) => {
                const reg = new RegExp(`${item}$`, "im");// tslint:disable-line:strict-boolean-expressions
                return reg.test(name);
            });
        }
        public isOverSize(name: string, size: number) { //验证大小
            const setSize = this.props.size;
            const _name = name.split(".")[0];
            if (this.props.getName) {
                this.props.getName(_name);
            }
            let result = true;
            if (setSize) {
                const maxSize = setSize * 1024;
                if (size > maxSize) {
                    result = false;
                    if (this.props.getName) {
                        this.props.getName();
                    }
                    this.setState({
                        errorInfo: `大小不超过${this.props.size / 1024}MB`,
                    });
                }
            }
            return result;
        }
        public change(e: any) {
            e.preventDefault();
            const target = e.target;
            const files = target.files;
            let fileArray: File[] = [];
            for (let i = 0, len = files.length; i < len; i++) {
                fileArray.push(files[i]);
            }
            fileArray.forEach((file: File, i: number) => {
                const name = file.name;   //验证格式
                const isType = this.isType(name);
                if (isType === false) {
                    fileArray = [];
                    return;
                }
                const isOverSize = this.isOverSize(name, file.size);
                if (isOverSize === false) {
                    fileArray = [];
                    return;
                }
                this.setState({
                    errorInfo: "",
                });
                if (this.isPic(name)) {    //如果是图片就默认第一张预览
                    const reader = new FileReader();
                    reader.onload = (event: ProgressEvent) => {
                        this.setState({
                            src: reader.result,
                        });
                    };
                    reader.readAsDataURL(fileArray[i]);
                    return;
                }
            });
            if (fileArray && fileArray.length > 0) {
                this.setState(
                    {
                        file: fileArray,
                    },
                    () => {
                        const img = this.uploadFile();
                        if (this.props.getImg) {
                            this.props.getImg(img);
                        }
                    }
                );
                if (this.props.multiple) {
                    this.setState({
                        fileInfo: `已选择了${fileArray.length}个文件`,
                    });
                } else {
                    this.setState({
                        fileInfo: `已选择了${fileArray[0].name}`,
                        imgShow: true,
                    });
                }
            }
            target.value = null;
        }
        public uploadFile() {
            if (!this.state.file) {
                this.setState({
                    errorInfo: "请先选择文件",
                });
            } else {
                return this.state.file;
            }
        }
        public delFile() {
            if (this.props.getName) {
                this.props.getName();
            }
            if (this.props.getImg) {
                this.props.getImg();
            }
            this.setState({
                src: "",
                fileInfo: "已选择了0个文件",
                file: null,
                imgShow: false,
            });
        }
        public resetContent() {
            this.setState({
                src: "",
                fileInfo: "",
                file: null,
                errorInfo: "",
            });
        }
        public render() {
            const { imgShow, src } = this.state;
            const { accept } = this.props;
            let uploadInfo: string;
            if (this.props.uploadTypes && this.props.uploadTypes.length > 0) {
                uploadInfo = `支持${this.props.uploadTypes.join("/")}的文件`;
                if (this.props.size) {
                    uploadInfo += `,大小不超过${this.props.size / 1024} MB`;
                }
            }
            let errorInfo: any = "";
            if (this.state.errorInfo) {
                errorInfo = <div className="bottom-error">{this.state.errorInfo}</div >;
            }
            return (
                <div className="upload">
                    <div className="upload-content">
                        <div className="content-button">
                            <button className="button-add">{this.props.uploadText ? this.props.uploadText : "+添加文件"}</button>
                        </div>
                        <div className="content-bottom">
                            {errorInfo || this.state.fileInfo}
                        </div>
                        {uploadInfo && this.props.helpInfo ? <div className="content-info">
                            <div className="info-bottom">
                                <div>{uploadInfo}</div>
                                <div className="bottom-help">{this.props.helpInfo}</div>
                            </div>
                        </div> : null}
                    </div>
                    {src ? <div className="upload-file-content">
                        <div className="content-img">
                            <img src={(this.state.src) as string} />
                        </div>
                        {imgShow ? <div className="imgShadow">
                            <i className="iconfont icon-close" onClick={() => { this.delFile(); }}></i>
                        </div> : null}
                    </div> : null}
                    <input onChange={(e) => { this.change(e); }} type="file" multiple={this.multiple} accept={accept} />
                </div>
            );
        }

    }
