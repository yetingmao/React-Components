
import * as React from 'react';
import * as ReactDOM from 'react-dom';
if (typeof window != "undefined") {
    require("./style.css");
}
interface Props {
    show: boolean;
    modelWidth?: string;
    unClose?: boolean;
    dataClass: string
}
interface States extends Props {

}
export class Model extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {
            dataClass: this.props.dataClass,
            show: this.props.show,
            modelWidth: this.props.modelWidth,
            unClose: this.props.unClose,
        }
    }
    componentDidMount() {
        this.isShow();
    }
    isShow() {
        const Model = document.querySelector("." + this.state.dataClass) as HTMLElement;
        const inReg = new RegExp("dialog-fadeIn", 'g');
        const _have = inReg.test(Model.className);
        if (this.state.show) {
            if (!_have) {
                Model.className = Model.className + " dialog-fadeIn"
            }
        } else {
            Model.className = Model.className.replace(inReg, "");
        }
    }
    componentWillReceiveProps(props: any) {
        this.setState({
            show: props.show,
        }, () => {
            this.isShow();
        })
    }
    hide() {
        if (this.state.unClose) {
            return;
        }
        this.setState({
            show: false
        }, () => {
            this.isShow();
        });
    }
    render() {
        let dialogWidth = "dialog-container"
        let dialogClass = "model-dialog "
        if (this.state.modelWidth === "middle") {
            dialogWidth = "dialog-container dialog-container-middle"
        }
        if (this.state.modelWidth === "small") {
            dialogWidth = "dialog-container dialog-container-small"
        }
        if (this.state.dataClass) {
            dialogClass = "model-dialog " + this.state.dataClass;
        }
        return <div className={dialogClass}>
            <div onClick={() => this.hide()} className="model-overlay"></div>
            <div className={dialogWidth}>
                <div className="dialog">
                    {this.props.children}
                </div>
            </div>
        </div>
    }
}
