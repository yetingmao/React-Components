"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
if (typeof window !== "undefined") {
    // tslint:disable-next-line:no-var-requires
    require("./style.css");
}
class Select extends React.PureComponent {
    constructor(props) {
        super(props);
        this.toggleChildren = () => {
            this.setState({ showChildren: !this.state.showChildren });
        };
        this.toggleChecked = () => {
            const { onSelect, selectId, select, config } = this.props;
            let isChecked = false;
            if (selectId.length !== 0) {
                selectId.map((item, i) => {
                    if (select[config.idKey] === item) {
                        isChecked = true;
                    }
                });
            }
            onSelect(select, isChecked ? "null" : select[config.idKey]);
        };
        this.state = {
            showChildren: props.index.length === 1 ? true : false,
        };
    }
    render() {
        const { showChildren } = this.state;
        const { select, onSelect, selectId, config, index } = this.props;
        const title = select[config.titleKey];
        const id = select[config.idKey];
        const selects = select[config.childrenKey] !== undefined ? select[config.childrenKey] : [];
        let counts;
        if (config !== undefined && config.count !== undefined) {
            counts = select[config.count];
        }
        let checked = false;
        if (selectId && selectId.length !== 0) {
            selectId.map((items) => {
                if (items === id) {
                    checked = true;
                }
            });
        }
        return (React.createElement("li", { className: "component-option", onClick: e => e.stopPropagation() },
            React.createElement("p", { className: "c-option-content" },
                React.createElement("i", { className: `iconfont ${selects.length > 0 ? (showChildren ? "icon-up" : "icon-down") : ""}`, onClick: this.toggleChildren }),
                React.createElement("span", { className: "coc-title" },
                    title,
                    typeof counts === "number" ? React.createElement("span", { className: "coc-title-number" }, counts) : null),
                React.createElement("i", { onClick: () => { if (!select.disabled) {
                        this.toggleChecked();
                    } }, className: `
                    iconfont icon-share-select ${select.disabled ? "disabled" : (checked ? "checked" : "unChecked")}` })),
            showChildren ? (React.createElement("ul", { className: "c-option-children" }, selects.map((item, i) => {
                return React.createElement(Select, { selectId: selectId, select: item, onSelect: onSelect, config: config, key: i.toString(), index: `${index}-${i}` });
            }))) : false));
    }
}
exports.default = Select;
