"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Select_1 = require("./Select");
if (typeof window !== "undefined") {
    require("./style.css"); // tslint:disable-line:no-var-requires
}
class TreeList extends React.PureComponent {
    render() {
        const { dataSource, onSelectItem, config, selectId, onCancel } = this.props;
        return (React.createElement("ul", { className: "component-treeList", onClick: onCancel }, dataSource.map((item, index) => {
            return (React.createElement(Select_1.default, { config: config, select: item, selectId: selectId, onSelect: onSelectItem, key: index.toString(), index: index.toString() }));
        })));
    }
}
exports.TreeList = TreeList;
