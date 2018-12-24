"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
if (typeof window !== "undefined") {
    require("./style.css"); // tslint:disable-line:no-var-requires
}
class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show,
        };
    }
    componentWillReceiveProps(props) {
        this.setState({
            show: props.show,
        });
    }
    render() {
        return React.createElement("div", { className: `model_loading ${this.state.show ? " loading_fadeIn" : ""}` },
            React.createElement("div", { className: "loading_overlay" }),
            React.createElement("div", { className: "loading_effect" },
                React.createElement("span", null),
                React.createElement("span", null),
                React.createElement("span", null),
                React.createElement("span", null),
                React.createElement("span", null),
                React.createElement("span", null),
                React.createElement("span", null),
                React.createElement("span", null)));
    }
}
exports.Loading = Loading;
