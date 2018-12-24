import * as React from "react";
import { ISelect } from "./Select";
export interface IProps {
    config: {
        titleKey: string;
        childrenKey: string;
        idKey: string;
        count?: string;
    };
    dataSource: ISelect[];
    selectId: string[] | undefined;
    onSelectItem: (item: {}, id: string) => void;
    onCancel?: () => void;
}
export interface IState {
}
export declare class TreeList extends React.PureComponent<IProps, IState> {
    render(): JSX.Element;
}
