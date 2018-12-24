import * as React from "react";
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
export declare class Select extends React.Component<IProps, IStates> {
    constructor(props?: IProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(props: IProps): void;
    reset(): void;
    render(): JSX.Element;
    private hidden;
    private setSelect;
    private selectItem;
}
