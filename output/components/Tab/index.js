"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
if (typeof window !== "undefined") {
    require("./style.css"); // tslint:disable-line:no-var-requires
}
class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.itemNav = (index) => {
            return index === this.state.current ? "title-item active" : "title-item";
        };
        this.itemCon = (index) => {
            return index === this.state.current ? "con-item active" : "con-item";
        };
        this.state = {
            current: (this.props.index) ? this.props.index : 0,
        };
    }
    render() {
        return (React.createElement("div", { className: "tab" },
            React.createElement("ul", { className: "tab-title" }, React.Children.map(this.props.children, (element, index) => {
                return (React.createElement("li", { onClick: () => {
                        this.setState({ current: index });
                        if (this.props.callback) {
                            this.props.callback(element.props["data-owner"]);
                        }
                    }, className: this.itemNav(index) }, element.props["data-title"]));
            })),
            React.createElement("div", { className: "tab-con" }, React.Children.map(this.props.children, (element, index) => {
                return (React.createElement("div", { className: this.itemCon(index) }, element));
            }))));
    }
}
exports.Tab = Tab;
