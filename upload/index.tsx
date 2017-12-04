/*
 <Upload
    ref="upload"
    uploadTypes={[".zip", ".rar"]}
    size={102400}
 />
*/
import * as React from "react";
if (typeof window !== "undefined") {
    require("./style.css");// tslint:disable-line:no-var-requires
}
export interface IProps {
    multiple?: boolean;
    uploadTypes?: string[];
    size?: number;
}
export interface IStates extends IProps {
    file: File[];
    src?: string;
    errorInfo?: string;
    fileInfo?: string;
}
export class Upload extends React.Component<IProps, IStates> {
    private multiple: boolean = this.props.multiple || false;
    constructor(props?: IProps) {
        super(props);
        this.state = {
            file: [],
        };
    }
    public isType(name: string) {  //验证格式的正则
        const types = this.props.uploadTypes;// tslint:disable-line:strict-boolean-expressions
        return types.some((item: string) => {
            const reg = new RegExp(item + "$", "im");// tslint:disable-line:strict-boolean-expressions
            return reg.test(name);
        });
    }
    public isPic(name: string) { //验证是否图片
        const types = [".png", ".jpg", ".gif", ".jpeg", ".bmp"];// tslint:disable-line:strict-boolean-expressions
        return types.some((item: string) => {
            const reg = new RegExp(item + "$", "im");// tslint:disable-line:strict-boolean-expressions
            return reg.test(name);
        });
    }
    public isOverSize(size: number) { //验证大小
        const maxSize = this.props.size * 1024;
        return size > maxSize;
    }
    public change(e: any) {
        e.preventDefault();
        const target = e.target;
        const files = target.files;
        let fileArray: any = [];
        for (let i = 0, len = files.length; i < len; i++) {
            fileArray.push(files[i]);
        }
        fileArray.forEach((file: any, i: number) => {
            const name = file.name;   //验证格式
            if (!this.isType(name)) {
                fileArray = [];
                this.setState({
                    errorInfo: "此文件格式不符合要求",
                });
                return;
            } else {
                this.setState({
                    errorInfo: "",
                });
            }
            if (this.props.size) { //验证大小
                const size = file.size;
                if (this.isOverSize(size)) {
                    fileArray = [];
                    this.setState({
                        errorInfo: "大小不超过" + (this.props.size / 1024) + "MB",
                    });
                    return;
                } else {
                    this.setState({
                        errorInfo: "",
                    });
                }
            }
            if (this.isPic(name)) {    //如果是图片就默认第一张预览
                const reader = new FileReader();
                reader.onload = (event: any) => {
                    this.setState({
                        src: reader.result,
                    });
                };
                reader.readAsDataURL(fileArray[i]);
                return;
            }
        });
        if (fileArray && fileArray.length > 0) {
            this.setState({
                file: fileArray,
            });
            if (this.props.multiple) {
                this.setState({
                    fileInfo: "已选择了" + fileArray.length + "个文件",
                });
            } else {
                this.setState({
                    fileInfo: "已选择了" + fileArray[0].name,
                });
            }
        }
        target.value = null;
    }
    public uploadFile(e: any) {
        if (!this.state.file.length) {
            this.setState({
                errorInfo: "请先选择文件",
            });
            return false;
        } else {
            return this.state.file;
        }
    }
    public delFile() {
        this.setState({
            src: "",
            fileInfo: "已选择了0个文件",
            file: [],
        });
    }
    public render() {
        let uploadInfo: string;
        if (this.props.uploadTypes && this.props.uploadTypes.length > 0) {
            uploadInfo = "支持" + this.props.uploadTypes.join("/") + "的文件";
            if (this.props.size) {
                uploadInfo += ",大小不超过" + (this.props.size / 1024) + "MB";
            }
        }
        let errorInfo: any = "";
        if (this.state.errorInfo) {
            errorInfo = <div className="bottom-error">{this.state.errorInfo}</div >;
        }
        let imageInfo: any = "";
        if (this.state.src) {
            imageInfo = <div className="upload-file">
                <span onClick={() => { this.delFile(); }} className="iconfont icon-delete files-del"></span>
                <img src={this.state.src} />
            </div>;
        }
        return (
            <div className="upload">
                <div className="upload-content">
                    <div className="content-info">
                        <div className="info-top">请选择本地的文件上传</div>
                        <div className="info-bottom">{uploadInfo}</div>
                    </div>
                    <div className="content-button">
                        <button className="button-add">+添加文件</button>
                    </div>
                    <div className="content-bottom">
                        {errorInfo || this.state.fileInfo}
                    </div>
                </div>
                <div className="upload-file-content">
                    {imageInfo}
                </div>
                <input onChange={(e) => { this.change(e); }} type="file" multiple={this.multiple} />
            </div>
        );
    }

}
