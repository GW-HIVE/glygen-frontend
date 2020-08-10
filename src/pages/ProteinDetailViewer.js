import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useParams } from "react-router-dom";
import { getTitle, getMeta } from "../utils/head";
import { logActivity } from "../data/logging";
import { getDownload } from "../data/commonApi";

const ProteinDetailViewer = (props) => {
	let { id } = useParams();
	let { extension } = useParams();

	const [fileFormat, setFileFormat] = useState(undefined);
	const [detailsData, setDetailsData] = useState(undefined);

	useEffect(() => {
		logActivity();
		setFileFormat(extension);
		props.setShowHeaderFooter(false);
		getDownload(id, extension, false, "protein_detail", { mimeType: "application/json"}).then((response) => {
			setDetailsData(response.data);
		})

	}, []);

	return (
		<React.Fragment>
		{/* // 	<Helmet>
		// 		{getTitle("about")}
		// 		{getMeta("about")}
		// 	</Helmet> */}

			<div id="data_download">
			{fileFormat && <div>
					<pre style={{ wordWrap: "break-word", whiteSpace: "pre-wrap"}}>
						{JSON.stringify(detailsData, null, 2)}
					</pre>
			</div>}
			</div>
		</React.Fragment>
	);
};
export default ProteinDetailViewer;
