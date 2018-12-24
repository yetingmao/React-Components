import * as React from "react";
export interface IProps {
    index?: number;
    callback?: (index: number) => void;
}
export interface IStates {
    current?: number;
}
export declare class Tab extends React.Component<IProps, IStates> {
    constructor(props?: IProps);
    itemNav: (index: number) => "title-item active" | "title-item";
    itemCon: (index: number) => "con-item active" | "con-item";
    render(): JSX.Element;
}
