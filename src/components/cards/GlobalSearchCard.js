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

export default function GlobalSearchCard(props) {

	return (
        <div className={"global-search-card"}>
			<Card className={"card"}>
                <Table style={{margin:"0px", padding:"0px"}}>
                    <TableHead>
                        <TableRow hover className="card-head">
                            <TableCell align="center" colSpan={2}>
                                <h4>
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
                        (items.name !== "all" && <TableRow key={items.name} hover className="card-row">
                                <TableCell className={"gs-cell-left"} classes={{body: "gs-cell-body"}}>
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
                            <TableCell className={"gs-cell-right"} classes={{body: "gs-cell-body"}}>
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
