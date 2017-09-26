import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Model } from '../Model';
import { Alert } from "../../plugin/popAlert";
interface AddResourceProps {
    getList: Function;
    types?: Array<string>;
}
interface AddResourceStates {
    file: Array<File>,
    multiple: boolean,
    text?: string,
    modelShow?: boolean,
}
export class AddResource extends React.Component<AddResourceProps, AddResourceStates> {
    constructor(props: AddResourceProps) {
        super(props);
        this.state = {
            file: [],
            multiple: true,
            modelShow: false,
        }
    }
    componentDidMount() {

    }
    isType(name: string) {
        let types = this.props.types || ['.obj', '.zip', '.png', '.jpg', '.gif', '.jpeg']
        return types.some((item: string) => {
            let reg = new RegExp(item + "$", "im")
            return reg.test(name)
        })
    }
    handleChange(e: any) {
        e.preventDefault();
        let target = e.target
        let files = target.files
        let fileArray = [];
        for (let i = 0, len = files.length; i < len; i++) {
            fileArray.push(files[i]);
        }
        fileArray.forEach((file: any) => {
            let name = file.name
            if (!this.isType(name)) {
                fileArray = [];
                Alert(name + '此文件格式不符合要求');
                return;
            }
        })
        this.setState({
            file: fileArray,
        });
        target.value = null;
    }
    delFile(item: any) {
        let files = this.state.file;
        files.forEach((element: any, index: number) => {
            if (element.name == item.name) {
                files.splice(index, 1);
                return;
            }
        });
        this.setState({
            file: files,
        })
    }
    addResource() {
        if (!this.state.file.length) {
            Alert('请选择文件');
            return;
        }
        this.setState({
            modelShow: true,
        })
        let formData = new FormData();
        this.state.file.forEach((file: any, i: number) => {
            formData.append('fileData' + i, this.state.file[i])
        })
        fetch('/XXXXXX ', {
            method: 'POST',
            credentials: "include",
            headers: {
                "accept": "application/json"
            },
            body: formData
        }).then((res) => {
            this.setState({
                modelShow: false,
            })
            return res.json();
        }).then((res) => {
            if (res.msg) { Alert(res.msg) }
            if (res.error) { Alert(res.error) }
            this.props.getList();
            this.setState({
                file: [],
            })
        })
    }
    render() {
        let url = this.state.file;
        let count = this.state.file.length;
        return <div>
            <Model dataClass="upload-model-a" show={this.state.modelShow} modelWidth={'small'} unClose={true}>
                <div className="dialog-content">正在上传</div>
            </Model>
            <div className="input-group resource-group">
                <div className="group-check">
                    <button className="btn btn-info" type="button">选择文件</button>
                    <text className="check-text">{count > 0 ? '选择了' + count + '个文件' : ''}</text>
                    <input onChange={(e) => this.handleChange(e)} type="file" className="form-control check-file" multiple={this.state.multiple} />
                </div>
                <span className="input-group-btn">
                    <button onClick={() => this.addResource()} className="btn btn-info" type="button">上传文件</button>
                </span>
            </div>
            {
                this.state.file.map((item: any) => {
                    let mb = (item.size / 1024 / 1024).toFixed(2);
                    let kb = Math.round((item.size / 1024));
                    let size = parseInt(mb) > 0 ? mb + 'MB' : kb + 'KB'
                    return <div className="upload-files">
                        <span onClick={() => this.delFile(item)} className="iconfont files-del">&#xe601;</span>
                        <div className="iconfont files-icon">&#xe616; </div>
                        <div className="files-info" title={item.name}>{item.name}</div>
                        <div className="files-info">{size}</div>
                    </div>
                })
            }
        </div>
    }
}
