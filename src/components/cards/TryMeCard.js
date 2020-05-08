import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ListGroup from "react-bootstrap/ListGroup";
// import { Container } from 'react-bootstrap';
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
	cardAction: {
		display: "inline-flex",
	},
	card: {
		// display: 'flex'
		// maxWidth: 345
	},
	cardTitle: {
		textAlign: "center",
	},
	cardDetails: {
		flex: 1,
	},
	selected: {
		color: "#2F78B7",
	},
}));

export default function TryMeCard(props) {
	const classes = useStyles();
	function alertClicked() {
		alert("You clicked the ListGroupItem");
	}

	return (
		<div id={props.id}>
			{/* <Container fluid='md'> */}
			<Container
				maxWidth="lg"
				style={{ paddingTop: "35px", paddingBottom: "30px" }}>
				<Grid container spacing={4}>
					<Grid item xs={12} sm={12} md={12} lg={12}>
						<Card className="card">
							<div className={classes.cardDetails}>
								<CardContent>
									<Typography
										gutterBottom
										variant="h5"
										component="h2"
										className={classes.cardTitle}>
										Try Me
									</Typography>
									<ListGroup as="hp">
										<ListGroup.Item action onClick={alertClicked} href="#">
											What are the enzymes involved in the biosynthesis of{" "}
											<span className={classes.selected}>
												{" "}
												Man5-(G55220VL){" "}
											</span>{" "}
											in human?
										</ListGroup.Item>
										<ListGroup.Item action onClick={alertClicked}>
											Which proteins have been shown to bear{" "}
											<span className={classes.selected}>
												{" "}
												a bi-antennary fully sialylated N-Glycan-(G77252PU){" "}
											</span>{" "}
											and which site is this glycan attached to?
										</ListGroup.Item>
										<ListGroup.Item action onClick={alertClicked}>
											Which glycans might have been synthesized in mouse using{" "}
											<span className={classes.selected}> Mgat1 </span>?
										</ListGroup.Item>
									</ListGroup>
								</CardContent>
							</div>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

TryMeCard.propTypes = {
	post: PropTypes.object,
};
