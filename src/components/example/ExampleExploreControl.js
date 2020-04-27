import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {Col,Row} from "react-bootstrap";
import LineTooltip from '../tooltip/LineTooltip';
import Button from 'react-bootstrap/Button'

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
        {props.inputValue.sort(sortExamples).map((obj) => (<Row key={obj.example.id} className={classes.example}>
        <Col>
            <div>
                {obj.example.name}{" "}
                <LineTooltip text="Click to insert example.">
                    <Button className={"lnk-btn"} variant="link"
                        onClick={() => {
                            props.setInputValue(obj.example.id);
                        }}
                    >
                        {obj.example.id}
                    </Button>
                </LineTooltip>
            </div>
        </Col>
        {obj.explore && <Col>
            <div className="text-right">
                Explore{" "}
                <a
                    href={obj.explore.url}
                    target="_blank"
                    rel="noopener noreferrer"
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
    inputValue: PropTypes.array,
    setInputValue: PropTypes.func
};