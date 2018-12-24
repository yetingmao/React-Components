import * as React from "react";

if (typeof window !== "undefined") {
    require("./style.css");// tslint:disable-line:no-var-requires
}

export interface IProps {
    titleName: string;
    required?: boolean;
    width?: number;
}

export interface IStates {

}
export class Selection extends React.Component<IProps, IStates> {
    constructor(props: IProps) {
        super(props);
    }
    public render() {
        const { titleName, required, children, width } = this.props;
        return <div className="selection_filter_item">
            <div className="titleName" style={{ width: width ? `${width}px` : "" }}>
                <div className="selection_name">{titleName}</div>
                <span className={`required_default ${required ? "required" : ""}`}>*</span>
            </div>
            {children}
        </div >;
    }
}
