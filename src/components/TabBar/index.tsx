import * as React from "react";

if (typeof window !== "undefined") {
    require("./style.css");// tslint:disable-line:no-var-requires
}
export interface IProps {
    current?: number;
    callback?: (data?: string) => void;
}
export interface IStates extends IProps {
}
export class TabBar extends React.Component<IProps, IStates> {
    constructor(props?: IProps) {
        super(props);
        this.state = {
            current: this.props.current ? this.props.current : 0,
        };
    }
    public render() {
        return (
            <div className="tabbar" >
                {
                    React.Children.map(this.props.children, (element: any, i) => {
                        return (
                            <div
                                onClick={() => { this.select(i, element.props["data-title"]); }}
                                className={this.itemNav(i)} >
                                <i className={element.props["data-icon"]}></i>
                                {element.props["data-title"]}
                            </div>
                        );
                    })
                }
            </div >
        );
    }
    protected itemNav = (index: number) => {
        return index === this.state.current ? "tabbar-title active" : "tabbar-title";
    }
    protected select = (i: number, data: string) => {
        this.setState({ current: i });
        this.props.callback(data);
    }


}
