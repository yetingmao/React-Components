import * as React from "react";
if (typeof window !== "undefined") {
    require("./style.css");// tslint:disable-line:no-var-requires 
}

export interface IProps {
    title: (string | JSX.Element)[];
    list: any;
    tbodyHeight?: string;
    rowSpan?: boolean;
}
export interface IStates extends IProps {

}
export class Table extends React.Component<IProps, IStates> {
    constructor(props: IProps) {
        super(props);
    }
    public render() {
        let title: any;
        let content: any;
        if (this.props.title && this.props.title.length > 0) {
            title = this.props.title.map((item: string, i: number) => {
                return <td key={i}> {item} </td>;
            });
        }
        if (this.props.list && this.props.list.length) {
            content = <tbody>{this.props.list}</tbody>;
            if (this.props.rowSpan) {
                content = this.props.list;
            }
        } else {
            content = <tbody><tr><td colSpan={this.props.title.length}><h5 style={{ textAlign: "center" }}>暂无数据</h5></td></tr></tbody>;
        }
        return <table className={`gjk_table ${this.props.rowSpan ? "rowSpan_table" : ""}`}>
            <thead>
                <tr>
                    {title}
                </tr>
            </thead>
            {content}
        </table>;
    }
}

