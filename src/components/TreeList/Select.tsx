import * as React from "react";
if (typeof window !== "undefined") {
    require("./style.css");// tslint:disable-line:no-var-requires 
}

export interface ISelect {
    [key: string]: string | ISelect[];
}
export interface ISelectProps {
    selectId: string[] | undefined;
    config: { titleKey: string, childrenKey: string, idKey: string, count?: string };
    select: ISelect;
    onSelect: (item: {}, id: string) => void;
    index: string;
}
export interface IState {
    showChildren: boolean;
}

class Select extends React.PureComponent<ISelectProps, IState> {
    constructor(props: ISelectProps) {
        super(props);
        this.state = {
            showChildren: props.index.length === 1 ? true : false,
        };
    }
    public render(): JSX.Element {
        const { showChildren } = this.state;
        const { select, onSelect, selectId, config, index } = this.props;
        const title = select[config.titleKey];
        const id = select[config.idKey];
        const selects = select[config.childrenKey] !== undefined ? (select[config.childrenKey] as ISelect[]) : [];
        let counts;
        if (config !== undefined && config.count !== undefined) {
            counts = select[config.count];
        }
        let checked = false;
        if (selectId && selectId.length !== 0) {
            selectId.map((items) => {
                if (items === id) {
                    checked = true;
                }
            });
        }
        return (
            <li className="component-option" onClick={e => e.stopPropagation()}>
                <p className="c-option-content">
                    <i className={`iconfont ${selects.length > 0 ? (showChildren ? "icon-up" : "icon-down") : ""}`} onClick={this.toggleChildren} />
                    <span className="coc-title">
                        {title}{typeof counts === "number" ? <span className="coc-title-number">{counts}</span> : null}
                    </span>
                    <i onClick={() => { if (!select.disabled) { this.toggleChecked(); } }} className={`
                    iconfont icon-share-select ${select.disabled ? "disabled" : (checked ? "checked" : "unChecked")}`} />
                </p>
                {showChildren ? (<ul className="c-option-children">
                    {selects.map((item, i) => {
                        return <Select selectId={selectId} select={item} onSelect={onSelect} config={config} key={i.toString()} index={`${index}-${i}`} />;
                    })}
                </ul>) : false}
            </li>
        );
    }
    protected toggleChildren = () => {
        this.setState({ showChildren: !this.state.showChildren });
    }
    protected toggleChecked = () => {
        const { onSelect, selectId, select, config } = this.props;
        let isChecked = false;
        if (selectId.length !== 0) {
            selectId.map((item, i) => {
                if (select[config.idKey] === item) {
                    isChecked = true;
                }
            });
        }
        onSelect(select, isChecked ? "null" : (select[config.idKey] as string));
    }
}

export default Select;
