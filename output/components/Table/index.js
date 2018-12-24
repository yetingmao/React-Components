"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
if (typeof window !== "undefined") {
    require("./style.css"); // tslint:disable-line:no-var-requires
}
class Table extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let title;
        let content;
        if (this.props.title && this.props.title.length > 0) {
            title = this.props.title.map((item, i) => {
                return React.createElement("td", { key: i },
                    " ",
                    item,
                    " ");
            });
        }
        if (this.props.list && this.props.list.length) {
            content = React.createElement("tbody", null, this.props.list);
            if (this.props.rowSpan) {
                content = this.props.list;
            }
        }
        else {
            content = React.createElement("tbody", null,
                React.createElement("tr", null,
                    React.createElement("td", { colSpan: this.props.title.length },
                        React.createElement("h5", { style: { textAlign: "center" } }, "\u6682\u65E0\u6570\u636E"))));
        }
        return React.createElement("table", { className: `gjk_table ${this.props.rowSpan ? "rowSpan_table" : ""}` },
            React.createElement("thead", null,
                React.createElement("tr", null, title)),
            content);
    }
}
exports.Table = Table;
