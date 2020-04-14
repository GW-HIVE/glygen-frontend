import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Backdrop from "@material-ui/core/Backdrop";
import LoadingImage from "../images/page_loading.gif";

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  },
  image: {
    width: 75,
    height: 75
  }
}));

export default function PageLoading(props) {
  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open={props.pageLoading}>
        <img src={LoadingImage} alt="loadingImage" className={classes.image} />
      </Backdrop>
    </div>
  );
}

PageLoading.propTypes = {
	pageLoading: PropTypes.bool,
};