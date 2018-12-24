import * as React from "react";
import * as lodash from "lodash";

if (typeof window !== "undefined") {
    require("./style.less");// tslint:disable-line:no-var-requires
}
export interface IList {
    title: string;
    items?: IList[];
    isOpen?: boolean;
    isSelect?: boolean;
    linkUrl: string;
    icon?: string;
}
export interface IProps {
    url?: string;
}
export interface IStates {
    dataList: IList[];
}
export default class NavBar extends React.Component<IProps, IStates> {
    protected navList: IList[] = [
        { title: "构件分类管理", linkUrl: "/product/classify", icon: "icon-palace-manage" },
        {
            title: "构件管理", linkUrl: "/product/manage", icon: "icon-palace-classify",
            items: [{ title: "待上架", linkUrl: "/product/manage?tab=1" }, { title: "已上架", linkUrl: "/product/manage?tab=2" }],
        },
        {
            title: "构件审核", linkUrl: "/product/check", icon: "icon-palace-check",
            items: [{ title: "待审核", linkUrl: "/product/check?tab=1" }, { title: "已审核", linkUrl: "/product/check?tab=2" }],
        },
        {
            title: "构件管理（企业共享）", linkUrl: "/product/comment/manage", icon: "icon-palace-classify",
            items: [{ title: "待上架", linkUrl: "/product/comment/manage?tab=1" }, { title: "已上架", linkUrl: "/product/comment/manage?tab=2" }],
        },
        {
            title: "构件审核（企业共享）", linkUrl: "/product/comment/check", icon: "icon-palace-check",
            items: [{ title: "待审核", linkUrl: "/product/comment/check?tab=1" }, { title: "已审核", linkUrl: "/product/comment/check?tab=2" }],
        },
    ];
    constructor(props: IProps) {
        super(props);
        const tabList = lodash.cloneDeep(this.navList);
        tabList.forEach((item: IList) => {
            if (item.linkUrl === props.url) {
                item.isSelect = true;
                item.isOpen = true;
            } else {
                if (item.items && item.items.length !== 0) {
                    item.items.forEach((nav: IList) => {
                        if (nav.linkUrl === props.url) {
                            nav.isSelect = true;
                            item.isOpen = true;
                        }
                    });
                }
            }
        });
        this.state = {
            dataList: tabList,
        };
    }
    public render() {
        const { url } = this.props;
        const { dataList } = this.state;
        let nodes = null;
        if (dataList.length !== 0) {
            nodes = dataList.map((item: IList, i: number) => {
                return <div key={i} className={`tabbar-title`}>
                    <div className={`parentNode ${(!item.items || item.items.length === 0) && item.isSelect ? "active" : ""}`}
                        onClick={() => {
                            if (item.items && item.items.length !== 0) {
                                this.select(item.linkUrl, i, 0);
                            } else {
                                this.select(item.linkUrl, i);
                            }
                        }}><div className="nodeTitle">
                            <i className={`iconfont ${item.icon ? item.icon : ""}`}></i>
                            {item.title}
                        </div>
                        {item.items && item.items.length !== 0 ?
                            <i className={`iconfont ${item.isOpen ? "icon-up" : "icon-down"}`}></i> : null}
                    </div>
                    {
                        item.items && item.items.length !== 0 && item.isOpen ?
                            item.items.map((items: IList, index) => {
                                return <p key={index} className={`childNode ${items.isSelect ? "active" : ""}`}
                                    onClick={() => { this.select(items.linkUrl, i, index); }}>{items.title}</p>;
                            }) : null
                    }
                </div >;
            });
        }
        return (
            <div className="gjk-navbar">
                {nodes}
            </div >
        );
    }
    protected select = (url: string, parent: number, child?: number) => {
        const dataList = lodash.cloneDeep(this.navList);
        if (typeof child === "number") {
            dataList[parent].isOpen = true;
            dataList[parent].items[child].isSelect = true;
        } else {
            dataList[parent].isSelect = true;
        }
        this.setState({ dataList: dataList });
        //  Router.push(url);
    }
}
