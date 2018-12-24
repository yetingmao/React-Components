
import * as React from "react";
if (typeof window !== "undefined") {
    require("./style.css");// tslint:disable-line:no-var-requires
}
export interface IProps {
    show: boolean;
}
export interface IStates extends IProps {

}
export class Loading extends React.Component<IProps, IStates> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            show: this.props.show,
        };
    }
    public componentWillReceiveProps(props: any) {
        this.setState({
            show: props.show,
        });
    }
    public render() {
        return <div className={`model_loading ${this.state.show ? " loading_fadeIn" : ""}`} >
            <div className="loading_overlay"></div>
            <div className="loading_effect">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div >;
    }
}
