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
export default class MatchNav extends React.Component<IProps, IStates> {
    protected navList: IList[] = [
        {
            title: "匹配规则", linkUrl: "/match/matchrule", icon: "icon-palace-match",
        },
        // {
        //     title: "计算规则", linkUrl: "/match/calculaterule", icon: "icon-palace-calculation",
        // },
        {
            title: "库信息", linkUrl: "/match/libraryinfo", icon: "icon-palace-library-info",
        },
        {
            title: "清单项目库", linkUrl: "/match/library?page=list", icon: "icon-palace-list-library",
        },
        {
            title: "定额项目库", linkUrl: "/match/library?page=norm", icon: "icon-palace-quota-library",
        },
        {
            title: "人才机库", linkUrl: "/match/library?page=material", icon: "icon-palace-material-library",
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
            <div className="gjk-matchNav">
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
        //   Router.push(url);
    }
}
