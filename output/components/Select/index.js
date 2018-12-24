"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
if (typeof window !== "undefined") {
    require("./style.css"); // tslint:disable-line:no-var-requires
}
class Select extends React.Component {
    constructor(props) {
        super(props);
        this.hidden = () => {
            this.setState({
                isDropdownShow: false,
            });
        };
        this.state = {
            val: props.val ? props.val : "",
            isDropdownShow: false,
        };
    }
    componentDidMount() {
        window.addEventListener("click", this.hidden);
    }
    componentWillUnmount() {
        window.removeEventListener("click", this.hidden);
    }
    componentWillReceiveProps(props) {
        if (typeof props.val === "string") {
            this.setState({
                list: props.list,
                val: props.val,
            });
        }
        else {
            this.setState({
                list: props.list,
            });
        }
    }
    reset() {
        this.setState({
            val: "",
        });
    }
    render() {
        const { val, isDropdownShow } = this.state;
        const { title, disabled, dropdownTop, placeholder, width, list, invalid } = this.props;
        let data;
        let styleHeight = "auto";
        if (list && list.length > 0) {
            if (dropdownTop) {
                styleHeight = `-${list.length * 36 + 2}px`;
            }
            data = list.map((item, i) => {
                return React.createElement("li", { className: item === val ? "active" : "", key: i, onClick: (e) => { this.selectItem(item); } }, item);
            });
        }
        let titleTop;
        if (title) {
            titleTop = React.createElement("span", { className: "select-title" }, title);
        }
        return React.createElement("div", { className: "select-filter-item" },
            titleTop,
            React.createElement("div", { className: "filter-content", style: { width: width ? `${width}px` : "170px" }, onClick: (e) => { e.stopPropagation(); } },
                React.createElement("div", { className: `filter-select ${isDropdownShow ? "active" : ""}`, onClick: () => { if (!invalid)
                        this.setSelect(); } },
                    React.createElement("input", { className: "filter-input", type: "text", placeholder: placeholder ? placeholder : "请选择", disabled: disabled, value: val, onChange: (e) => {
                            this.setState({
                                val: e.target.value,
                            });
                            if (this.props.getSelect) {
                                this.props.getSelect(e.currentTarget.value);
                            }
                        } }),
                    React.createElement("i", { className: `iconfont icon-down` })),
                isDropdownShow ? React.createElement("div", { className: "select-dropdown", style: { top: styleHeight } },
                    React.createElement("ul", null, data)) : null));
    }
    setSelect() {
        this.setState({
            isDropdownShow: !this.state.isDropdownShow,
        });
    }
    selectItem(str) {
        this.setState({
            val: str,
            isDropdownShow: false,
        });
        if (str !== this.state.val && this.props.getSelect) {
            this.props.getSelect(str);
        }
    }
}
exports.Select = Select;
