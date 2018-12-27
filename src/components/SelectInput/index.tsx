import * as React from "react";
if (typeof window !== "undefined") {
    require("./style.css");// tslint:disable-line:no-var-requires 
}

export interface IProps {
    disablied?: boolean;
    value?: string | number;
    getSelect?: (option: { name: string, id: number }) => void;
    isFocus?: (e: React.FocusEvent<HTMLInputElement>, active?: boolean) => void;
}
export interface IStates extends IProps {
    active?: boolean;

}
export default class SelectInput extends React.Component<IProps, IStates> {
    constructor(props?: IProps, context?: any) {
        super(props, context);
        this.state = {
            value: props.value || "",
        };
    }
    public render() {
        let iconfont;
        if (!this.props.disablied) {
            iconfont = <div className="input-btn" onClick={() => {
                this.setState({
                    active: !this.state.active,
                });
            }}>
                <span className={`iconfont ${this.state.active ? "icon-up" : "icon-down"} `}></span>
            </div>;
        }
        return <div className="gjk-selectInput">
            <input type="text"
                placeholder="请选择"
                disabled={this.props.disablied}
                value={this.props.value}
                onFocus={(e) => {
                    this.focus(e);
                }}
            />
        </div >;
    }
    private focus(e: React.FocusEvent<HTMLInputElement>) {
        const active = !this.state.active;
        this.setState({
            active,
        });
        if (this.props.isFocus) {
            this.props.isFocus(e, active);
        }
    }
}

