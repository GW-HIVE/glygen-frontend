import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link, NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	mainFeaturedCard: {
		position: "relative",
		backgroundColor: theme.palette.grey[800],
		color: theme.palette.common.white,
		marginBottom: theme.spacing(4),
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
		padding: theme.spacing(3),
		[theme.breakpoints.up("md")]: {
			padding: theme.spacing(6),
			paddingRight: 0,
		},
	},
	linkText: {
		color: "#ffffff !important",
		fontWeight: "600",
		"&:hover": {
			color: "#57affa",
		},
	},
}));
export default function MainFeaturedCard(props) {
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
				<Grid item sm={12} lg={6}>
					<div className={classes.mainFeaturedCardContent}>
						<Typography
							component="h1"
							variant="h4"
							color="inherit"
							gutterBottom>
							{post.title}
						</Typography>
						<Typography variant="p" color="inherit" paragraph>
							{post.description}
						</Typography>
						<Typography paragraph style={{ marginBottom: "40px" }}>
							<Link as={NavLink} to={post.toAbout} className={classes.linkText}>
								{post.linkText}
							</Link>
						</Typography>
						{/* <Typography paragraph style={{ marginTop: "40px" }}>
							<Link
								as={NavLink}
								to={post.toCite}
								className="gg-btn-outline-white">
								{post.linkCiteText}
							</Link>
							<Link
								as={NavLink}
								to={post.toTryMe}
								className="gg-btn-outline-white">
								{post.linkTryMeText}
							</Link>
							<Link
								as={NavLink}
								to={post.toAbout}
								className="gg-btn-outline-white">
								{post.linkText}
							</Link>
						</Typography> */}
						<Grid item></Grid>
					</div>
				</Grid>
			</Grid>
		</Paper>
	);
}

MainFeaturedCard.propTypes = {
	post: PropTypes.object,
};
