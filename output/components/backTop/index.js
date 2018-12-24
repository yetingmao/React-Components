"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
if (typeof window !== "undefined") {
    // tslint:disable-next-line:no-var-requires
    require("./style.css");
}
class Top extends React.Component {
    constructor(props, state) {
        super(props);
        this.state = {
            isShow: false,
        };
    }
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }
    handleScroll() {
        const height = document.documentElement.scrollTop;
        const dom = document.getElementById("toTop");
        const scrollHeight = this.props.scrollHeight ? this.props.scrollHeight : 50;
        if (dom) {
            if (height > scrollHeight) {
                dom.style.display = "block";
            }
            else {
                dom.style.display = "none";
            }
        }
    }
    toTop() {
        (function smoothscroll() {
            const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 5));
            }
        })();
    }
    mouseEneter() {
        this.setState({
            isShow: true,
        });
    }
    mouseLeave() {
        this.setState({
            isShow: false,
        });
    }
    render() {
        const shade = React.createElement("div", { className: "topShade" },
            React.createElement("span", null, "\u56DE\u5230"),
            React.createElement("span", null, "\u9876\u90E8"));
        return React.createElement("div", { className: "xflTop", id: "toTop", onClick: () => { this.toTop(); }, onMouseEnter: () => { this.mouseEneter(); }, onMouseLeave: () => { this.mouseLeave(); } },
            React.createElement("div", { className: "topCon" },
                React.createElement("i", { className: "iconfont icon-up" }),
                React.createElement("span", { className: "textTop" }, "TOP")),
            this.state.isShow ? shade : "");
    }
}
exports.Top = Top;
