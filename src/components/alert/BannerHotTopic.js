import React from "react";
// import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";
// import SnackbarContent from "@material-ui/core/SnackbarContent";
// import AlertTitle from "@material-ui/lab/AlertTitle";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		"& > * + *": {
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(2),
		},
	},
	// linkText: {
	// 	color: "#ffffff !important",
	// 	fontWeight: "600 !important",
	// 	"&:hover": {
	// 		color: "#fff !important",
	// 	},
	// },
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
// const action = (
// 	<Button
// 		color="secondary"
// 		size="small"
// 		href="https://wiki.glygen.org/index.php/Main_Page"
// 		target="_blank"
// 		rel="noopener noreferrer">
// 		Read more...
// 	</Button>
// );

export default function BunnerHotTopic() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Alert severity="error" classes={{ message: "alert-banner-message" }}>
				<h4>Alert Title</h4>
				This is a message of type red!
				{link}
			</Alert>
			<Alert severity="warning" classes={{ message: "alert-banner-message" }}>
				<h4>Alert Title</h4>
				This is a message of type yellow!
				{link}
			</Alert>
			<Alert severity="info" classes={{ message: "alert-banner-message" }}>
				<h4>Alert Title</h4>
				This is a message of type blue!
				{link}
			</Alert>
			<Alert severity="success" classes={{ message: "alert-banner-message" }}>
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
			{/* <SnackbarContent
				message={
					"This is a SnackbarContent message banner. I CAN NOT add title to it. I can add message only. \
          This banner also have a red button as a link. By default this button aligned right. This is just an example. \
          I do not think we should use it here, but might use it somewhere else. Tatiana."
				}
				action={action}
			/> */}
		</div>
	);
}
