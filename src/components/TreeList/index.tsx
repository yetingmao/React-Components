import * as React from "react";
import Select, { ISelect } from "./Select";
if (typeof window !== "undefined") {
    require("./style.css");// tslint:disable-line:no-var-requires
}

export interface IProps {
    config: { titleKey: string, childrenKey: string, idKey: string, count?: string };
    dataSource: ISelect[];
    selectId: string[] | undefined;
    onSelectItem: (item: {}, id: string) => void;
    onCancel?: () => void;
}
export interface IState {
}
export class TreeList extends React.PureComponent<IProps, IState> {
    public render() {
        const { dataSource, onSelectItem, config, selectId, onCancel } = this.props;
        return (
            <ul className="component-treeList" onClick={onCancel}>
                {dataSource!.map((item, index) => {
                    return (
                        <Select
                            config={config}
                            select={item}
                            selectId={selectId}
                            onSelect={onSelectItem}
                            key={index.toString()}
                            index={index.toString()}
                        />
                    );
                })}
            </ul>
        );
    }
}

