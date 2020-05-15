import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		"& > * + *": {
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(2),
		},
	},
}));

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const link = (
	<Link
		href="https://wiki.glygen.org/index.php/Main_Page"
		target="_blank"
		rel="noopener noreferrer">
		{" "}
		Read more...
	</Link>
);

export default function BunnerHotTopic() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Alert
				severity="error"
				classes={{
					message: "alert-banner-message",
					icon: "alert-banner-icon gg-align-middle",
				}}>
				<h4>Alert Title</h4>
				This is a message of type red!
				{link}
			</Alert>
			<Alert
				severity="warning"
				classes={{
					message: "alert-banner-message",
					icon: "alert-banner-icon gg-align-middle",
				}}>
				<h4>Alert Title</h4>
				This is a message of type yellow!
				{link}
			</Alert>
			<Alert
				severity="info"
				classes={{
					message: "alert-banner-message",
					icon: "alert-banner-icon gg-align-middle",
				}}>
				<h4>Alert Title</h4>
				This is a message of type blue!
				{link}
			</Alert>
			<Alert
				severity="success"
				classes={{
					message: "alert-banner-message",
					icon: "alert-banner-icon gg-align-middle",
				}}>
				<h4>Alert Title</h4>
				This is a message of type green!
				{link}
			</Alert>
			<Alert
				icon={false}
				className="alert-banner-darkgrey"
				classes={{ message: "alert-banner-message" }}>
				<h4>Alert Title</h4>
				This is a message of type darkgrey!
				{link}
			</Alert>
		</div>
	);
}
