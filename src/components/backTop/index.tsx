import * as React from "react";

if (typeof window !== "undefined") {
    // tslint:disable-next-line:no-var-requires
    require("./style.css");
}

export interface IProps {
    scrollHeight?: number;
}
export interface IStates {
    isShow: boolean;
}
export class Top extends React.Component<IProps, IStates> {
    constructor(props: IProps, state: IStates) {
        super(props);
        this.state = {
            isShow: false,
        };
    }
    public componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }
    public componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }
    public handleScroll() {
        const height = document.documentElement.scrollTop;
        const dom = document.getElementById("toTop");
        const scrollHeight = this.props.scrollHeight ? this.props.scrollHeight : 50;
        if (dom) {
            if (height > scrollHeight) {
                dom.style.display = "block";
            } else {
                dom.style.display = "none";
            }
        }
    }
    public toTop() {
        (function smoothscroll() {
            const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 5));
            }
        })();
    }
    public mouseEneter() {
        this.setState({
            isShow: true,
        });
    }
    public mouseLeave() {
        this.setState({
            isShow: false,
        });
    }

    public render() {
        const shade = <div className="topShade">
            <span>回到</span>
            <span>顶部</span>
        </div>;
        return <div className="xflTop" id="toTop" onClick={() => { this.toTop(); }}
            onMouseEnter={() => { this.mouseEneter(); }} onMouseLeave={() => { this.mouseLeave(); }}>
            <div className="topCon">
                <i className="iconfont icon-up"></i>
                <span className="textTop">TOP</span>
            </div>
            {this.state.isShow ? shade : ""}
        </div>;
    }
}
