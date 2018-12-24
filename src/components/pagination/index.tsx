import * as React from "react";
import ReactPaginate from "react-paginate";
import { Select } from "../Select";
if (typeof window !== "undefined") {
    require("./style.css");  // tslint:disable-line:no-var-requires
}

export interface IProps {
    count: number;
    pageSize: number;
    offset: number;
    pageList?: string[];//单页项目数量列表
    handlePageClick: (num: number) => void;
    handlePageSizeClick?: (num: number) => void;
}
export interface IStates {
    text: string;
}
export default class Pagination extends React.Component<IProps, IStates> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            text: props.offset.toString(),
        };
    }
    public componentWillReceiveProps(props: IProps) {
        this.setState({
            text: props.offset.toString(),
        });
    }
    public render() {
        const pageSizeList = ["10", "50", "100"];
        const { count, pageSize, offset, pageList } = this.props;
        const pageCount = Math.ceil(count / pageSize);
        return <div className="gjk_pagination">
            <div className="pagination-info">
                <div className="total">共 <span>{count}</span> 条</div>，
                <div className="pageNum">共 <span>{pageCount}</span> 页</div>
            </div>
            <div className="pageContent">
                <span>当前：</span>
                <Select dropdownTop disabled list={pageList ? pageList : pageSizeList} getSelect={(str) => { this.pageSizeChange(str); }} />
                <span className="current-count-page">条 / 页</span>
                <ReactPaginate previousLabel={<i className="iconfont icon-left"></i>}
                    nextLabel={<i className="iconfont icon-right"></i>}
                    breakLabel={<a>...</a>}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={5}
                    forcePage={offset - 1}
                    onPageChange={(num: { selected: number }) => {
                        this.setState({
                            text: (num.selected + 1).toString(),
                        });
                        this.props.handlePageClick(num.selected + 1);
                    }}
                    containerClassName={"pagination"}
                    activeClassName={"active"} />
                <div className="input-group" >
                    <a className="group-jump" href="javascript:void(0)">跳转到</a>
                    <input type="text" className="form-control" ref="pageJump" value={this.state.text}
                        onChange={(e) => { this.changePage(e); }}
                        onKeyUp={(e) => {
                            e.currentTarget.value = e.currentTarget.value.replace(/[^\d]/g, "");
                            if (e.keyCode === 13) { this.pageChange(); }
                        }}
                    />
                    <button onClick={() => { this.pageChange(); }} >GO</button>
                </div>
            </div>
        </div>;
    }
    private pageSizeChange(str: string) {
        this.props.handlePageSizeClick(parseInt(str, 10));
    }
    private pageChange() {
        const page = parseInt(this.state.text, 10);
        if (isNaN(page) || page === this.props.offset) {
            return;
        }
        this.props.handlePageClick(page);
    }
    private changePage(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            text: e.target.value,
        });
    }
}

