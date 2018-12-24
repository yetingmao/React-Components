if (typeof window !== "undefined") {
    require("./style.css");// tslint:disable-line:no-var-requires
}
import * as React from "react";
import { Button } from "../button";
import * as lodash from "lodash";
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
    comment?: string;
    id?: number;
    parentId?: number;
    order?: string;
    items?: Item[];
    drag?: boolean;
    active?: boolean;
}
export interface Iprops {
    list?: Item[];
    dragActive?: (res: boolean, data: { parentId?: number, id: number, order: string }) => Promise<boolean>;
    add?: (parentId: number, order: string) => void;
    del?: (id: number) => void;
    edit?: (id: number, name: string, comment: string) => void;
    selectTag?: (name: string, id: number) => void;
    type?: string;

}
export interface Istates extends Iprops {
    dragInfo?: {
        parentId?: number,
        id: number,
        order: string
    };
    drag?: boolean;
}
export default class TableTree extends React.Component<Iprops, Istates> {
    private tree?: React.RefObject<HTMLDivElement>;
    private list?: Item[];
    constructor(props: Iprops) {
        super(props);
        this.tree = React.createRef();
        this.state = {
            list: props.list === undefined ? [] : props.list,
        };
    }
    public componentWillReceiveProps(props: Iprops) {
        this.setState({
            list: props.list,
        });
    }
    public render() {
        const json = this.getJson(this.state.list);
        const dom = this.serialize(json);
        return <div className="gjk_table_tree" ref={this.tree} >
            <div className="tree_title">
                <div className="title_icon">层级</div>
                <div className="title_name">章节名称</div>
                <div className="title_remark">备注</div>
                <div className="title_active">操作</div>
            </div>
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
            let act;
            const add = <span onClick={(e) => { this.add(e, element.id); }}><i className="iconfont icon-plus"></i></span>;
            const edit = <span onClick={(e) => { this.edit(e, element.id, element.name, element.comment); }}>
                <i className="iconfont icon-palace-table-edit"></i></span>;
            const del = <span onClick={(e) => { this.del(e, element.id); }}><i className="iconfont icon-palace-delete"></i></span>;
            const drag = <span onClick={(e) => { this.drag(e, element.id); }}><i className="iconfont icon-palace-remove"></i></span>;
            if (this.props.type === "material") {
                if (n <= 2) {
                    act = <div className="item_title_active">{add}{del}{edit}{drag}</div>;
                } else {
                    act = <div className="item_title_active">{del}{edit}{drag}</div>;
                }
            } else {
                if (n <= 1) {
                    act = <div className="item_title_active">{add}{del}{edit}{drag}</div>;
                } else {
                    act = <div className="item_title_active">{del}{edit}{drag}</div>;
                }
            }
            if (this.state.drag) {
                if (element.drag) {
                    li = <li key={index} >
                        <div className="item-name" data-id={element.id} data-order={element.order}
                            data-parent={element.parentId} data-name={element.name} key={index} onClick={(event) => { this.toogle(event, true); }}>
                            <div className="item_title_icon">
                                <i className={`iconfont icon-right ${iClass}`}></i>
                            </div>
                            <div className="item_title_name">
                                {element.name}
                            </div>
                            <div className="item_title_remark">
                                {element.comment}
                            </div>
                            <div className="item_title_active">
                                <div className="iconfont icon-up" onClick={(e) => { this.up(e, element.id, element.parentId); }}>
                                    <span className="up-info">上移</span>
                                </div>
                                <div className="iconfont icon-down" onClick={(e) => { this.down(e, element.id, element.parentId); }}>
                                    <span className="down-info">下移</span>
                                </div>
                                <div className="iconfont icon-left" onClick={(e) => { this.left(e, element.id, element.parentId); }}>
                                    <span className="left-info">升级</span>
                                </div>
                                <div className="iconfont icon-right" onClick={(e) => { this.right(e, element.id, element.parentId); }}>
                                    <span className="right-info">降级</span>
                                </div>
                                <Button text="保存" click={(e) => { this.moveQuest(); }} />
                                <Button text="取消" click={(e) => { this.moveCancel(); }} />
                            </div>
                        </div>
                    </li >;
                } else {
                    li = <li key={index} >
                        <div className="item-name" data-id={element.id} data-order={element.order}
                            data-parent={element.parentId} data-name={element.name} key={index} onClick={(event) => { this.toogle(event, true); }}>
                            <div className="item_title_icon">
                                <i className={`iconfont icon-right ${iClass}`}></i>
                            </div>
                            <div className="item_title_name">
                                {element.name}
                            </div>
                            <div className="item_title_remark">
                                {element.comment}
                            </div>
                        </div>
                        {ul}
                    </li>;
                }
            } else {
                li = <li key={index} >
                    <div className="item-name" data-id={element.id} data-order={element.order}
                        data-parent={element.parentId} data-name={element.name} key={index} onClick={(event) => { this.toogle(event, true); }}>
                        <div className="item_title_icon">
                            <i className={`iconfont icon-right ${iClass}`}></i>
                        </div>
                        <div className="item_title_name">
                            {element.name}
                        </div>
                        <div className="item_title_remark">
                            {element.comment}
                        </div>
                        {act}
                    </div>
                    {ul}
                </li>;
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
                    drag: item.drag,
                    order: item.order,
                    active: item.active,
                    comment: item.comment,
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
    protected toogle(event: React.MouseEvent<HTMLDivElement>, state?: boolean) {
        const target = event.currentTarget;
        const { name, id } = this.getElementInfo(target);
        const li = target.parentElement;
        const i = target.querySelector("i");
        const ul = li.querySelector("ul");
        if (ul) {
            if (ul.classList.contains("active")) {
                ul.classList.remove("active");
                i.classList.add("icon-right");
                if (i.classList.contains("icon-down")) {
                    i.classList.remove("icon-down");
                }

            } else {
                ul.classList.add("active");
                i.classList.add("icon-down");
                if (i.classList.contains("icon-right")) {
                    i.classList.remove("icon-right");
                }
            }
        }
        if (state && this.props.selectTag) {
            this.props.selectTag(name, id);
        }
    }
    protected add(e: React.MouseEvent<HTMLElement>, id: number) {
        e.stopPropagation();
        const list = [...this.state.list];
        const list1 = list.filter(item => item.parentId === id);
        let order;
        if (list1.length) {
            order = getOrder(list1[list1.length - 1].order, null);
        } else {
            order = "1";
        }
        if (this.props.add) {
            this.props.add(id, order);
        }
    }
    protected edit(e: React.MouseEvent<HTMLElement>, id: number, name: string, comment: string) {
        e.stopPropagation();
        if (this.props.edit) {
            this.props.edit(id, name, comment);
        }
    }
    protected del(e: React.MouseEvent<HTMLElement>, id: number) {
        e.stopPropagation();
        if (this.props.del) {
            this.props.del(id);
        }
    }
    protected drag(e: React.MouseEvent<HTMLElement>, id: number) {
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
    protected up(e: React.MouseEvent<HTMLElement>, id: number, parentId?: number) {
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
