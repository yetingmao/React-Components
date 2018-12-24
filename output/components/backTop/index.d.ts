import * as React from "react";
export interface IProps {
    scrollHeight?: number;
}
export interface IStates {
    isShow: boolean;
}
export declare class Top extends React.Component<IProps, IStates> {
    constructor(props: IProps, state: IStates);
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleScroll(): void;
    toTop(): void;
    mouseEneter(): void;
    mouseLeave(): void;
    render(): JSX.Element;
}
