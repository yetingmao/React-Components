import * as React from "react";
export interface IProps {
    width?: number;
    height?: number;
    lazyload?: boolean;
    source?: string;
    defaultImage?: string;
    onClick?: (e?: React.MouseEvent<HTMLImageElement>) => void;
}
export interface IState {
    defaultImage: string;
    lazyload: boolean;
}
export declare class Img extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
}
