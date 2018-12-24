import * as React from "react";
export interface IProps {
    count: number;
    pageSize: number;
    offset: number;
    pageList?: string[];
    handlePageClick: (num: number) => void;
    handlePageSizeClick?: (num: number) => void;
}
export interface IStates {
    text: string;
}
export default class Pagination extends React.Component<IProps, IStates> {
    constructor(props: IProps);
    componentWillReceiveProps(props: IProps): void;
    render(): JSX.Element;
    private pageSizeChange;
    private pageChange;
    private changePage;
}
