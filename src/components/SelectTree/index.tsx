import * as React from "react";
if (typeof window !== "undefined") {
    require("./style.css");// tslint:disable-line:no-var-requires
}

export interface IProps {
    placeholder?: string;
    data: any[];
    selectType?: any;
    getSelect?: (option: { name: string, id: number }) => void;
    id?: number;
}
export interface IStates extends IProps {
    active?: boolean;
    value?: string;
    searchName?: string;

}
export default class SelectTree extends React.Component<IProps, IStates> {
    constructor(props?: IProps, context?: any) {
        super(props, context);
        const data = props.data ? props.data : [];
        this.state = {
            data: data,
            selectType: props.selectType || data[0],
            id: props.id || null,
        };
    }
    public componentWillReceiveProps(props: IProps) {
        const id = props.id;
        if (typeof id === "number" || id === null) {
            let value = "";
            if (typeof id === "number") {
                props.data.map((item) => {
                    if (item.items && item.items.length !== 0) {
                        item.items.map((e) => {
                            if (id === e.id) {
                                value = `${item.name}/${e.ClientClass.name}`;
                            }
                        });
                    }
                });
            }
            this.setState({ id: id, value: value });
        }
    }
    public componentDidMount() {
        window.addEventListener("click", this.hidden);
    }
    public componentWillUnmount() {
        window.removeEventListener("click", this.hidden);
    }
    public render() {
        const { selectType, id } = this.state;
        const types = this.props.data.map((item, index) => {
            return <div key={index} className={`lableParents ${selectType.id === item.id ? "active" : ""}`} onClick={() => { this.change(item); }}>
                <span className="typeName">{item.name}</span>
                <i className={`iconfont ${selectType.id === item.id ? "icon-down" : "icon-right"}`}></i>
            </div>;
        });
        let ul = null;
        if (selectType && selectType.items && selectType.items.length) {
            ul = selectType.items.map((item, index) => {
                let ele;
                const name = item.ClientClass.name;
                if (this.state.searchName) {
                    if (name.includes(this.state.searchName)) {
                        ele = <li className={`${id === item.id ? "active" : ""}`} key={index} onClick={() => { this.select(selectType, item); }}>
                            <span className="typesName">{name}</span>
                        </li>;
                    }
                } else {
                    ele = <li className={`${id === item.id ? "active" : ""}`} key={index} onClick={() => { this.select(selectType, item); }}>
                        <span className="typesName">{name}</span>
                    </li>;
                }
                return ele;
            });
        }
        return <div className="gjk-selectTree" onClick={(e) => { e.stopPropagation(); }}>
            <div className="selectTree-input">
                <input type="text"
                    placeholder="请选择一个系统分类"
                    value={this.state.value}
                    onFocus={() => {
                        this.setState({
                            active: true,
                        });
                    }}
                />
                <div className="input-btn" onClick={() => {
                    this.setState({
                        active: !this.state.active,
                    });
                }}>
                    <span className={`iconfont ${this.state.active ? "icon-up" : "icon-down"} `}></span>
                </div>
            </div>
            <div className={`selectTree-tree ${this.state.active ? "selectTree-active" : ""}`}>
                <div className="selectTree-input-select">
                    <input type="text" readOnly
                        placeholder={this.props.placeholder}
                        value={this.state.searchName}
                        onChange={(e) => {
                            this.inputChange(e);
                        }}
                    />
                </div>
                <div className="tree_list">
                    <div className="typesLable">
                        {types}
                    </div>
                    <ul className="childList">
                        {ul}
                    </ul>
                </div>
            </div>
        </div >;
    }
    private hidden = () => {
        this.setState({
            active: false,
        });
    }
    private change(item) {
        this.setState({
            selectType: item,
        });
    }
    private inputChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            searchName: e.target.value,
        });
    }
    private select(selectType: any, item: any) {
        const firstName = selectType.name;
        const secondName = item.ClientClass.name;
        const value = `${firstName}/${secondName}`;
        this.setState({
            value,
            active: false,
            id: item.id,
        });
        if (this.props.getSelect) {
            this.props.getSelect({ name: value, id: item.id });
        }
    }
}

