import * as React from "react";
if (typeof window !== "undefined") {
    require("./style.css");// tslint:disable-line:no-var-requires 
}

export interface IProps {
    width?: number;
    placeholder?: string;
    name?: string;
    iconClass?: string;
    getName?: (name: string) => void;
}
export interface IStates extends IProps {

}
export default class SearchInput extends React.Component<IProps, IStates> {
    constructor(props?: IProps, context?: any) {
        super(props, context);
        this.state = {
            name: props.name || "",
            iconClass: props.name || "icon-search_a",
        };
    }
    public render() {
        const { width = 300, placeholder = "" } = this.props;
        const { name, iconClass } = this.state;
        let del;
        if (name) {
            del = <div className="del-btn" onClick={() => { this.setState({ name: "" }); }}>
                <span className="iconfont icon-prompt-a "></span>
            </div>;
        }
        return (
            <div className="search_input" style={{ width: `${width}px` }}>
                <input type="text" placeholder={placeholder}
                    value={name}
                    onChange={(e) => { this.getName(e); }}
                    onKeyPress={this.serach}
                />
                {del}
                <div className="search-btn">
                    <span className={`iconfont ${iconClass}`} onClick={() => { this.props.getName(name); }}></span>
                </div>
            </div>
        );
    }
    public reset() {
        this.setState({
            name: "",
        });
    }
    private getName(e: React.ChangeEvent<HTMLInputElement>) {
        const name = e.target.value;
        if (name.length > 20) {
            return;
        }
        this.setState({
            name,
        });
    }
    private serach = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { getName } = this.props;
        const eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if (getName && eCode === 13) {
            getName(e.currentTarget.value);
        }
    }
}

