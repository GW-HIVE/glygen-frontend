import React, {useState} from 'react';
import { useHistory } from "react-router"
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import {logActivity} from '../../data/logging';
import routeConstants from '../../data/json/routeConstants';
import '../../css/globalSearch.css';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
      },
      input: {
        marginLeft: '10px',
        flex: 1,
      },
      iconButton: {
        padding: 10,
      },
      divider: {
        height: 34,
        margin: 4,
      },
}));

export default function GlobalSearchControl(props) {
   
    let history = useHistory();
    const classes = useStyles();
    const [globalSearchTerm, setGlobalSearchTerm] = useState('');

    function globalSearchTermChange(searchTerm) {
        setGlobalSearchTerm(searchTerm);
    }

    const globalSearchTermOnChange = (event) => {
        setGlobalSearchTerm(event.target.value);
    }

	const globalSearchClick = () => {
        logActivity("user", globalSearchTerm, "Performing Global Search");
        history.push(routeConstants.globalSearchResult + globalSearchTerm);
	}

	return (
    <Paper component="form" className={classes.root}>
        <InputBase
            value={globalSearchTerm}
            onChange={globalSearchTermOnChange}
            className={classes.input}
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search' }}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton disabled={globalSearchTerm.length < 1} onClick={globalSearchClick} className="gs-icon-button" aria-label="search">
            <SearchIcon />
        </IconButton>
    </Paper>
	);
}

GlobalSearchControl.propTypes = {
    globalSearchTermChange : PropTypes.func
};
