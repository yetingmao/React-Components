import * as React from 'react';
import * as ReactDOM from 'react-dom';
if (typeof window !== "undefined") {
    require("./style.css");  // tslint:disable-line:no-var-requires
}
interface IPagelinkProps {
    className?: string;
    text?: string;
    clickPage?: Function;
    index?: number;
}
interface IPagelinkStates {
    //
}
export class Pagelink extends React.Component<IPagelinkProps, IPagelinkStates>{
    constructor(props?: IPagelinkProps, state?: IPagelinkStates) {
        super(props);
    }
    clickEvent() {
        let classValue = this.props.className.split(" ");
        if (classValue.indexOf("disabled") < 0 && classValue.indexOf("active") < 0) {
            this.props.clickPage(this.props.index);
        }
    }
    render() {
        return (
            <li className={this.props.className} onClick={() => { this.clickEvent() }}>
                <a href="javascript:void(0)">{this.props.text}</a>
            </li>
        )
    }
}
interface PageProps {
    clickPage?: Function,
    totalCount?: number,
    pageSize?: number,
    pageIndex?: number,
    showLinkNum?: number,
    prevText?: string,
    firstText?: string,
    nextText?: string,
    lastText?: string,
}
interface PageStates {
    totalCount?: number,
    goIndex?: number,


}
export class Page extends React.Component<PageProps, PageStates>{
    constructor(props?: PageProps, state?: PageStates) {
        super(props);
        this.state = {
            goIndex: 0,
        }
    }
    clickPage(index: number) {
        this.props.clickPage(index);
    }
    getPageLink(item: any) {
        return <Pagelink text={item.text} index={item.index} className={item.className} clickPage={this.clickPage.bind(this)} />
    }
    getTotalPages() {
        return Math.ceil(this.props.totalCount / this.props.pageSize);
    }
    goIndexChanged(e: any) {
        let n = parseInt(e.target.value);
        let v;
        if (!isNaN(n) && n > 0) {
            v = Math.min(n, this.getTotalPages());
        }
        this.setState({ goIndex: v });
    }
    goClicked() {
        let idx = this.state.goIndex - 1;
        if (idx >= 0 && idx !== this.props.pageIndex) {
            this.clickPage(idx);
            this.setState({ goIndex: 0 });
        }
    }
    render() {
        let arr = [];
        if (this.props.totalCount > 0) {
            let totalPages = this.getTotalPages();
            let prevDisplay = this.props.pageIndex == 0 ? 'disabled' : '';
            let lastDisplay = this.props.pageIndex == totalPages - 1 ? 'disabled' : '';
            arr.push(
                this.getPageLink({
                    text: '首页',
                    index: 0,
                    className: prevDisplay
                })
            );
            arr.push(
                this.getPageLink({
                    text: '上一页',
                    index: Math.max(this.props.pageIndex - 1, 0),
                    className: prevDisplay,
                })
            )
            if (this.props.showLinkNum > 0) {
                let startIndex = this.props.pageIndex;
                arr.push(
                    this.getPageLink({
                        text: startIndex + 1,
                        index: startIndex,
                        className: 'active',
                    })
                )
                for (let j = startIndex - 1, i = 0; j >= Math.max(0, startIndex - 2); j-- , i++) { //左边
                    arr.splice(
                        arr.length - 1 - i,
                        0,
                        this.getPageLink({
                            text: j + 1,
                            index: j,
                            className: '',
                        })
                    )
                };
                for (let i = startIndex + 1; i < Math.min(startIndex + 3, totalPages); i++) { //右边
                    arr.push(
                        this.getPageLink({
                            text: i + 1,
                            index: i,
                            className: ''
                        })
                    )
                }
            }
            arr.push(
                this.getPageLink({
                    text: '下一页',
                    index: Math.min(this.props.pageIndex + 1, totalPages - 1),
                    className: lastDisplay,
                })
            )
            arr.push(
                this.getPageLink({
                    text: '末页',
                    index: totalPages - 1,
                    className: lastDisplay,
                })
            )
            if (totalPages > this.props.showLinkNum) {
                arr.push(
                    <li className="input-group">
                        <a className="group-jump" href="javascript:void(0)">跳转到</a>
                        <input onChange={(e) => { this.goIndexChanged(e) }} type="text" className="form-control" placeholder="page" />
                        <button onClick={() => { this.goClicked() }} className="btn btn-default" type="button">确定</button>
                    </li>
                )
            }
            arr.push(
                <li className='pagination-count'>
                    <a href="javascript:void(0)" aria-hidden="true">{this.props.pageIndex + 1}/{totalPages} 共{this.props.totalCount}条数据</a>
                </li>
            )
        }
        return (
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    {arr}
                </ul>
            </nav>
        )
    }
}