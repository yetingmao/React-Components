import * as React from "react";
export interface ISelect {
    [key: string]: string | ISelect[];
}
export interface ISelectProps {
    selectId: string[] | undefined;
    config: {
        titleKey: string;
        childrenKey: string;
        idKey: string;
        count?: string;
    };
    select: ISelect;
    onSelect: (item: {}, id: string) => void;
    index: string;
}
export interface IState {
    showChildren: boolean;
}
declare class Select extends React.PureComponent<ISelectProps, IState> {
    constructor(props: ISelectProps);
    render(): JSX.Element;
    protected toggleChildren: () => void;
    protected toggleChecked: () => void;
}
export default Select;
