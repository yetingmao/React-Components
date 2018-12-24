import * as React from "react";
if (typeof window !== "undefined") {
    // tslint:disable-next-line:no-var-requires
    require("./style.css");
}

export interface IProps {
    tabList: { tabName: string; disabled?: boolean; active?: boolean; }[];
    selectCallback: (i: number) => void;
}
export interface IStates {
    selectTab: string;
}
export default class InfoTab extends React.Component<IProps, IStates> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            selectTab: "",
        };
    }
    public render() {
        const { tabList, selectCallback } = this.props;
        const { selectTab } = this.state;
        return <ul className="infoTab">
            {tabList.map((item, i) => {
                return <li key={i} className={`itemTab ${item.disabled ? "disabled" : (item.active ? "active" : "")}`} onClick={() => {
                    if (item.disabled) {
                        return;
                    }
                    selectCallback(i);
                }}>{item.tabName}</li>;
            })}
        </ul>;
    }
}
