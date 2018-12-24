import * as React from "react";
import Picture from "../Picture";

if (typeof window !== "undefined") {     // tslint:disable-next-line:no-var-requires
    require("./style.css");
}

export interface IProps {
    width?: number;
    height?: number;
    dataList: string[];
    defaultIndex?: number;
    callback?: (index: number) => void;
}
export interface IState {
    selectIndex: number;
    turnPage: number;
}

export default class ImgShow extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            selectIndex: typeof props.defaultIndex === "number" ? props.defaultIndex : 0,
            turnPage: 0,
        };
    }
    public render() {
        const { dataList, callback, width, height } = this.props;
        const { selectIndex, turnPage } = this.state;
        let isShow = true;
        if (dataList.length === 0) {
            isShow = false;
        }
        return <div className="gjk_img_show">
            <Picture width={width ? width : 220} height={height ? height : 220} source={dataList[selectIndex]} />
            <div className="pictures_warp">
                {selectIndex === 0 ? null : <div className="turn_btn turn_left" onClick={() => { this.turnImg("left"); }}>
                    <i className="iconfont icon-palace-turn-left"></i>
                </div>}
                <div className="img_show_container">
                    <ul style={{ left: `-${30 * 6 * turnPage}px` }}>
                        {
                            dataList.map((element, index) => {
                                return (
                                    <li key={index} className={`tab_item ${selectIndex === index ? "active" : ""}`} onClick={() => {
                                        this.setState({ selectIndex: index });
                                        if (callback) {
                                            callback(index);
                                        }
                                    }}>
                                        <Picture width={25} height={25} source={element} />
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
                {selectIndex >= (dataList.length - 1) ? null : <div className="turn_btn turn_right" onClick={() => { this.turnImg("right"); }}>
                    <i className="iconfont icon-palace-turn-right"></i>
                </div>}
            </div>
        </div>;
    }
    private turnImg(type: string) {
        const count = this.props.dataList.length;
        const pageCount = Math.ceil(count / 6);
        let { turnPage } = this.state;
        if (pageCount <= turnPage) {
            if (type === "left") {
                turnPage--;
            } else {
                turnPage++;
            }
        }

        this.setState({
            turnPage: turnPage,
        });
    }
}
