import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { getDateMMDDYYYY } from "../../utils/common";
import { Link } from "@material-ui/core";
import CardLoader from "../load/CardLoader";
import { Row, Col } from 'react-bootstrap';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import Button from "react-bootstrap/Button";
import {sortDropdown} from '../../utils/common';
import "../../css/Search.css";

const useStyles = makeStyles((theme) => ({
	cardTitle: {
		textAlign: "center",
    },
    body: {
        fontSize: "inherit",
      }
}));


export default function GlobalSearchCard(props) {
	const classes = useStyles();

	return (
        <div className={"global-search-card"}>
			<Card className={"card"}>
                <Table style={{margin:"0px", padding:"0px"}}>
                    <TableHead>
                        <TableRow hover className="card-head" align="center" spacing={2}>
                            <TableCell align="center" colSpan={2}>
                                <h4 className={classes.cardTitle}>
                                    <Button
                                        className={"lnk-btn"}
                                        variant="link"
                                        disabled={Number(props.allCount) === 0}
                                        onClick={() => {
                                            props.setInputValue(props.allListId);
                                        }}>
                                        <strong>{props.allCount}{' '}{props.cardTitle}</strong>
                                    </Button>
                                </h4>
                                <h5><strong>{'match for'}{' '}{props.term}</strong></h5>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.searchItems.sort(sortDropdown).map( items => 
                        (items.name !== "all" && <TableRow hover className="card-row">
                                <TableCell align='left' classes={{body: classes.body}}>
                                <Button
                                    className={"lnk-btn"}
                                    variant="link"
                                    disabled={Number(items.count) === 0}
                                    onClick={() => {
                                        props.setInputValue(items.list_id);
                                    }}>
                                    {"in " + items.name[0].toUpperCase() + items.name.slice(1)} 
                                </Button>
                            </TableCell>
                            <TableCell align='right' classes={{body: classes.body}}>
                                <Button
                                    className={"lnk-btn"}
                                    variant="link"
                                    disabled={Number(items.count) === 0}
                                    onClick={() => {
                                        props.setInputValue(items.list_id);
                                    }}>
                                    {items.count} 
                                </Button>
                            </TableCell>
                        </TableRow>))}
                    </TableBody>
                </Table>
			</Card>
		</div>
	);
}

GlobalSearchCard.propTypes = {
	data: PropTypes.object,
};
