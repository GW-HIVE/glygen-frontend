import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";
import LineTooltip from '../tooltip/LineTooltip';
import Button from 'react-bootstrap/Button'

const useStyles = makeStyles((theme) => ({
    example: {
        paddingLeft: '15px !important',
        fontSize: '14px  !important',
	}
}));

const ExampleControl = (props) => {
    const classes = useStyles();
    let firstEx = true;

    return(
        <Row>
            <div className={classes.example}>
                Example(s):{' '}
                {props.exampleMap &&
                    props.exampleMap[props.type].examples.map(
                        (key) => (
                            <LineTooltip key={key} text="Click to insert example.">
                                <Button className={"lnk-btn"} variant="link"
                                    onClick={() => {
                                        props.setInputValue(key);
                                    }}
                                >
                                    {firstEx ? (firstEx = false, key) : ', ' + key}
                                </Button>
                             </LineTooltip>
                        )
                    )
                    }
            </div>
        </Row>
    );
}

export default ExampleControl;

ExampleControl.propTypes = {
    exampleMap: PropTypes.object,
    type: PropTypes.string,
    setInputValue: PropTypes.func
};