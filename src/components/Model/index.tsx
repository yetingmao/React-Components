
import * as React from "react";
if (typeof window !== "undefined") {
    require("./style.css");// tslint:disable-line:no-var-requires 
}

export interface IProps {
    show: boolean;
    dataClass: string;
}
export interface IStates extends IProps {

}
export class Model extends React.Component<IProps, IStates> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            dataClass: this.props.dataClass,
            show: this.props.show,
        };
    }
    public componentDidMount() {
        this.isShow();
    }
    public isShow() {
        const modelDom = document.querySelector(`.${this.state.dataClass}`) as HTMLElement;
        const inReg = new RegExp("dialog-fadeIn", "g");
        const _have = inReg.test(modelDom.className);
        if (this.state.show) {
            if (!_have) {
                modelDom.className = `${modelDom.className} dialog-fadeIn`;
            }
        } else {
            modelDom.className = modelDom.className.replace(inReg, "");
        }
    }
    public componentWillReceiveProps(props: any) {
        this.setState(
            {
                show: props.show,
            },
            () => {
                this.isShow();
            });
    }
    public render() {
        let dialogClass = "model-dialog ";
        if (this.state.dataClass) {
            dialogClass = `model-dialog ${this.state.dataClass}`;
        }
        return <div className={dialogClass}>
            {this.props.children}
        </div>;
    }
}
