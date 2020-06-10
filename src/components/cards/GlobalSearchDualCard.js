import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import Button from "react-bootstrap/Button";
import {sortDropdown} from '../../utils/common';
import "../../css/Search.css";

export default function GlobalSearchDualCard(props) {

	return (
        <div className={"global-search-card"}>
			<Card className={"card"}>
                <Table style={{margin:"0px", padding:"0px"}}>
                    <TableHead>
                        <TableRow hover className="card-row">
                            <TableCell align="center" colSpan={3}>
                                <h4>
                                    <Button
                                        className={"lnk-btn"}
                                        variant="link"
                                        disabled={Number(props.allCount1) === 0}
                                        onClick={() => {
                                            props.setInputValue(props.allListId1);
                                        }}>
                                        <strong>{props.allCount1}{' '}{props.cardTitle1}</strong>
                                    </Button>
                                    <span><strong> / </strong></span>
                                    <Button
                                        className={"lnk-btn"}
                                        variant="link"
                                        disabled={Number(props.allCount2) === 0}
                                        onClick={() => {
                                            props.setInputValue(props.allListId2);
                                        }}>
                                        <strong>{props.allCount2}{' '}{props.cardTitle2}</strong>
                                    </Button>
                                </h4>
                                <h5><strong>{'match for'}{' '}{props.term}</strong></h5>
                            </TableCell>
                        </TableRow>
                        <TableRow hover className="card-row">
                            <TableCell classes={{head: "gs-cell"}}>
                            <span><strong>{props.colHeading1}</strong></span>
                            </TableCell>
                            <TableCell className={"gs-cell-center"} classes={{head: "gs-cell"}}>
                            <span><strong>{props.colHeading2}</strong></span>
                            </TableCell>
                            <TableCell  className={"gs-cell-center"} classes={{head: "gs-cell"}}>
                            <span><strong>{props.colHeading3}</strong></span>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.searchItems.sort(sortDropdown).map( items => 
                        (items.name !== "all" && <TableRow key={items.name} hover className="card-row">
                                <TableCell className={"gs-cell-left"} classes={{body: "gs-cell"}}>
                                    <span>{items.name[0].toUpperCase() + items.name.slice(1)}</span> 
                                </TableCell>
                            <TableCell className={"gs-cell-center"} classes={{body: "gs-cell"}}>
                                <Button
                                    className={"lnk-btn"}
                                    variant="link"
                                    disabled={Number(items.count1) === 0}
                                    onClick={() => {
                                        props.setInputValue(items.list_id1);
                                    }}>
                                    {items.count1} 
                                </Button>
                            </TableCell>
                            <TableCell className={"gs-cell-center"} classes={{body: "gs-cell"}}>
                                <Button
                                    className={"lnk-btn"}
                                    variant="link"
                                    disabled={Number(items.count2) === 0}
                                    onClick={() => {
                                        props.setInputValue(items.list_id2);
                                    }}>
                                    {items.count2} 
                                </Button>
                            </TableCell>
                        </TableRow>))}
                    </TableBody>
                </Table>
			</Card>
		</div>
	);
}

GlobalSearchDualCard.propTypes = {
    cardTitle1: PropTypes.string,
    cardTitle2: PropTypes.string,
    setInputValue: PropTypes.string,
    term: PropTypes.string,
    allCount1: PropTypes.number,
    allListId1: PropTypes.string,
    allCount2: PropTypes.number,
    allListId2: PropTypes.string,
    colHeading1: PropTypes.string,
    colHeading2: PropTypes.string,
    colHeading3: PropTypes.string,
    searchItems: PropTypes.array
};
