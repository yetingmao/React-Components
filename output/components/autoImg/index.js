"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const img_1 = require("../img");
if (typeof window !== "undefined") {
    // tslint:disable-next-line:no-var-requires
    require("./style.css");
}
class AutoImg extends React.Component {
    constructor(props, state) {
        super(props);
    }
    componentDidMount() {
        this.getNaturalSize();
    }
    getNaturalSize() {
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
    render() {
        const { width, height, source, lazyload, defaultImage, className } = this.props;
        const { imgWidth, imgHeight } = this.state;
        let img = React.createElement("div", null);
        if (source) {
            if (imgWidth / imgHeight > width / height) {
                img = React.createElement(img_1.Img, { height: height, source: source, lazyload: lazyload ? true : false, defaultImage: defaultImage ? defaultImage : "" });
            }
            else {
                img = React.createElement(img_1.Img, { width: width, source: source, lazyload: lazyload ? true : false, defaultImage: defaultImage ? defaultImage : "" });
            }
        }
        return React.createElement("div", { className: `autoImg ${className ? className : ""}`, style: { width: width + "px", height: height + "px" } }, img);
    }
}
exports.AutoImg = AutoImg;
