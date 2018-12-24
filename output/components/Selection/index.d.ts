import * as React from "react";
export interface IProps {
    titleName: string;
    required?: boolean;
    width?: number;
}
export interface IStates {
}
export declare class Selection extends React.Component<IProps, IStates> {
    constructor(props: IProps);
    render(): JSX.Element;
}
