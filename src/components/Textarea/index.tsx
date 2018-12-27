import * as React from "react";
if (typeof window !== "undefined") {
    require("./style.css");// tslint:disable-line:no-var-requires
}

export interface IProps {
    width?: number;
    height?: number;
    disabled?: boolean;
    value?: string;
    maxLength?: number;
    placeholder?: string;
    getValue?: (value: string) => void;
    notShowLong?: boolean;
}
export interface IState {
    value: string;
}
export default class Textarea extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            value: typeof props.value === "string" ? props.value : "",
        };
    }
    public componentWillReceiveProps(props: IProps) {
        this.setState({
            value: typeof props.value === "string" ? props.value : "",
        });
    }
    public render() {
        const { getValue, maxLength, placeholder, width, height, disabled, notShowLong } = this.props;
        const { value } = this.state;
        const textWidth = width ? `${width}px` : `300px`;
        const textHeight = height ? `${height}px` : `100px`;
        let long = <div className="count">
            <span className="countNum">
                {value.length}
            </span>/{typeof maxLength === "number" ? this.props.maxLength : 100}
        </div>;
        if (notShowLong === true) {
            long = null;
        }
        return <div className="palace_textarea" style={{ width: textWidth, height: textHeight }}>
            <textarea autoFocus value={value} disabled={disabled}
                placeholder={typeof placeholder === "string" ? placeholder : ""}
                onChange={(e) => {
                    if (e.target.value.length <= 100) { this.setState({ value: e.target.value }); }
                }}
                onBlur={() => { if (getValue) { getValue(value); } }}
            />
            {long}
        </div>;
    }
}
