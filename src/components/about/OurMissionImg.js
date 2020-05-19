import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
	mainFeaturedCard: {
		position: "relative",
		backgroundColor: theme.palette.grey[800],
		color: theme.palette.common.white,
		// marginBottom: theme.spacing(4),
		// backgroundImage: 'url(https://source.unsplash.com/random)',
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
	},
	overlay: {
		position: "absolute",
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		backgroundColor: "rgba(0,0,0,.3)",
	},
	mainFeaturedCardContent: {
		position: "relative",
		height: "400px !important",
		textAlign: "center",
		// padding: theme.spacing(3),
		[theme.breakpoints.up("md")]: {
			padding: theme.spacing(12),
			// paddingRight: 0,
		},
		// display: "flex",
		// alignItems: "center",
		// flexWrap: "wrap",
		// 	justifyContent: center !important;
	},
}));

export default function OurMissionImg(props) {
	const classes = useStyles();
	const { post } = props;

	return (
		<Paper
			className={classes.mainFeaturedCard}
			style={{ backgroundImage: `url(${post.image})` }}>
			{
				<img
					style={{ display: "none" }}
					src={post.image}
					alt={post.imageText}
				/>
			}
			<div className={classes.overlay} />
			<Grid container>
				<Grid item sm={12} md={12}>
					<div className={classes.mainFeaturedCardContent}>
						<Typography
							component="h1"
							variant="h4"
							color="inherit"
							gutterBottom>
							{post.title}
						</Typography>
						<br />
						<Typography component="h1" variant="h5" color="inherit" paragraph>
							{post.description}
						</Typography>
						<Typography component="h1" variant="h5" color="inherit" paragraph>
							{post.description2}
						</Typography>
						<Typography component="h1" variant="h5" color="inherit" paragraph>
							{post.description3}
						</Typography>
					</div>
				</Grid>
			</Grid>
		</Paper>
	);
}

OurMissionImg.propTypes = {
	post: PropTypes.object,
};
