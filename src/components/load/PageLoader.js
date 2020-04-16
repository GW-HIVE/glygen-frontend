import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Backdrop from "@material-ui/core/Backdrop";
import LoadingImage from "../../images/page_loading.gif";

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)"
  },
  image: {
    width: 75,
    height: 75
  }
}));

export default function PageLoader(props) {
  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open={props.pageLoading}>
        <img src={LoadingImage} alt="loadingImage" className={classes.image} />
      </Backdrop>
    </div>
  );
}

PageLoader.propTypes = {
	pageLoading: PropTypes.bool,
};