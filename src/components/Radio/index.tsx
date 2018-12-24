import * as React from "react";
import PropTypes from "prop-types";
if (typeof window !== "undefined") {
    require("./style.css");  // tslint:disable-line:no-var-requires
}

export interface IProps {
    value: string;
    disabled?: boolean;
    name: string;
    selectedValue: string;
    onChange: (str: string) => void;
}
export interface IStates {

}
export default class Radio extends React.Component<IProps, IStates> {
    constructor(props: IProps, context) {
        super(props);
    }
    public render() {
        const { children, value, disabled, name, selectedValue, onChange } = this.props;
        const checked = value === selectedValue ? true : false;
        return <label className={`gjk_radio_wraper ${disabled ? "disabled" : ((checked ? true : false) ? "checked" : "")}`} >
            <input type="radio" className="gjk_radio_input" name={name}
                value={value} disabled={disabled} checked={checked}
                onChange={() => { onChange(value); }} />
            <span className="gjk_radio_inner"></span>{children}
        </label>;
    }
}
