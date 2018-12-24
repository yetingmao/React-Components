import * as React from "react";
if (typeof window !== "undefined") {
    require("./style.css");  // tslint:disable-line:no-var-requires
}

let supportWebp = false;
try {
    supportWebp = (document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp") === 0) ? true : false;
} catch (e) {
    supportWebp = false;
}
export interface IProps {
    width?: number;//容器宽度
    height?: number;//容器高度
    source?: string;
    defaultImage?: string;
    onClick?: (e?: React.MouseEvent<HTMLImageElement>) => void;
    type?: "normal" | "contain" | "cover";   // default   normal
}
export interface IState {
    defaultImage: string;
}
export default class extends React.Component<IProps, IState> {
    constructor(props: IProps, state: IState) {
        super(props);
        this.state = {
            defaultImage: typeof this.props.defaultImage === "string" ? this.props.defaultImage : "../../static/img/placeholder.png",
        };
    }
    public render() {
        const { width, height, source = "", defaultImage, type = "normal" } = this.props;

        let images = source;
        if (typeof source === "string" && source !== "") {
            images = `${source}?x-oss-process=`;
            if (typeof width === "number") {
                images += `image/resize,m_fill,h_${height},w_${width},`;
            }
            if (supportWebp) {
                images += "image/format,webp/quality,Q_80";
            } else {
                images += "image/format,jpg/quality,Q_80";
            }
        } else {
            images = this.state.defaultImage;
        }

        let className = "";
        if (type === "normal") {
            className = "component-image-normal";
        } else if (type === "contain") {
            className = "component-image-contain";
        } else if (type === "cover") {
            className = "component-image-cover";
        }

        return <div className={`component-image ${className}`}
            style={{ backgroundImage: `url(${images})`, width: `${width ? `${width}px` : "auto"}`, height: `${height ? `${height}px` : "auto"}` }}>
            {this.props.children}
        </div>;
    }
}
