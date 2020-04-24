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
    function sortExamples(ex1, ex2) {
        return parseInt(ex1.orderID) - parseInt(ex2.orderID);
	}

    return(
        <>
        {props.inputValue.sort(sortExamples).map((obj) => (<Row className={classes.example}>
        <Col>
            <div>
                {obj.example.name}{" "}
                <a
                    href="javascript:void(0)"
                    onClick={() => {
                        props.setInputValue(obj.example.id);
                    }}
                >
                    {obj.example.id}
                </a>
            </div>
        </Col>
        {obj.explore && <Col>
            <div class="text-right">
                Explore{" "}
                <a
                    href={obj.explore.url}
                    target="_blank"
                >
                    {obj.explore.id}
                </a>
            </div>
        </Col>}
    </Row>))}
    </>
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