import * as React from "react";
if (typeof window !== "undefined") {
    // tslint:disable-next-line:no-var-requires
    require("./style.css");
}

export interface IProps {
    disabled?: boolean;
    checked?: boolean;
    onSelect?: (checked?: boolean) => void;
}
export interface IStates {
    disabled: boolean;
    checked: boolean;
}
export default class Checkbox extends React.Component<IProps, IStates> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            disabled: typeof props.disabled === "boolean" ? props.disabled : false,
            checked: typeof props.checked === "boolean" ? props.checked : false,
        };
    }
    public componentWillReceiveProps(props: IProps) {
        if (typeof props.disabled === "boolean") {
            this.setState({
                disabled: props.disabled,
            });
        }
        if (typeof props.checked === "boolean") {
            this.setState({
                checked: props.checked,
            });
        }
    }
    public render() {
        const { onSelect } = this.props;
        const { disabled, checked } = this.state;
        return (
            <div className={`gjk-checkbox ${disabled ? "disabled" : (checked ? "checked" : "")}`} onClick={() => {
                this.setState({
                    checked: !checked,
                });
                if (onSelect) {
                    this.props.onSelect(!checked);
                }
            }}>
                <i className="iconfont icon-palace-check-mark"></i>
            </div>
        );
    }
}
