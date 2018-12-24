import * as React from "react";
import * as ReactDOM from "react-dom";
import { Img } from "../img";

if (typeof window !== "undefined") {
    // tslint:disable-next-line:no-var-requires
    require("./style.css");
}
export interface IProps {
    width: number;//容器宽度
    height: number;//容器高度
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
export class AutoImg extends React.Component<IProps, IState> {
    constructor(props: IProps, state: IState) {
        super(props);
    }
    public componentDidMount() {
        this.getNaturalSize();
    }
    public getNaturalSize() {
        if (this.props.source) {
            const image = new Image();
            image.src = this.props.source;
            image.onload = () => {
                this.setState({
                    imgWidth: image.width,
                    imgHeight: image.height,
                });
            };
        }
    }

    public render() {
        const { width, height, source, lazyload, defaultImage, className } = this.props;
        const { imgWidth, imgHeight } = this.state;
        let img = <div></div>;
        if (source) {
            if (imgWidth / imgHeight > width / height) {

                img = <Img height={height} source={source} lazyload={lazyload ? true : false} defaultImage={defaultImage ? defaultImage : ""} />;
            } else {
                img = <Img width={width} source={source} lazyload={lazyload ? true : false} defaultImage={defaultImage ? defaultImage : ""} />;
            }
        }
        return <div className={`autoImg ${className ? className : ""}`} style={{ width: width + "px", height: height + "px" }}>
            {img}
        </div>;
    }
}
