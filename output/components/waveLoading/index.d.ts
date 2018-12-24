import * as React from "react";
export interface IProps {
    progress: number;
    bgColor?: string;
    waveColor?: string;
    color?: string;
}
export interface IStates {
}
export declare class WaveLoading extends React.Component<IProps, IStates> {
    constructor(props: IProps);
    componentDidMount(): void;
    componentWillReceiveProps(): void;
    render(): JSX.Element;
}
