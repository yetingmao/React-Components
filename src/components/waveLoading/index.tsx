import * as React from "react";
if (typeof window !== "undefined") {
    require("./style.css");// tslint:disable-line:no-var-requires 
}

export interface IProps {// tslint:disable-line:interface-name
    progress: number;
    bgColor?: string;
    waveColor?: string;
    color?: string;
}

export interface IStates {// tslint:disable-line:interface-name
}
export class WaveLoading extends React.Component<IProps, IStates> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            box: "",
        };
    }
    public componentDidMount() {
        const canvas = this.refs.loading as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");
        //range控件信息
        let nowRange = 0;   //用于做一个临时的range
        //画布属性
        const mW = canvas.width;
        const mH = canvas.height;
        const lineWidth = 2;
        //圆属性
        const r = mH / 2; //圆心
        const cR = r - 10 * lineWidth; //圆半径

        //Sin 曲线属性
        const sX = 0;
        const sY = mH / 2;
        const axisLength = mW; //轴长
        const waveWidth = 0.015;   //波浪宽度,数越小越宽
        const waveHeight = 6; //波浪高度,数越大越高
        const speed = 0.09; //波浪速度，数越大速度越快
        let xOffset = 0; //波浪x偏移量
        if (!ctx) {
            return;
        }
        ctx.lineWidth = lineWidth;

        //画圈函数
        const isdrawCircled = false;
        const drawCircle = () => {

            ctx.beginPath();
            ctx.strokeStyle = "#1080d0";
            ctx.arc(r, r, cR + 5, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(r, r, cR, 0, 2 * Math.PI);
            ctx.clip();

        };

        //画sin 曲线函数
        const drawSin = (xOffsetSin: any) => {
            ctx.save();

            const points = [];  //用于存放绘制Sin曲线的点

            ctx.beginPath();
            //在整个轴长上取点
            for (let x = sX; x < sX + axisLength; x += 20 / axisLength) {
                //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
                const y = -Math.sin((sX + x) * waveWidth + xOffsetSin);

                const dY = mH * (1 - nowRange / 100);

                points.push([x, dY + y * waveHeight]);
                ctx.lineTo(x, dY + y * waveHeight);
            }
            //封闭路径
            ctx.lineTo(axisLength, mH);
            ctx.lineTo(sX, mH);
            ctx.lineTo(points[0][0], points[0][1]);
            ctx.fillStyle = this.props.waveColor || "#333";// tslint:disable-line:strict-boolean-expressions
            ctx.fill();

            ctx.restore();
        };

        //写百分比文本函数
        const drawText = () => {
            ctx.save();
            const size = 0.4 * cR;
            ctx.font = "bold " + size + "px Microsoft Yahei";
            ctx.textAlign = "center";
            ctx.fillStyle = this.props.color || "#fff";// tslint:disable-line:strict-boolean-expressions
            ctx.fillText(~~nowRange + "%", mW / 2, r + size / 2);// tslint:disable-line:no-bitwise

            ctx.restore();
        };

        const render = () => {
            ctx.clearRect(0, 0, mW, mH);
            if (!isdrawCircled) {
                //drawCircle();
            }
            if (nowRange <= this.props.progress) {
                const tmp = 1;
                nowRange += tmp;
            }
            if (nowRange > this.props.progress) {
                const tmp = 1;
                nowRange -= tmp;
            }
            drawSin(xOffset);
            drawText();

            xOffset += speed;
            requestAnimationFrame(render);
        };

        render();

    }
    public componentWillReceiveProps() {
        const dom = this.refs.box as HTMLElement;
        if (this.props.progress >= 100) {
            dom.style.display = "none";
        } else {
            dom.style.display = "block";
        }
    }
    public render() {
        return <div className="wave_box" ref="box" style={{ background: this.props.bgColor }}>
            <canvas className="wave_loading" ref="loading">当前浏览器不支持canvas 请升级！</canvas>
        </div>;
    }
}
