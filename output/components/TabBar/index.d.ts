import * as React from "react";
export interface IProps {
    current?: number;
    callback?: (data?: string) => void;
}
export interface IStates extends IProps {
}
export declare class TabBar extends React.Component<IProps, IStates> {
    constructor(props?: IProps);
    render(): JSX.Element;
    protected itemNav: (index: number) => "tabbar-title active" | "tabbar-title";
    protected select: (i: number, data: string) => void;
}
