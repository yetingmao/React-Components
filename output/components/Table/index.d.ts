import * as React from "react";
export interface IProps {
    title: (string | JSX.Element)[];
    list: any;
    tbodyHeight?: string;
    rowSpan?: boolean;
}
export interface IStates extends IProps {
}
export declare class Table extends React.Component<IProps, IStates> {
    constructor(props: IProps);
    render(): JSX.Element;
}
