"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
if (typeof window !== "undefined") {
    require("./style.css"); // tslint:disable-line:no-var-requires
}
class Model extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClass: this.props.dataClass,
            show: this.props.show,
        };
    }
    componentDidMount() {
        this.isShow();
    }
    isShow() {
        const modelDom = document.querySelector(`.${this.state.dataClass}`);
        const inReg = new RegExp("dialog-fadeIn", "g");
        const _have = inReg.test(modelDom.className);
        if (this.state.show) {
            if (!_have) {
                modelDom.className = `${modelDom.className} dialog-fadeIn`;
            }
        }
        else {
            modelDom.className = modelDom.className.replace(inReg, "");
        }
    }
    componentWillReceiveProps(props) {
        this.setState({
            show: props.show,
        }, () => {
            this.isShow();
        });
    }
    render() {
        let dialogClass = "model-dialog ";
        if (this.state.dataClass) {
            dialogClass = `model-dialog ${this.state.dataClass}`;
        }
        return React.createElement("div", { className: dialogClass }, this.props.children);
    }
}
exports.Model = Model;
