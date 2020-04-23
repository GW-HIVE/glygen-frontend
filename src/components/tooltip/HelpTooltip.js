import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutline from "@material-ui/icons/HelpOutline";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    tooltip: {
        backgroundColor: "#f5f5f9",
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: 12,
        border: "1px solid #dadde9",
    },
    helpicon: {
        fontSize: "18px",
        marginRight: 8,
        paddingBottom: "2px",
    }
}));

const HelpTooltip = (props) => {
    const classes = useStyles();

    return(
    <Tooltip
        disableTouchListener
        interactive
        classes={{
            tooltip : classes.tooltip
        }}
        title={
            <React.Fragment>
                <Typography color="inherit">{props.title + ":"}</Typography>
                    {props.text}{" "}
                    <a
                        href= {props.url}
                        target="_blank"
                    >
                        {props.urlText}
                </a>
            </React.Fragment>
        }
    >
        <HelpOutline className={classes.helpicon} />
    </Tooltip>
    );
}

export default HelpTooltip;

HelpTooltip.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    urlText: PropTypes.string,
    url: PropTypes.string,
};