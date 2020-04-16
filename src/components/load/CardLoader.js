import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import LoadingImage from "../../images/page_loading.gif";
import Fade from "@material-ui/core/Fade";
import { Row } from "react-bootstrap";

const useStyles = makeStyles(theme => ({
  image: {
    height: 75,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateY(-50%) translateX(-50%)",
  },
  row: {
    justifyContent: "center"
  },
  overlay: {
    zIndex: theme.zIndex.drawer + 1,
    height: "100%",
    width: "100%",
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  }
}));

export default function CardLoader(props) {
  const classes = useStyles();

  return (
    <Fade in={props.pageLoading}>
      <div className={classes.overlay}>
        <Row className={classes.row}>
          <img
            src={LoadingImage}
            alt="loadingImage"
            className={classes.image}
          />
        </Row>
      </div>
    </Fade>
  );
}

CardLoader.propTypes = {
  pageLoading: PropTypes.bool
};
