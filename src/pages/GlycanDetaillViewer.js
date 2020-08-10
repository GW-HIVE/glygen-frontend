import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useParams } from "react-router-dom";
import { getTitle, getMeta } from "../utils/head";
import { logActivity } from "../data/logging";
import { getDownload, getDownloadUrl } from "../data/commonApi";

const GlycanDetaillViewer = (props) => {
	let { id } = useParams();
	let { extension } = useParams();

	const [fileFormat, setFileFormat] = useState(undefined);
	const [url, setUrl] = useState("");
	const [detailsData, setDetailsData] = useState(undefined);


	useEffect(() => {
		logActivity();
		var format = extension;
		
		setFileFormat(format);
		props.setShowHeaderFooter(false);
		if (format === "png") {
			const imageUrl = getDownloadUrl(id, extension, false, "glycan_image");
			setUrl(imageUrl);
		}

		if (format === "json") {
			getDownload(id, extension, false, "glycan_detail", { mimeType: "application/json"}).then((response) => {
				setDetailsData(response.data);
			}) 
		}

	}, []);

	return (
		<React.Fragment>
		{/* // 	<Helmet>
		// 		{getTitle("about")}
		// 		{getMeta("about")}
		// 	</Helmet>*/}

			<div id="data_download">
				{fileFormat === "json" && <div>
					<pre style={{ wordWrap: "break-word", whiteSpace: "pre-wrap"}}>
						{JSON.stringify(detailsData, null, 2)}
					</pre>
				</div>}
				{fileFormat === "png" && <div>
					<img style={{ margin: "auto"}} src={url}></img>
				</div>}
			</div>
		</React.Fragment>
	);
};
export default GlycanDetaillViewer;
