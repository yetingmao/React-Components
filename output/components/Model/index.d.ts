import * as React from "react";
export interface IProps {
    show: boolean;
    dataClass: string;
}
export interface IStates extends IProps {
}
export declare class Model extends React.Component<IProps, IStates> {
    constructor(props: IProps);
    componentDidMount(): void;
    isShow(): void;
    componentWillReceiveProps(props: any): void;
    render(): JSX.Element;
}
