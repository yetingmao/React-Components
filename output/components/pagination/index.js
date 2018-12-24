"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_paginate_1 = require("react-paginate");
const Select_1 = require("../Select");
if (typeof window !== "undefined") {
    require("./style.css"); // tslint:disable-line:no-var-requires
}
class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.offset.toString(),
        };
    }
    componentWillReceiveProps(props) {
        this.setState({
            text: props.offset.toString(),
        });
    }
    render() {
        const pageSizeList = ["10", "50", "100"];
        const { count, pageSize, offset, pageList } = this.props;
        const pageCount = Math.ceil(count / pageSize);
        return React.createElement("div", { className: "gjk_pagination" },
            React.createElement("div", { className: "pagination-info" },
                React.createElement("div", { className: "total" },
                    "\u5171 ",
                    React.createElement("span", null, count),
                    " \u6761"),
                "\uFF0C",
                React.createElement("div", { className: "pageNum" },
                    "\u5171 ",
                    React.createElement("span", null, pageCount),
                    " \u9875")),
            React.createElement("div", { className: "pageContent" },
                React.createElement("span", null, "\u5F53\u524D\uFF1A"),
                React.createElement(Select_1.Select, { dropdownTop: true, disabled: true, list: pageList ? pageList : pageSizeList, getSelect: (str) => { this.pageSizeChange(str); } }),
                React.createElement("span", { className: "current-count-page" }, "\u6761 / \u9875"),
                React.createElement(react_paginate_1.default, { previousLabel: React.createElement("i", { className: "iconfont icon-left" }), nextLabel: React.createElement("i", { className: "iconfont icon-right" }), breakLabel: React.createElement("a", null, "..."), breakClassName: "break-me", pageCount: pageCount, marginPagesDisplayed: 1, pageRangeDisplayed: 5, forcePage: offset - 1, onPageChange: (num) => {
                        this.setState({
                            text: (num.selected + 1).toString(),
                        });
                        this.props.handlePageClick(num.selected + 1);
                    }, containerClassName: "pagination", activeClassName: "active" }),
                React.createElement("div", { className: "input-group" },
                    React.createElement("a", { className: "group-jump", href: "javascript:void(0)" }, "\u8DF3\u8F6C\u5230"),
                    React.createElement("input", { type: "text", className: "form-control", ref: "pageJump", value: this.state.text, onChange: (e) => { this.changePage(e); }, onKeyUp: (e) => {
                            e.currentTarget.value = e.currentTarget.value.replace(/[^\d]/g, "");
                            if (e.keyCode === 13) {
                                this.pageChange();
                            }
                        } }),
                    React.createElement("button", { onClick: () => { this.pageChange(); } }, "GO"))));
    }
    pageSizeChange(str) {
        this.props.handlePageSizeClick(parseInt(str, 10));
    }
    pageChange() {
        const page = parseInt(this.state.text, 10);
        if (isNaN(page) || page === this.props.offset) {
            return;
        }
        this.props.handlePageClick(page);
    }
    changePage(e) {
        this.setState({
            text: e.target.value,
        });
    }
}
exports.default = Pagination;
