import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {Col,Row} from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
    example: {
        fontSize: "14px  !important",
    }
}));

const ExampleExploreControl = (props) => {
    const classes = useStyles();

    return(
        <Row className={classes.example}>
        <Col lg="6">
            <div>
                {props.exampleText}{" "}
                <a
                    href="javascript:void(0)"
                    onClick={() => {
                        props.setInputValue(props.inputValue);
                    }}
                >
                    {props.inputValue}
                </a>
            </div>
        </Col>
        {props.exploreText && <Col lg="6">
            <div class="text-right">
                Explore{" "}
                <a
                    href={props.exploreUrl}
                    target="_blank"
                >
                    {props.exploreText}
                </a>
            </div>
        </Col>}
    </Row>
    );
}

export default ExampleExploreControl;

ExampleExploreControl.propTypes = {
    inputValue: PropTypes.string,
    exampleText: PropTypes.string,
    exploreText: PropTypes.string,
    exploreUrl: PropTypes.string,
    setInputValue: PropTypes.func
};