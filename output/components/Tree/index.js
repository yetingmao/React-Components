"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
if (typeof window !== "undefined") {
    require("./style.css"); // tslint:disable-line:no-var-requires
}
const React = require("react");
const button_1 = require("../button");
const lodash = require("lodash");
const adj = (orig, b) => {
    return orig.slice(0, orig.length - 1) + b + orig.slice(orig.length - 1);
};
const getOrder = (frontOrder, endOrder) => {
    let order;
    if (!frontOrder && !endOrder) {
        order = "1";
    }
    else if (!frontOrder) {
        order = adj(endOrder, "0");
    }
    else if (!endOrder) {
        order = adj(frontOrder, "1");
    }
    else if (frontOrder.length > endOrder.length) {
        order = adj(frontOrder, "1");
    }
    else {
        order = adj(endOrder, "0");
    }
    return order;
};
class Tree extends React.Component {
    constructor(props) {
        super(props);
        this.orderArray = (item1, item2) => {
            const order1 = item1.order;
            const order2 = item2.order;
            let res;
            if (order1 < order2) {
                res = -1;
            }
            else if (order1 > order2) {
                res = 1;
            }
            else {
                res = 0;
            }
            return res;
        };
        this.arrayToJson = (data, parentId) => {
            const json = [];
            let temp;
            let obj;
            data.forEach((item) => {
                if (item.parentId === parentId) {
                    obj = {
                        id: item.id,
                        name: item.name,
                        parentId: item.parentId,
                        edit: item.edit,
                        drag: item.drag,
                        add: item.add,
                        order: item.order,
                        active: item.active,
                        count: item.count,
                    };
                    temp = this.arrayToJson(data, item.id);
                    if (temp.length > 0) {
                        obj.items = temp;
                    }
                    json.push(obj);
                }
            });
            json.sort(this.orderArray);
            return json;
        };
        this.getJson = (data) => {
            const topArray = [];
            const othersArray = [];
            data.forEach((item) => {
                if (item.parentId) {
                    othersArray.push(item);
                }
                else {
                    topArray.push(item);
                }
            });
            topArray.sort(this.orderArray);
            return topArray.map((item) => {
                item.items = this.arrayToJson(othersArray, item.id);
                return item;
            });
        };
        this.getElementInfo = (target) => {
            const id = parseInt(target.dataset.id, 10);
            const name = target.dataset.name;
            const parentId = target.dataset.parent ? parseInt(target.dataset.parent, 10) : null;
            const order = target.dataset.order;
            return {
                id, name, parentId, order,
            };
        };
        this.tree = React.createRef();
        let active = false;
        if (this.props.add || this.props.del || this.props.edit || this.props.dragActive) {
            active = true;
        }
        const list = props.list === undefined ? [] : props.list;
        this.state = {
            active,
            list,
        };
    }
    componentWillReceiveProps(props) {
        const list = props.list === undefined ? [] : props.list;
        if (this.state.addId) {
            const n = list.findIndex(item => item.id === this.state.addId);
            if (n !== -1) {
                list[n].active = true;
            }
        }
        this.setState({
            list,
        });
    }
    render() {
        const json = this.getJson(this.state.list);
        const dom = this.serialize(json);
        let active;
        if (this.state.drag) {
            active = React.createElement("div", { className: "drag-submit" },
                React.createElement(button_1.Button, { text: "\u4FDD\u5B58", click: (e) => { this.moveQuest(); } }),
                React.createElement(button_1.Button, { text: "\u53D6\u6D88", click: (e) => { this.moveCancel(); } }));
        }
        return React.createElement("div", { className: "tree", ref: this.tree },
            active,
            dom);
    }
    serialize(list, i = 1, active) {
        const dom = list.map((element, index) => {
            let n = i;
            let li;
            let ul;
            let iClass = "";
            if (element.items && element.items.length > 0) { //如果有下一级则递归
                n++;
                ul = this.serialize(element.items, n, element.active);
                n--;
            }
            else {
                iClass = "hide";
            }
            const add = React.createElement(button_1.Button, { text: "\u589E\u52A0\u5B50\u8282\u70B9", click: (e) => { this.add(e, element.id); } });
            const del = React.createElement(button_1.Button, { text: "\u7F16\u8F91", click: (e) => { this.edit(e, element.id); } });
            const edit = React.createElement(button_1.Button, { text: "\u5220\u9664", click: (e) => { this.del(e, element.id); } });
            const drag = React.createElement(button_1.Button, { text: "\u79FB\u52A8", click: (e) => { this.drag(e, element.id); } });
            let ellipsis;
            if (this.state.active) {
                if (n <= 2) {
                    ellipsis = React.createElement("div", { className: "active" },
                        React.createElement("span", { className: "iconfont icon-ellipsis" }),
                        React.createElement("div", { className: "active-info" },
                            add,
                            del,
                            edit,
                            drag));
                }
                else {
                    ellipsis = React.createElement("div", { className: "active" },
                        React.createElement("span", { className: "iconfont icon-ellipsis" }),
                        React.createElement("div", { className: "active-info" },
                            del,
                            edit,
                            drag));
                }
            }
            const tree1 = li = React.createElement("li", { key: index },
                React.createElement("div", { className: "item-name", key: index },
                    React.createElement("i", { className: active ? `iconfont icon-down` : `iconfont icon-right ${iClass}` }),
                    this.props.showIcon ? React.createElement("i", { className: `iconfont
                        ${iClass ? "icon-palace-tree-close" : element.active ? "icon-palace-tree-open" : "icon-palace-tree-close"}` }) : null,
                    element.name),
                ul);
            let count;
            if (this.props.showCount && element.count !== undefined) {
                count = React.createElement("span", { className: "item-count" }, element.count);
            }
            if (this.state.addActive) {
                if (element.add) {
                    li = React.createElement("li", { key: index },
                        React.createElement("div", { className: "active-input" },
                            React.createElement("input", { type: "text", autoFocus: true, value: this.state.addName, onChange: (e) => {
                                    this.setState({
                                        addName: e.target.value,
                                    });
                                }, onBlur: () => {
                                    this.props.add(this.state.addName, element.parentId, element.order);
                                    this.setState({
                                        addName: "",
                                        addActive: false,
                                    });
                                } })),
                        ul);
                }
                else {
                    li = tree1;
                }
            }
            else if (this.state.editActive) {
                if (element.edit) {
                    li = React.createElement("li", { key: index },
                        React.createElement("div", { className: "active-input" },
                            React.createElement("input", { type: "text", autoFocus: true, value: this.state.editName, onChange: (e) => {
                                    this.setState({
                                        editName: e.target.value,
                                    });
                                }, onBlur: () => {
                                    this.props.edit(this.state.editName, element.id);
                                    this.setState({
                                        editName: "",
                                        editActive: false,
                                    });
                                } })),
                        ul);
                }
                else {
                    li = tree1;
                }
            }
            else if (this.state.drag) {
                if (element.drag) {
                    li = React.createElement("li", { key: index },
                        React.createElement("div", { className: "item-name active", "data-id": element.id, "data-order": element.order, "data-parent": element.parentId, "data-name": element.name, key: index },
                            element.name,
                            React.createElement("div", { className: "active-move" },
                                React.createElement("span", { className: "iconfont icon-up", onClick: (e) => { this.up(e, element.id, element.parentId); } },
                                    React.createElement("span", { className: "up-info" }, "\u4E0A\u79FB")),
                                React.createElement("span", { className: "iconfont icon-down", onClick: (e) => { this.down(e, element.id, element.parentId); } },
                                    React.createElement("span", { className: "down-info" }, "\u4E0B\u79FB")),
                                React.createElement("span", { className: "iconfont icon-left", onClick: (e) => { this.left(e, element.id, element.parentId); } },
                                    React.createElement("span", { className: "left-info" }, "\u5347\u7EA7")),
                                React.createElement("span", { className: "iconfont icon-right", onClick: (e) => { this.right(e, element.id, element.parentId); } },
                                    React.createElement("span", { className: "right-info" }, "\u964D\u7EA7")))));
                }
                else {
                    li = React.createElement("li", { key: index },
                        React.createElement("div", { className: "item-name", key: index, onClick: () => { this.toogle(element.id); } },
                            React.createElement("i", { className: `iconfont icon-right ${iClass}` }),
                            this.props.showIcon ? React.createElement("i", { className: `iconfont
                        ${iClass ? "icon-palace-tree-close" : element.active ? "icon-palace-tree-open" : "icon-palace-tree-close"}` }) : null,
                            element.name),
                        ul);
                }
            }
            else {
                li = React.createElement("li", { key: index },
                    React.createElement("div", { className: "item-name", key: index, onClick: () => {
                            this.toogle(element.id, true);
                        } },
                        React.createElement("i", { className: `iconfont icon-right ${iClass}` }),
                        this.props.showIcon ? React.createElement("i", { className: `iconfont
                        ${iClass ? "icon-palace-tree-close" : element.active ? "icon-palace-tree-open" : "icon-palace-tree-close"}` }) : null,
                        element.name,
                        count,
                        ellipsis),
                    ul);
            }
            return li;
        });
        return React.createElement("ul", { className: active ? "active" : "" }, dom);
    }
    toogle(id, state) {
        const list = [...this.state.list];
        const n = list.findIndex(item => item.id === id);
        if (list[n].active) {
            list[n].active = false;
        }
        else {
            list[n].active = true;
        }
        this.setState({
            list,
        });
        if (state && this.props.selectTag) {
            this.props.selectTag(list[n].name, id);
        }
    }
    add(e, id) {
        e.stopPropagation();
        const list = [...this.state.list];
        const list1 = list.filter(item => item.parentId === id);
        const n = list.findIndex(item => item.id === id);
        let order;
        if (list1.length) {
            order = getOrder(list1[list1.length - 1].order, null);
        }
        else {
            order = "1";
        }
        const item1 = {
            order,
            name: "新分类",
            parentId: id,
            add: true,
        };
        list.push(item1);
        list[n].active = true;
        this.setState({
            list,
            addName: "新分类",
            addActive: true,
            addId: list[n].id,
        });
    }
    edit(e, id) {
        e.stopPropagation();
        const list = [...this.state.list];
        const n = list.findIndex(item => item.id === id);
        list[n].edit = true;
        this.setState({
            list,
            editName: list[n].name,
            editActive: true,
        });
    }
    del(e, id) {
        e.stopPropagation();
        this.props.del(id);
    }
    drag(e, id) {
        e.stopPropagation();
        this.list = lodash.cloneDeep(this.state.list);
        const list = [...this.state.list];
        const n = list.findIndex(item => item.id === id);
        list[n].drag = true;
        this.setState({
            list,
            drag: true,
        });
    }
    up(e, id, parentId) {
        e.stopPropagation();
        const list = [...this.state.list];
        const sameList = list.filter(item => item.parentId === parentId);
        sameList.sort(this.orderArray);
        const n = sameList.findIndex(item => item.id === id);
        const endItem = sameList[n - 1];
        if (endItem) {
            const n1 = list.findIndex(item => item.id === id);
            const endOrder = endItem.order;
            const frontOrder = sameList[n - 2] ? sameList[n - 2].order : null;
            const order = getOrder(frontOrder, endOrder);
            list[n1].order = order;
            this.setState({
                list,
                dragInfo: { id, order },
            });
        }
    }
    down(e, id, parentId) {
        e.stopPropagation();
        const list = [...this.state.list];
        const sameList = list.filter(item => item.parentId === parentId);
        sameList.sort(this.orderArray);
        const n = sameList.findIndex(item => item.id === id);
        const frontItem = sameList[n + 1];
        if (frontItem) {
            const n1 = list.findIndex(item => item.id === id);
            const frontOrder = frontItem.order;
            const endOrder = sameList[n + 2] ? sameList[n + 2].order : null;
            const order = getOrder(frontOrder, endOrder);
            list[n1].order = order;
            this.setState({
                list,
                dragInfo: { id, order },
            });
        }
    }
    left(e, id, parentId) {
        e.stopPropagation();
        if (parentId) {
            const list = [...this.state.list];
            const n = list.findIndex(item => item.id === parentId);
            const otherItem = list[n];
            const sameList = list.filter(item => item.parentId === otherItem.parentId);
            sameList.sort(this.orderArray);
            const n1 = list.findIndex(item => item.id === id);
            list[n1].parentId = otherItem.parentId;
            const frontOrder = otherItem.order;
            const n2 = sameList.findIndex(item => item.id === otherItem.id);
            let order;
            if (sameList[n2 + 1]) {
                order = getOrder(frontOrder, sameList[n2 + 1].order);
            }
            else {
                order = getOrder(frontOrder, null);
            }
            list[n1].order = order;
            list[n1].drag = true;
            this.setState({
                list,
                dragInfo: { id, order, parentId: otherItem.parentId },
            });
        }
    }
    right(e, id, parentId) {
        e.stopPropagation();
        const list = [...this.state.list];
        const sameList = list.filter(item => item.parentId === parentId);
        sameList.sort(this.orderArray);
        const n2 = sameList.findIndex(item => item.id === id);
        if (sameList[n2 + 1]) {
            const nextId = sameList[n2 + 1].id;
            const sameList1 = list.filter(item => item.parentId === nextId);
            sameList1.sort(this.orderArray);
            const otherItem = sameList1[sameList.length - 1];
            const n = list.findIndex(item => item.id === id);
            list[n].parentId = nextId;
            list[n].drag = true;
            let order;
            if (otherItem) {
                order = getOrder(otherItem.order, null);
            }
            else {
                order = "1";
            }
            list[n].order = order;
            const n1 = list.findIndex(item => item.id === nextId);
            list[n1].active = true;
            this.setState({
                list,
                dragInfo: { id, order, parentId: nextId },
            });
        }
    }
    moveQuest() {
        const list = this.state.list;
        const list2 = lodash.cloneDeep(this.list);
        const res = this.arrayDeep(list);
        const result = this.props.dragActive(res, this.state.dragInfo);
        if (result) {
            this.setState({
                drag: false,
            });
        }
        else {
            this.setState({
                list: list2,
                drag: false,
            });
        }
    }
    moveCancel() {
        const list = lodash.cloneDeep(this.list);
        this.setState({
            drag: false,
            dragInfo: null,
            list: list,
        });
    }
    arrayDeep(array) {
        let res = true;
        array.forEach((item) => {
            if (item.items && item.items.length) {
                item.items.forEach((item1) => {
                    if (item1.items && item1.items.length) {
                        item1.items.forEach((item2) => {
                            if (item2.items && item2.items.length) {
                                res = false;
                            }
                        });
                    }
                });
            }
        });
        return res;
    }
}
exports.Tree = Tree;
