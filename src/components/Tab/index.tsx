import * as React from "react";

if (typeof window !== "undefined") {
    require("./style.css");// tslint:disable-line:no-var-requires
}
export interface IProps {
    index?: number;
    callback?: (index: number) => void;
}
export interface IStates {
    current?: number;
}
export class Tab extends React.Component<IProps, IStates> {
    constructor(props?: IProps) {
        super(props);
        this.state = {
            current: (this.props.index) ? this.props.index : 0,
        };
    }
    public itemNav = (index: number) => {
        return index === this.state.current ? "title-item active" : "title-item";
    }

    public itemCon = (index: number) => {
        return index === this.state.current ? "con-item active" : "con-item";
    }
    public render() {
        return (
            <div className="tab">
                <ul className="tab-title">
                    {
                        React.Children.map(this.props.children, (element: any, index: number) => {
                            return (
                                <li onClick={() => {
                                    this.setState({ current: index });
                                    if (this.props.callback) {
                                        this.props.callback(element.props["data-owner"]);
                                    }
                                }} className={this.itemNav(index)}>{element.props["data-title"]}</li>
                            );
                        })
                    }
                </ul>
                <div className="tab-con">
                    {
                        React.Children.map(this.props.children, (element: any, index: number) => {
                            return (
                                <div className={this.itemCon(index)}>{element}</div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }

}
