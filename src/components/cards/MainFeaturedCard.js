import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link, NavLink } from "react-router-dom";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import PersonPinCircleOutlinedIcon from "@material-ui/icons/PersonPinCircleOutlined";
import quoteIcon from "../../images/icons/quote-open-outline-white.svg";
import routeConstants from "../../data/json/routeConstants.json";

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
		// height: "400px !important",
		textAlign: "center",
		padding: theme.spacing(3),
		[theme.breakpoints.up("md")]: {
			padding: theme.spacing(8),
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
			<Grid container className="gg-align-center">
				<Grid item sm={12} lg={8}>
					<div className={classes.mainFeaturedCardContent}>
						<Typography
							component="h5"
							variant="h6"
							color="inherit"
							gutterBottom>
							{post.title}
						</Typography>
						<Typography component="h6" color="inherit" paragraph>
							{post.description}
						</Typography>
						{/* <Typography paragraph style={{ marginBottom: "40px" }}>
							<Link as={NavLink} to={post.toAbout} className={classes.linkText}>
								{post.linkText}
							</Link>
						</Typography> */}
						<Typography paragraph style={{ marginTop: "60px" }}>
							<Link
								as={NavLink}
								to={routeConstants.howToCite}
								className="gg-btn-outline-white">
								<span>
									<img
										component="img"
										style={{ paddingRight: "15px", marginTop: "-5px" }}
										src={quoteIcon}
										alt="quote icon"
									/>
								</span>
								How To Cite
							</Link>
							<Link
								as={NavLink}
								to={routeConstants.tryMe}
								className="gg-btn-outline-white">
								<span>
									<HourglassEmptyIcon
										style={{ paddingRight: "10px", marginTop: "-5px" }}
									/>
								</span>
								Quick Start
							</Link>
							<Link
								as={NavLink}
								to={routeConstants.about}
								className="gg-btn-outline-white">
								<span>
									<PersonPinCircleOutlinedIcon
										style={{ paddingRight: "10px", marginTop: "-5px" }}
									/>
								</span>
								Our Mission
							</Link>
						</Typography>
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
