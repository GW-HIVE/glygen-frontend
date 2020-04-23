import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
	example: {
        paddingLeft: '15px !important',
        fontSize: '14px',
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
                            <a
                                href='javascript:void(0)'
                                onClick={() => {
                                    props.setInputValue(key);
                                }}
                            >
                                {firstEx ? (firstEx = false, key) : ', ' + key}
                            </a>
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