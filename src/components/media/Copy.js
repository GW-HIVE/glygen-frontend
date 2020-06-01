import React from "react";
import Container from "@material-ui/core/Container";
import { Row, Image, Col } from "react-bootstrap";
import HorizontalHeading from "../../components/headings/HorizontalHeading";
import "../../css/Media.css";
import triFoldJunePdf from "../../images/media/portfolio/brochures/tri-fold-brochure-june.pdf";
import triFold1Img from "../../images/media/portfolio/brochures/Tri-fold-1.png";
import bioCurationPdf from "../../images/media/portfolio/posters/BioCuration-GlyGen-2019.04.pdf";
import poster1Img from "../../images/media/portfolio/posters/poster-1.png";
import onePageBrochurePdf from "../../images/media/portfolio/brochures/glygen-one-page-brochure.pdf";
import onePageBrochurImg from "../../images/media/portfolio/brochures/one-page-brochure-1.png";
import sfgData19posterPdf from "../../images/media/portfolio/posters/SFG-Data-GlyGen-Nov-2019.pdf";
import poster2Img from "../../images/media/portfolio/posters/poster-2.png";
import sfgWeb19posterPdf from "../../images/media/portfolio/posters/SFG-Web-GlyGen-Nov-2019.pdf";
import poster3Img from "../../images/media/portfolio/posters/poster-3.png";
import logos from "../../images/media/portfolio/logo/Logos.png";
import onePageBrochure2Pdf from "../../images/media/portfolio/brochures/glygen-one-page-brochure-2.pdf";
import onePageBrochureImg from "../../images/media/portfolio/brochures/one-page-brochure-2.png";
import stickersLogoPdf from "../../images/media/portfolio/stickers/stikers-oval-logo-blue-white.pdf";
import stickersLogoImg from "../../images/media/portfolio/stickers/stickers-logo.png";

const Portfolio = (props) => {
	const horHeadPortfolio = {
		h5VerticalText: "Portfolio",
		h2textTop: "Our Amazing",
		h2textTopStrongAfter: "Work",
	};

	return (
		<React.Fragment>
			<Container maxWidth="lg">
				<section className="content-box-md5 about-section-bg5">
					<HorizontalHeading post={horHeadPortfolio} />
					<Row className="gg-align-middle5 gg-align-center">
						<Col sm={12} className="text-center">
							{/* Portfolio Items Filters  */}
							<div id="isotope-filters">
								<button className="btn active" data-filter="*">
									<span>All</span>
								</button>
								<button className="btn" data-filter=".poster">
									<span>Poster</span>
								</button>
								<button className="btn" data-filter=".brochure">
									<span>Brochure</span>
								</button>
								<button className="btn" data-filter=".logo">
									<span>Logo</span>
								</button>
							</div>
						</Col>
						<div>
							{/* <Image
								src={ugaImg}
								className="univ-logo img-responsive"
								alt="uga university logo"
							/> */}
						</div>
					</Row>
				</section>
			</Container>
			{/* Portfolio Items Wrapper  */}
			<section
				id="portfolio-wrapper"
				// className="wow fadeInUp"
				// data-wow-duration="1s"
				// data-wow-delay=".5s"
			>
				{/* <div className="container-fluid"> */}
				<Row className="no-gutters">
					<div id="isotope-container">
						{/* Portfolio Item 01 tri-fold brochure  */}
						<Col xs={12} sm={6} md={3} className="brochure">
							<div className="text-right">
								<a
									className="btn btn-link"
									role="button"
									href={triFoldJunePdf}
									download="GlyGen tri-fold brochure.pdf">
									DOWNLOAD
								</a>
							</div>
							<div className="portfolio-item">
								<a href={triFold1Img} title="Tri-Fold Brochure June 2019">
									<Image
										src={triFold1Img}
										className="img-responsive"
										alt="tri-fold brochure"
									/>
									<div className="portfolio-item-overlay">
										<div className="portfolio-item-details text-center">
											{/* Item Header  */}
											<h3>Brochure</h3>
											{/* Item Strips  */}
											<span></span>
											{/* Item Description  */}
											<p>Tri-Fold Brochure</p>
										</div>
									</div>
								</a>
							</div>
						</Col>
						{/* Portfolio Item 02 Poster Biocuration */}
						<Col xs={12} sm={6} md={3} className="poster">
							<div className="text-right">
								<a
									className="btn btn-link"
									role="button"
									href={bioCurationPdf}
									download="GlyGen BioCuration poster.pdf">
									DOWNLOAD
								</a>
							</div>
							<div className="portfolio-item">
								<a href={poster1Img} title="GlyGen BioCuration April 2019">
									<Image
										src={poster1Img}
										className="img-responsive"
										alt="Poster Biocuration"
									/>
									<div className="portfolio-item-overlay">
										<div className="portfolio-item-details text-center">
											{/* Item Header  */}
											<h3>Poster</h3>
											{/* Item Strips */}
											<span></span>
											{/* Item Description  */}
											<p>BioCuration</p>
										</div>
									</div>
								</a>
							</div>
						</Col>
						{/* Portfolio Item 03 One Page Brochure  */}
						<Col xs={12} sm={6} md={3} className="brochure">
							<div className="text-right">
								<a
									className="btn btn-link"
									role="button"
									href={onePageBrochurePdf}
									download="glygen-one-page-brochure.pdf">
									DOWNLOAD
								</a>
							</div>
							<div className="portfolio-item">
								<a
									href={onePageBrochurImg}
									title="GlyGen One Page Brochure June 2019">
									<Image
										src={onePageBrochurImg}
										className="img-responsive"
										alt="One Page Brochure"
									/>
									<div className="portfolio-item-overlay">
										<div className="portfolio-item-details text-center">
											{/* Item Header  */}
											<h3>Brochure</h3>
											{/* Item Strips  */}
											<span></span>
											{/* Item Description  */}
											<p>One Page Brochure</p>
										</div>
									</div>
								</a>
							</div>
						</Col>
						{/* Portfolio Item 04 Poster SFG Data  */}
						<Col xs={12} sm={6} md={3} className="poster">
							<div className="text-right">
								<a
									className="btn btn-link"
									role="button"
									href={sfgData19posterPdf}
									download="GlyGen SFG Data poster 2019.pdf">
									DOWNLOAD
								</a>
							</div>
							<div className="portfolio-item">
								<a href={poster2Img} title="GlyGen SFG-Data November 2019">
									<Image
										src={poster2Img}
										className="img-responsive"
										alt="Poster SFG Data"
									/>
									<div className="portfolio-item-overlay">
										<div className="portfolio-item-details text-center">
											{/* Item Header  */}
											<h3>Poster</h3>
											{/* Item Strips  */}
											<span></span>
											{/* Item Description  */}
											<p>SFG Data</p>
										</div>
									</div>
								</a>
							</div>
						</Col>
						{/* Portfolio Item 05 Logo  */}
						<Col xs={12} sm={6} md={3} className="logo">
							<div className="text-right">
								<a
									className="btn btn-link"
									role="button"
									href="https://github.com/glygener/glygen-frontend/tree/master/src/GlyGen-logos"
									target="_blank"
									rel="noopener noreferrer"
									download="https://github.com/glygener/glygen-frontend/tree/master/src/GlyGen-logos">
									DOWNLOAD
								</a>
							</div>
							<div className="portfolio-item">
								<a href={logos} title="GlyGen logo">
									<Image src={logos} className="img-responsive" alt="Logo" />
									<div className="portfolio-item-overlay">
										<div className="portfolio-item-details text-center">
											{/* Item Header  */}
											<h3>Logo</h3>
											{/* Item Strips  */}
											<span></span>
											{/* Item Description  */}
											<p>GlyGen logo</p>
										</div>
									</div>
								</a>
							</div>
						</Col>
						{/* Portfolio Item 06 Poster SFG Website  */}
						<Col xs={12} sm={6} md={3} className="poster">
							<div className="text-right">
								<a
									className="btn btn-link"
									role="button"
									href={sfgWeb19posterPdf}
									download="GlyGen SFG Website poster 2019.pdf">
									DOWNLOAD
								</a>
							</div>
							<div className="portfolio-item">
								<a href={poster3Img} title="GlyGen SFG-Data November 2019">
									<Image
										src={poster3Img}
										className="img-responsive"
										alt="Poster SFG Data"
									/>
									<div className="portfolio-item-overlay">
										<div className="portfolio-item-details text-center">
											{/* Item Header  */}
											<h3>Poster</h3>
											{/* Item Strips  */}
											<span></span>
											{/* Item Description  */}
											<p>SFG Website</p>
										</div>
									</div>
								</a>
							</div>
						</Col>
						{/* Portfolio Item 07 One Page Brochure */}
						<Col xs={12} sm={6} md={3} className="brochure">
							<div className="text-right">
								<a
									className="btn btn-link"
									role="button"
									href={onePageBrochure2Pdf}
									download="glygen-one-page-brochure.pdf">
									DOWNLOAD
								</a>
							</div>
							<div className="portfolio-item">
								<a
									href={onePageBrochureImg}
									title="GlyGen One Page Brochure December 2019">
									<Image
										src={onePageBrochureImg}
										className="img-responsive"
										alt="One Page Brochure"
									/>
									<div className="portfolio-item-overlay">
										<div className="portfolio-item-details text-center">
											{/* Item Header  */}
											<h3>Brochure</h3>
											{/* Item Strips  */}
											<span></span>
											{/* Item Description  */}
											<p>One Page Brochure</p>
										</div>
									</div>
								</a>
							</div>
						</Col>
						{/* Portfolio Item 08 GlyGen Logo Stickers  */}
						<Col xs={12} sm={6} md={3} className="logo">
							<div className="text-right">
								<a
									className="btn btn-link"
									role="button"
									href={stickersLogoPdf}
									download="glygen-oval-logo-stickers.pdf">
									DOWNLOAD
								</a>
							</div>
							<div className="portfolio-item">
								<a href={stickersLogoImg} title="GlyGen logo stickers">
									<Image
										src={stickersLogoImg}
										className="img-responsive"
										alt="GlyGen logo stickers"
									/>
									<div className="portfolio-item-overlay">
										<div className="portfolio-item-details text-center">
											{/* Item Header  */}
											<h3>Logo</h3>
											{/* Item Strips  */}
											<span></span>
											{/* Item Description  */}
											<p>GlyGen Logo Stickers</p>
										</div>
									</div>
								</a>
							</div>
						</Col>
					</div>
				</Row>
				{/* </div> */}
			</section>
		</React.Fragment>
	);
};
export default Portfolio;
