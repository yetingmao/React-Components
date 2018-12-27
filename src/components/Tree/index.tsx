import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button } from "../../index";
import * as lodash from "lodash";
if (typeof window !== "undefined") {
    require("./style.css");// tslint:disable-line:no-var-requires 
}

const adj = (orig: string, b: string) => {
    return orig.slice(0, orig.length - 1) + b + orig.slice(orig.length - 1);
};
const getOrder = (frontOrder: null | string, endOrder: null | string) => {
    let order: string;
    if (!frontOrder && !endOrder) {
        order = "1";
    } else if (!frontOrder) {
        order = adj(endOrder, "0");
    } else if (!endOrder) {
        order = adj(frontOrder, "1");
    } else if (frontOrder.length > endOrder.length) {
        order = adj(frontOrder, "1");
    } else {
        order = adj(endOrder, "0");
    }
    return order;
};
export interface Item {
    name?: string;
    id?: number;
    parentId?: number;
    order?: string;
    items?: Item[];
    edit?: boolean;
    drag?: boolean;
    add?: boolean;
    active?: boolean;
    count?: number;
}
export interface Iprops {
    list?: Item[];
    dragActive?: (res: boolean, data: { parentId?: number, id: number, order: string }) => Promise<boolean>;
    add?: (name: string, parentId: number, order: string) => void;
    del?: (id: number) => void;
    edit?: (name: string, id: number) => void;
    selectTag?: (name: string, id: number) => void;
    showCount?: boolean;
    showIcon?: boolean;

}
export interface Istates extends Iprops {
    addName?: string;
    addActive?: boolean;
    editName?: string;
    editActive?: boolean;
    dragInfo?: {
        parentId?: number,
        id: number,
        order: string
    };
    drag?: boolean;
    active?: boolean;
    addId?: number;
}
export class Tree extends React.Component<Iprops, Istates> {
    private tree?: React.RefObject<HTMLDivElement>;
    private list?: Item[];
    constructor(props: Iprops) {
        super(props);
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
    public componentWillReceiveProps(props: Iprops) {
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
    public render() {
        const json = this.getJson(this.state.list);
        const dom = this.serialize(json);
        let active;
        if (this.state.drag) {
            active = <div className="drag-submit">
                <Button text="保存" click={(e) => { this.moveQuest(); }} />
                <Button text="取消" click={(e) => { this.moveCancel(); }} />
            </div>;
        }
        return <div className="tree" ref={this.tree} >
            {active}
            {dom}
        </div >;
    }

    protected serialize(list: Item[], i = 1, active?: boolean) {
        const dom = list.map((element, index: number) => {
            let n = i;
            let li: JSX.Element;
            let ul: JSX.Element;
            let iClass: string = "";
            if (element.items && element.items.length > 0) {//如果有下一级则递归
                n++;
                ul = this.serialize(element.items, n, element.active);
                n--;
            } else {
                iClass = "hide";
            }
            const add = <Button text="增加子节点" click={(e) => { this.add(e, element.id); }} />;
            const del = <Button text="编辑" click={(e) => { this.edit(e, element.id); }} />;
            const edit = <Button text="删除" click={(e) => { this.del(e, element.id); }} />;
            const drag = <Button text="移动" click={(e) => { this.drag(e, element.id); }} />;
            let ellipsis;
            if (this.state.active) {
                if (n <= 2) {
                    ellipsis = <div className="active">
                        <span className="iconfont icon-ellipsis"></span>
                        <div className="active-info">
                            {add}
                            {del}
                            {edit}
                            {drag}
                        </div>
                    </div>;
                } else {
                    ellipsis = <div className="active">
                        <span className="iconfont icon-ellipsis"></span>
                        <div className="active-info">
                            {del}
                            {edit}
                            {drag}
                        </div>
                    </div>;
                }
            }
            const tree1 = li = <li key={index} >
                <div className="item-name" key={index} >
                    <i className={active ? `iconfont icon-down` : `iconfont icon-right ${iClass}`}></i>
                    {this.props.showIcon ? <i className={`iconfont
                        ${iClass ? "icon-palace-tree-close" : element.active ? "icon-palace-tree-open" : "icon-palace-tree-close"}`}></i> : null}
                    {element.name}
                </div>
                {ul}
            </li>;
            let count;
            if (this.props.showCount && element.count !== undefined) {
                count = <span className="item-count">
                    {element.count}
                </span>;
            }
            if (this.state.addActive) {
                if (element.add) {
                    li = <li key={index} >
                        <div className="active-input">
                            <input type="text" autoFocus value={this.state.addName}
                                onChange={(e) => {
                                    this.setState({
                                        addName: e.target.value,
                                    });
                                }}
                                onBlur={() => {
                                    this.props.add(this.state.addName, element.parentId, element.order);
                                    this.setState({
                                        addName: "",
                                        addActive: false,
                                    });
                                }}
                            />
                        </div>
                        {ul}
                    </li>;
                } else {
                    li = tree1;
                }
            } else if (this.state.editActive) {
                if (element.edit) {
                    li = <li key={index} >
                        <div className="active-input">
                            <input type="text" autoFocus value={this.state.editName}
                                onChange={(e) => {
                                    this.setState({
                                        editName: e.target.value,
                                    });
                                }}
                                onBlur={() => {
                                    this.props.edit(this.state.editName, element.id);
                                    this.setState({
                                        editName: "",
                                        editActive: false,
                                    });
                                }}
                            />
                        </div>
                        {ul}
                    </li>;
                } else {
                    li = tree1;
                }
            } else if (this.state.drag) {
                if (element.drag) {
                    li = <li key={index} >
                        <div className="item-name active" data-id={element.id} data-order={element.order}
                            data-parent={element.parentId} data-name={element.name} key={index}>
                            {element.name}
                            <div className="active-move">
                                <span className="iconfont icon-up" onClick={(e) => { this.up(e, element.id, element.parentId); }}>
                                    <span className="up-info">上移</span>
                                </span>
                                <span className="iconfont icon-down" onClick={(e) => { this.down(e, element.id, element.parentId); }}>
                                    <span className="down-info">下移</span>
                                </span>
                                <span className="iconfont icon-left" onClick={(e) => { this.left(e, element.id, element.parentId); }}>
                                    <span className="left-info">升级</span>
                                </span>
                                <span className="iconfont icon-right" onClick={(e) => { this.right(e, element.id, element.parentId); }}>
                                    <span className="right-info">降级</span>
                                </span>
                            </div>
                        </div>
                    </li>;
                } else {
                    li = <li key={index} >
                        <div className="item-name" key={index} onClick={() => { this.toogle(element.id); }}>
                            <i className={`iconfont icon-right ${iClass}`}></i>
                            {this.props.showIcon ? <i className={`iconfont
                        ${iClass ? "icon-palace-tree-close" : element.active ? "icon-palace-tree-open" : "icon-palace-tree-close"}`}></i> : null}
                            {element.name}
                        </div>
                        {ul}
                    </li>;
                }
            } else {
                li = <li key={index} >
                    <div className="item-name" key={index} onClick={() => {
                        this.toogle(element.id, true);
                    }}>
                        <i className={`iconfont icon-right ${iClass}`}></i>
                        {this.props.showIcon ? <i className={`iconfont
                        ${iClass ? "icon-palace-tree-close" : element.active ? "icon-palace-tree-open" : "icon-palace-tree-close"}`}></i> : null}
                        {element.name}
                        {count}
                        {ellipsis}
                    </div>
                    {ul}
                </li >;
            }
            return li;
        });
        return <ul className={active ? "active" : ""}>{dom}</ul>;
    }
    protected orderArray = (item1: any, item2: any) => {
        const order1 = item1.order;
        const order2 = item2.order;
        let res;
        if (order1 < order2) {
            res = -1;
        } else if (order1 > order2) {
            res = 1;
        } else {
            res = 0;
        }
        return res;
    }
    protected arrayToJson = (data: Item[], parentId?: number) => {
        const json: Item[] = [];
        let temp;
        let obj: Item;
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
    }
    protected getJson = (data: Item[]) => {
        const topArray: Item[] = [];
        const othersArray: Item[] = [];
        data.forEach((item) => {
            if (item.parentId) {
                othersArray.push(item);
            } else {
                topArray.push(item);
            }
        });
        topArray.sort(this.orderArray);
        return topArray.map((item) => {
            item.items = this.arrayToJson(othersArray, item.id);
            return item;
        });
    }
    protected getElementInfo = (target: HTMLElement) => {
        const id = parseInt(target.dataset.id, 10);
        const name = target.dataset.name;
        const parentId = target.dataset.parent ? parseInt(target.dataset.parent, 10) : null;
        const order = target.dataset.order;
        return {
            id, name, parentId, order,
        };
    }
    protected toogle(id: number, state?: boolean) {
        const list = [...this.state.list];
        const n = list.findIndex(item => item.id === id);
        if (list[n].active) {
            list[n].active = false;
        } else {
            list[n].active = true;
        }
        this.setState({
            list,
        });
        if (state && this.props.selectTag) {
            this.props.selectTag(list[n].name, id);
        }
    }
    protected add(e: React.ChangeEvent<HTMLButtonElement>, id: number) {
        e.stopPropagation();
        const list = [...this.state.list];
        const list1 = list.filter(item => item.parentId === id);
        const n = list.findIndex(item => item.id === id);
        let order;
        if (list1.length) {
            order = getOrder(list1[list1.length - 1].order, null);
        } else {
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
    protected edit(e: React.ChangeEvent<HTMLButtonElement>, id: number) {
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
    protected del(e: React.ChangeEvent<HTMLButtonElement>, id: number) {
        e.stopPropagation();
        this.props.del(id);
    }
    protected drag(e: React.ChangeEvent<HTMLButtonElement>, id: number) {
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
    protected up(e: React.MouseEvent<HTMLSpanElement>, id: number, parentId: number) {
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
    protected down(e: React.MouseEvent<HTMLSpanElement>, id: number, parentId: number) {
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
    protected left(e: React.MouseEvent<HTMLSpanElement>, id: number, parentId?: number) {
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
            } else {
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
    protected right(e: React.MouseEvent<HTMLSpanElement>, id: number, parentId?: number) {
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
            } else {
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
    protected moveQuest() {
        const list = this.state.list;
        const list2 = lodash.cloneDeep(this.list);
        const res = this.arrayDeep(list);
        const result = this.props.dragActive(res, this.state.dragInfo);
        if (result) {
            this.setState({
                drag: false,
            });
        } else {
            this.setState({
                list: list2,
                drag: false,
            });
        }
    }
    protected moveCancel() {
        const list = lodash.cloneDeep(this.list);
        this.setState({
            drag: false,
            dragInfo: null,
            list: list,
        });
    }
    protected arrayDeep(array: Item[]) {
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
