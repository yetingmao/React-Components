import * as React from "react";
if (typeof window !== "undefined") {
    require("./style.css");  // tslint:disable-line:no-var-requires
}

export interface IProps {
    content: JSX.Element;
    arrowPlace?: string;//left center right
}
export interface IStates {

}
export default class Popover extends React.Component<IProps, IStates> {
    constructor(props: IProps, state: IStates) {
        super(props);
        this.state = {

        };
    }
    public render() {
        return <div className="gjk-popover">
            <div className={`arrow ${this.props.arrowPlace ? `arrow${this.props.arrowPlace}` : ""}`}></div>
            {this.props.content}
        </div>;
    }
}
