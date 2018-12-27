import * as React from "react";
if (typeof window !== "undefined") {
    require("./style.css");// tslint:disable-line:no-var-requires 
}

export interface IProps {
    title?: string;
    getStartTime?: (n: number) => void;
    getEndTime?: (n: number) => void;
}
export interface IStates extends IProps {
    start?: string;
    end?: string;

}
export default class Time extends React.Component<IProps, IStates> {
    constructor(props?: IProps, context?: any) {
        super(props, context);
        this.state = {
            start: "",
            end: "",
        };
    }
    public render() {
        return (
            <div className="search-time">
                <span className="time-lable">{this.props.title}</span>
                <div>
                    <input value={this.state.start} type="date" onChange={(e) => { this.selectStartTime(e); }} />
                    <span>到</span>
                    <input value={this.state.end} type="date" onChange={(e) => { this.selectEndTime(e); }} />
                </div>
            </div>
        );
    }
    public reset() {
        this.setState({
            start: "",
            end: "",
        });
    }

    private selectStartTime(e: React.ChangeEvent<HTMLInputElement>) {
        const time = e.target.value;
        this.setState({
            start: time,
        });
        const startTime = new Date(time).getTime();
        if (this.props.getStartTime) {
            this.props.getStartTime(startTime);
        }

    }
    private selectEndTime(e: React.ChangeEvent<HTMLInputElement>) {
        const time = e.target.value;
        this.setState({
            end: time,
        });
        const endTime = new Date(time).getTime();
        if (this.props.getEndTime) {
            this.props.getEndTime(endTime);
        }
    }
}

