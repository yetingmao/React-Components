import * as React from "react";
import { Button } from "../Button";
if (typeof window !== "undefined") {
    require("./style.css");// tslint:disable-line:no-var-requires
}
export interface IProps {
    data?: string[];
    showSelect?: boolean;
    getSelect?: (items: string[]) => void;

}
export interface IStates extends IProps {
    list?: { name: string, active?: boolean }[];
    selectItems?: string[];
    active?: boolean;

}
export default class SelectTab extends React.Component<IProps, IStates> {

    constructor(props?: IProps, context?: any) {
        super(props, context);
        let list: { name: string, active?: boolean }[];
        if (props.data && props.data.length) {
            list = props.data.map((name) => {
                return {
                    name,
                    active: false,
                };
            });
        }
        this.state = {
            list: list || [],
            selectItems: [],
        };
    }
    public render() {
        let list;
        let select;
        let active;
        if (this.state.list.length) {
            list = this.state.list.map((item, i) => {
                return <Button key={i} text={item.name} type="" isActive={item.active} click={(e) => { this.active(item.name); }} />;
            });
            if (this.props.showSelect) {
                select = this.state.list.map((item, i) => {
                    if (item.active === true) {
                        return <div className="tag-select" key={i}>
                            {item.name}
                            <span className="iconfont icon-prompt-a" onClick={() => { this.active(item.name); }}></span>
                        </div>;
                    }
                });
            }
            active = <div className="info-select">
                <Button text="确定" type="" click={(e) => { this.submit(); }} />
                <Button text="取消" type="" click={(e) => { this.cancel(); }} />
                <Button text="清空筛选" type="" click={(e) => { this.reset(); }} />
            </div>;
        }
        return (
            <div className={`select-tag ${this.state.active ? "active" : ""}`}>
                <div className={`tag-title`}
                    onClick={() => { this.show(); }}>标签
                    <span className={`iconfont ${this.state.active ? "icon-up" : "icon-down"}`}></span></div>
                {select}
                <div className="tag-info">
                    <div className="info-name">
                        {list}
                    </div>
                    {active}
                </div >
                <div className="tag-line"></div>
            </div >
        );
    }
    public reset() {
        const list = this.state.list.map((item) => {
            return {
                name: item.name,
                active: false,
            };
        });
        this.setState({
            list,
            selectItems: [],
        });
        this.show(false);
    }
    public show(show?: boolean) {
        if (show === false || show) {
            this.setState({
                active: show,
            });
        } else {
            this.setState({
                active: !this.state.active,
            });
        }
    }
    private active(name: string) {
        const list = [...this.state.list];
        list.forEach((item) => {
            if (item.name === name) {
                item.active = !item.active;
            }
        });
        this.setState({
            list,
        });
    }
    private submit() {
        const selectItems = [];
        this.state.list.forEach((item) => {
            if (item.active === true) {
                selectItems.push(item.name);
            }
        });
        if (this.props.getSelect) {
            this.props.getSelect(selectItems);
        }
        this.setState({
            selectItems,
        });
        this.show();
    }
    private cancel() {
        const list = this.state.list.map((item) => {
            return {
                name: item.name,
                active: false,
            };
        });
        const selectItems = [...this.state.selectItems];
        list.forEach((item) => {
            if (selectItems.includes(item.name)) {
                item.active = true;
            } else {
                item.active = false;
            }
        });
        this.setState({
            list,
        });
        this.show();
    }

}

