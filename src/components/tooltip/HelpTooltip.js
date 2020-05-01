import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import HelpOutline from '@material-ui/icons/HelpOutline';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const HelpTooltip = (props) => {
    return(
    <Tooltip
        disableTouchListener
        interactive
        arrow
        placement={props.placement ? props.placement : 'bottom-start'}
        classes={{
            tooltip : "gg-tooltip"
        }}
        title={
            <React.Fragment>
                <Typography color="inherit"><strong>{props.title + ":"}</strong></Typography>
                {props.text}{" "}
                <a
                    href= {props.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {props.urlText}
                </a>
            </React.Fragment>
        }
    >
        {props.children ? props.children : <HelpOutline className= {props.helpIcon ? props.helpIcon : "gg-helpicon"}/>}
    </Tooltip>
    );
}

export default HelpTooltip;

HelpTooltip.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    urlText: PropTypes.string,
    url: PropTypes.string,
    helpIcon: PropTypes.string
};
