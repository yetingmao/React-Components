import * as React from "react";

if (typeof window !== "undefined") {
    // tslint:disable-next-line:no-var-requires
    require("./style.css");
}

export interface IProps {
    type?: string;//按钮类型 xfl-btn-danger xfl-btn-orange xfl-btn-cancle  backstage
    text: string;
    icon?: string;
    isActive?: boolean;
    disabled?: boolean;
    click?: (e?: any) => void;
}

export interface IState extends IProps {

}

export class Button extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            type: props.type,
            text: props.text,
            icon: props.icon,
            isActive: props.isActive,
            disabled: props.disabled,
        };
    }
    public componentWillReceiveProps(props: IProps) {
        this.setState({
            type: props.type,
            text: props.text,
            icon: props.icon,
            isActive: props.isActive,
            disabled: props.disabled,
        });

    }

    public render() {
        const type = this.state.type;
        const text = this.state.text;
        const icon = this.state.icon;
        const isActive = this.state.isActive;
        const disabled = this.state.disabled;
        let name = "";
        if (type) {
            name = type;
        }
        if (isActive) {
            name += " active";
        }
        return <button type="button" disabled={disabled ? true : false} className={`xfl-btn ${name}`}
            onClick={(e) => { if (this.props.click) { this.props.click(e); } }}>
            {icon ? <i className={`iconfont ${icon}`}></i> : ""}
            {text}
        </button>;
    }
}
