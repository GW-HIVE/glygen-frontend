import React, { useEffect, useReducer, useState } from 'react';
import Helmet from 'react-helmet';
import { getTitle, getMeta } from '../utils/head';
import PageLoader from '../components/load/PageLoader';
import TextAlert from '../components/alert/TextAlert';
import DialogAlert from '../components/alert/DialogAlert';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import '../css/Search.css';
import stringConstants from '../data/json/stringConstants';
import routeConstants from '../data/json/routeConstants';
import {logActivity} from '../data/logging';
import {axiosError} from '../data/axiosError';
import FeedbackWidget from "../components/FeedbackWidget";
import { Paper } from '@material-ui/core';


const GlobalSearchResult = (props) => {
    let { id } = useParams("");
    
	const [pageLoading, setPageLoading] = useState(true);
	const [alertTextInput, setAlertTextInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{show: false, id: ""}
	);
	const [alertDialogInput, setAlertDialogInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{show: false, id: ""}
    );

    useEffect(() => {
		setPageLoading(true);
		logActivity();
		document.addEventListener('click', () => {
			setAlertTextInput({"show": false})
        });
        setPageLoading(false);
    });
    
	return (
		<>
			<Helmet>
				{getTitle('globalSearchResult')}
				{getMeta('globalSearchResult')}
			</Helmet>
			<FeedbackWidget />
			<div className='lander'>
				<Container>
					<PageLoader pageLoading={pageLoading} />
					<DialogAlert
						alertInput={alertDialogInput}
						setOpen={(input) => {
							setAlertDialogInput({"show": input})
						}}
					/>
                    <TextAlert
						alertInput={alertTextInput}
					/>

                    <Paper>
                        <div className="panel-heading gg-panel">
                            <h2>Search result for <span style={{ color: "#2F78B7" }}>{id}</span></h2>
                        </div>
                    </Paper>
                </Container>
            </div>
		</>
	);
};

export default GlobalSearchResult;