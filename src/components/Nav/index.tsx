import * as React from "react";
if (typeof window !== "undefined") {
    require("./style.css");  // tslint:disable-line:no-var-requires
}

export interface IProps {
    active: string;
}
export interface IStates extends IProps {

}
export default class Nav extends React.Component<IProps, IStates> {
    constructor(props?: IProps, context?: any) {
        super(props, context);
    }
    public render() {
        return (
            <div className="gjk-nav">
                {/* <div onClick={(e) => { this.select(e); }} className={(this.props.active === "attribute") ? "active" : ""}>
                    <a href="/attribute">属性管理</a>
                </div> */}
                <div onClick={(e) => { this.select(e); }} className={(this.props.active === "product") ? "active" : ""}>
                    <a href="/product/classify">构件管理</a>
                </div>
                <div onClick={(e) => { this.select(e); }} className={(this.props.active === "match") ? "active" : ""}>
                    <a href="/match/matchrule">清单定额</a>
                </div>
            </div>
        );
    }
    protected select(e: React.MouseEvent<HTMLDivElement>) {
        const target = e.currentTarget;
        const divTarget = target.parentElement;
        const div = divTarget.querySelector("div.active");
        if (div) {
            div.classList.remove("active");
        }
        target.classList.add("active");
    }
}
