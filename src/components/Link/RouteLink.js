import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LineTooltip from "../tooltip/LineTooltip";
import "../../css/Search.css";

export default function RouteLink(props) {

	return (
        <>
           {props.disabled ? 
            <span className={"route-lnk-disabled"}>
                {props.text}
            </span> :
            <LineTooltip text="Click to see list page."> 
                <Link to={props.link}>
                        {props.text}
                </Link>
            </LineTooltip>}
  		</>
	);
}

RouteLink.propTypes = {
    text: PropTypes.string,
    link: PropTypes.string,
    disabled: PropTypes.bool,
};