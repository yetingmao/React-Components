import * as React from "react";
export interface IProps {
    show: boolean;
}
export interface IStates extends IProps {
}
export declare class Loading extends React.Component<IProps, IStates> {
    constructor(props: IProps);
    componentWillReceiveProps(props: any): void;
    render(): JSX.Element;
}
