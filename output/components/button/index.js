"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
if (typeof window !== "undefined") {
    // tslint:disable-next-line:no-var-requires
    require("./style.css");
}
class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.type,
            text: props.text,
            icon: props.icon,
            isActive: props.isActive,
            disabled: props.disabled,
        };
    }
    componentWillReceiveProps(props) {
        this.setState({
            type: props.type,
            text: props.text,
            icon: props.icon,
            isActive: props.isActive,
            disabled: props.disabled,
        });
    }
    render() {
        const type = this.state.type;
        const text = this.state.text;
        const icon = this.state.icon;
        const isActive = this.state.isActive;
        const disabled = this.state.disabled;
        let name = "";
        if (type) {
            name = type;
        }
        if (isActive) {
            name += " active";
        }
        return React.createElement("button", { type: "button", disabled: disabled ? true : false, className: `xfl-btn ${name}`, onClick: (e) => { if (this.props.click) {
                this.props.click(e);
            } } },
            icon ? React.createElement("i", { className: `iconfont ${icon}` }) : "",
            text);
    }
}
exports.Button = Button;
