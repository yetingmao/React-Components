if (typeof window !== "undefined") {
    require("./style.css");  // tslint:disable-line:no-var-requires
}
import * as React from "react";

let supportWebp = false;
const staticImg = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533115600722&di=51ed4163a0be2132b1ca3260817476b7&imgtype=0&"
    + "src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F32fa828ba61ea8d35e5c44059d0a304e251f58b0.jpg";
try {
    supportWebp = (document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp") === 0) ? true : false;
} catch (e) {
    supportWebp = false;
}
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
export class Img extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        let lazyload;
        if (typeof this.props.lazyload === "boolean") {
            lazyload = this.props.lazyload;
        } else {
            lazyload = true;
        }
        this.state = {
            defaultImage: this.props.defaultImage || staticImg,
            lazyload: lazyload,
        };
    }
    public render() {
        let src: string;
        let _src = null;
        let image = "";
        if (this.props.source) {
            image = this.props.source + "?x-oss-process=";
            if (this.props.width) {
                image += `image/resize,w_${this.props.width},`;
            }
            if (supportWebp) {
                image += "image/format,webp/quality,Q_80";
            } else {
                image += "image/format,jpg/quality,Q_80";
            }
        } else {
            image = this.state.defaultImage;
        }
        if (this.state.lazyload) {
            src = this.state.defaultImage;
            _src = image;
        } else {
            src = image;
        }
        return <img src={src} data-src={_src} alt=""
            style={{ width: this.props.width ? this.props.width + "px" : "auto", height: this.props.height ? this.props.height + "px" : "auto" }}
            onClick={(e) => {
                if (this.props.onClick) {
                    this.props.onClick(e);
                }
            }} />;
    }
}
