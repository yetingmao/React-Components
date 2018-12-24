import * as React from "react";
export interface IProps {
    type?: string;
    text: string;
    icon?: string;
    isActive?: boolean;
    disabled?: boolean;
    click?: (e?: any) => void;
}
export interface IState extends IProps {
}
export declare class Button extends React.Component<IProps, IState> {
    constructor(props: IProps);
    componentWillReceiveProps(props: IProps): void;
    render(): JSX.Element;
}
