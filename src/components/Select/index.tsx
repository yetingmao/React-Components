import * as React from "react";

if (typeof window !== "undefined") {
    require("./style.css");// tslint:disable-line:no-var-requires
}

export interface IProps {
    width?: number;
    dropdownTop?: boolean;
    disabled?: boolean;
    list?: any;
    val?: any;
    placeholder?: string;
    title?: string;
    getSelect?: (value: string) => void;
    invalid?: boolean;
}

export interface IStates extends IProps {

    isDropdownShow: boolean;
}
export class Select extends React.Component<IProps, IStates> {
    constructor(props?: IProps) {
        super(props);
        this.state = {
            val: props.val ? props.val : "",
            isDropdownShow: false,
        };
    }
    public componentDidMount() {
        window.addEventListener("click", this.hidden);
    }
    public componentWillUnmount() {
        window.removeEventListener("click", this.hidden);
    }
    public componentWillReceiveProps(props: IProps) {
        if (typeof props.val === "string") {
            this.setState({
                list: props.list,
                val: props.val,
            });
        } else {
            this.setState({
                list: props.list,
            });
        }
    }

    public reset() {
        this.setState({
            val: "",
        });
    }
    public render() {
        const { val, isDropdownShow } = this.state;
        const { title, disabled, dropdownTop, placeholder, width, list, invalid } = this.props;
        let data;
        let styleHeight = "auto";
        if (list && list.length > 0) {
            if (dropdownTop) {
                styleHeight = `-${list.length * 36 + 2}px`;
            }
            data = list.map((item: any, i: number) => {
                return <li className={item === val ? "active" : ""} key={i} onClick={(e) => { this.selectItem(item); }}>{item}</li>;
            });
        }
        let titleTop;
        if (title) {
            titleTop = <span className="select-title">{title}</span>;
        }
        return <div className="select-filter-item">
            {titleTop}
            <div className="filter-content" style={{ width: width ? `${width}px` : "170px" }} onClick={(e) => { e.stopPropagation(); }}>
                <div className={`filter-select ${isDropdownShow ? "active" : ""}`} onClick={() => { if (!invalid) this.setSelect(); }}>
                    <input className="filter-input" type="text" placeholder={placeholder ? placeholder : "请选择"} disabled={disabled} value={val}
                        onChange={(e) => {
                            this.setState({
                                val: e.target.value,
                            });
                            if (this.props.getSelect) {
                                this.props.getSelect(e.currentTarget.value);
                            }
                        }} />
                    <i className={`iconfont icon-down`}></i>
                </div>
                {isDropdownShow ? <div className="select-dropdown" style={{ top: styleHeight }}>
                    <ul>
                        {data}
                    </ul>
                </div> : null}
            </div>
        </div>;
    }
    private hidden = () => {
        this.setState({
            isDropdownShow: false,
        });
    }
    private setSelect() {
        this.setState({
            isDropdownShow: !this.state.isDropdownShow,
        });
    }
    private selectItem(str: string) {
        this.setState({
            val: str,
            isDropdownShow: false,
        });
        if (str !== this.state.val && this.props.getSelect) {
            this.props.getSelect(str);
        }
    }
}
