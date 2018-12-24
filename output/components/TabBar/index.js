"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
if (typeof window !== "undefined") {
    require("./style.css"); // tslint:disable-line:no-var-requires
}
class TabBar extends React.Component {
    constructor(props) {
        super(props);
        this.itemNav = (index) => {
            return index === this.state.current ? "tabbar-title active" : "tabbar-title";
        };
        this.select = (i, data) => {
            this.setState({ current: i });
            this.props.callback(data);
        };
        this.state = {
            current: this.props.current ? this.props.current : 0,
        };
    }
    render() {
        return (React.createElement("div", { className: "tabbar" }, React.Children.map(this.props.children, (element, i) => {
            return (React.createElement("div", { onClick: () => { this.select(i, element.props["data-title"]); }, className: this.itemNav(i) },
                React.createElement("i", { className: element.props["data-icon"] }),
                element.props["data-title"]));
        })));
    }
}
exports.TabBar = TabBar;
