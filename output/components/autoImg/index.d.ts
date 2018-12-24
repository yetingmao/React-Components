import * as React from "react";
export interface IProps {
    width: number;
    height: number;
    lazyload?: boolean;
    source?: string;
    defaultImage?: string;
    className?: string;
    onClick?: (e?: React.MouseEvent<HTMLImageElement>) => void;
}
export interface IState {
    imgWidth: number;
    imgHeight: number;
}
export declare class AutoImg extends React.Component<IProps, IState> {
    constructor(props: IProps, state: IState);
    componentDidMount(): void;
    getNaturalSize(): void;
    render(): JSX.Element;
}
