import * as React from "react";
if (typeof window !== "undefined") {
    require("./style.css");// tslint:disable-line:no-var-requires 
}

export interface IProps {
    tagName?: string;
    isEdit?: boolean;
    deleteClick?: () => void;
    changeTagName?: (name?: string) => void;
}
export interface IState {
    edit: boolean;
    tagValue: string;
}

export class Tag extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            edit: false,
            tagValue: props.tagName ? props.tagName : "",
        };
    }
    public render() {
        const { tagName, isEdit, deleteClick, changeTagName } = this.props;
        const { edit, tagValue } = this.state;
        return <div className={`gjk_tag ${edit ? "gjk_tag_edit" : ""}`}>
            <span className="tag_name">{tagName}</span>
            {isEdit ? <i className="iconfont icon-palace-edit" onClick={() => { this.setState({ edit: true }); }}></i> : null}
            {edit ? <div className="edit_input">
                <input autoFocus type="text" value={tagValue} onChange={(e) => {
                    const value = e.currentTarget.value; this.setState({ tagValue: value });
                }} onBlur={(e) => {
                    const value = e.currentTarget.value;
                    this.setState({ edit: false, tagValue: value });
                    if (changeTagName) { changeTagName(value); }
                }} />
            </div> : null}
            <i className="iconfont icon-palace-tag-delete" onClick={() => { if (deleteClick) { deleteClick(); } }}></i>
        </div >;
    }
}
