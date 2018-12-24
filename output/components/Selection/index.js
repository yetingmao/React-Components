"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
if (typeof window !== "undefined") {
    require("./style.css"); // tslint:disable-line:no-var-requires
}
class Selection extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { titleName, required, children, width } = this.props;
        return React.createElement("div", { className: "selection_filter_item" },
            React.createElement("div", { className: "titleName", style: { width: width ? `${width}px` : "" } },
                React.createElement("div", { className: "selection_name" }, titleName),
                React.createElement("span", { className: `required_default ${required ? "required" : ""}` }, "*")),
            children);
    }
}
exports.Selection = Selection;
