import React, {useState} from 'react';
import { useHistory } from "react-router"
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from 'react-bootstrap/Button';
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { fade, makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import ExampleControl from "../example/ExampleControl";
import SelectControl from '../select/SelectControl';
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
        <IconButton onClick={globalSearchClick} className={classes.iconButton} aria-label="search">
            <SearchIcon />
        </IconButton>
    </Paper>
	);
}

GlobalSearchControl.propTypes = {
    globalSearchTermChange : PropTypes.func
};
