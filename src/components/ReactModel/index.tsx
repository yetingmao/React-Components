import React, { Component } from "react";
import { Model } from "../Model";
if (typeof window !== "undefined") {
    require("./style.css");  // tslint:disable-line:no-var-requires
}

export interface IProps {
    dataClass: string;
    isModelShow?: boolean;
    headTitle?: string;
    contentDom: JSX.Element;
    size?: string;
    cancel?: () => void;
    confirm?: () => void;
}
export interface IState {
    isModelShow: boolean;
}
export default class ReactModel extends React.Component<IProps, IState> {
    constructor(props: IProps, state: IState) {
        super(props);
        this.state = {
            isModelShow: typeof props.isModelShow === "boolean" ? props.isModelShow : false,
        };
    }
    public componentWillReceiveProps(props: IProps) {
        this.setState({
            isModelShow: typeof props.isModelShow === "boolean" ? props.isModelShow : false,
        });
    }
    public render() {
        let size = "dialog-container-small";
        if (this.props.size === "middle") {
            size = "dialog-container-middle";
        }
        if (this.props.size === "big") {
            size = "dialog-container-big";
        }
        const { headTitle, cancel, confirm, dataClass, contentDom } = this.props;
        const { isModelShow } = this.state;
        return <div className="reactModel">
            <Model dataClass={dataClass} show={isModelShow}>
                <div className="model-overlay" onClick={() => {
                    this.setState({
                        isModelShow: false,
                    });
                    if (cancel) {
                        cancel();
                    }
                }}></div>
                <div className={`dialog-container ${size}`}>
                    <div className="dialog">
                        <div className="dialog-title">
                            <h4>{headTitle}</h4>
                            <span className="close_icon" onClick={() => {
                                this.setState({
                                    isModelShow: false,
                                });
                                if (cancel) {
                                    cancel();
                                }
                            }}><i className="iconfont icon-close-a"></i></span>
                        </div>
                        <div className="dialog-content">
                            {contentDom}
                        </div>
                        <div className="dialog-action">
                            <button type="button" className="btn btn-info" onClick={() => {
                                this.setState({
                                    isModelShow: false,
                                });
                                if (confirm) {
                                    confirm();
                                }
                            }}>确定</button>
                            <button type="button" className="btn" onClick={() => {
                                this.setState({
                                    isModelShow: false,
                                });
                                if (cancel) {
                                    cancel();
                                }
                            }}>取消</button>
                        </div>
                    </div>
                </div>
            </Model>
        </div>;
    }
}
