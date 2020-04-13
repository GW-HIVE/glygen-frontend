import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { getTitle } from "../utils/head";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { getGlycanList } from "../data";
import { GLYCAN_COLUMNS, getUserSelectedColumns } from "../data/glycan";
import GlycanQuerySummary from "../components/GlycanQuerySummary";
import PaginatedTable from "../components/PaginatedTable";
// import { downloadFromServer } from "../utils/download";
import Container from "@material-ui/core/Container";
import DownloadButton from "../components/DownloadButton";

// const DownloadButton = props => {
//   const { types, dataType, dataId } = props;

//   const [show, setShow] = useState(false);
//   const [format, setFormat] = useState(props.format || props.types[0]);
//   const [compressed, setCompressed] = useState(props.compressed || false);

//   const handleDownload = async () => {
//     await downloadFromServer(dataId, format, compressed, dataType);

//     setShow(false);
//   };

//   return (
//     <div className="dropdown gg-download text-right">
//       <button
//         className="btn btn-link btn-link-detail dropdown-toggle"
//         type="button"
//         id="download"
//         alt="Download results"
//         data-toggle="dropdown"
//         aria-haspopup="true"
//         aria-expanded="true"
//         onClick={() => {
//           setShow(!show);
//         }}
//       >
//         <i className="glyphicon glyphicon-save"></i> DOWNLOAD
//         <span className="caret"></span>
//       </button>
//       <div
//         className={
//           "dropdown-menu dropdown-menu-box dropdown-menu-right" +
//           (show ? " open show" : "")
//         }
//         aria-labelledby="download"
//       >
//         <div className="row">
//           <div className="col-md-7">
//             <label>Download&nbsp;format: </label>
//           </div>
//           <div className="col-md-5 text-left">
//             <select
//               id="download_format"
//               onChange={e => {
//                 setFormat(e.target.value);
//               }}
//             >
//               {types.map(type => (
//                 <option selected={type === format} value={type}>
//                   {type.toUpperCase()}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-md-7">
//             <label>Compressed: </label>
//           </div>
//           <div className="col-md-5">
//             <input
//               type="checkbox"
//               id="download_compression"
//               checked={compressed}
//               onClick={e => {
//                 setCompressed(e.target.checked);
//               }}
//             />
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-md-7"></div>
//           <div className="col-md-5 text-right">
//             <button className="btn-default" onClick={handleDownload}>
//               OK
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
const GlycanList = props => {
  let { id } = useParams();

  const [data, setData] = useState([]);
  const [query, setQuery] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(20);
  const [totalSize, setTotalSize] = useState();

  useEffect(() => {
    const selected = getUserSelectedColumns();
    const userSelectedColumn = GLYCAN_COLUMNS.filter(column =>
      selected.includes(column.text)
    );
    setSelectedColumns(userSelectedColumn);

    getGlycanList(id).then(({ data }) => {
      setData(data.results);
      setQuery(data.query);
      setPagination(data.pagination);
      const currentPage = (data.pagination.offset - 1) / sizePerPage + 1;
      setPage(currentPage);
      //   setSizePerPage()
      setTotalSize(data.pagination.total_length);
    });
    // eslint-disable-next-line
  }, []);

  const handleTableChange = (
    type,
    { page, sizePerPage, sortField, sortOrder }
  ) => {
    setPage(page);
    setSizePerPage(sizePerPage);

    getGlycanList(
      id,
      (page - 1) * sizePerPage + 1,
      sizePerPage,
      sortField,
      sortOrder
    ).then(({ data }) => {
      // place to change values before rendering

      setData(data.results);
      setQuery(data.query);
      setPagination(data.pagination);

      //   setSizePerPage()
      setTotalSize(data.pagination.total_length);
    });
  };

  function rowStyleFormat(row, rowIdx) {
    return { backgroundColor: rowIdx % 2 === 0 ? "red" : "blue" };
  }
  const handleModifySearch = () => {
    props.history.push(`/glycan-search/${id}`);
  };

  return (
    <>
      <Helmet>
        {getTitle("glycanList")}
        {getTitle("glycanList")}
      </Helmet>
      <Container maxWidth="xl" className="ggContainer">
        <section className="content-box-md">
          {/* <section style={{ paddingTop: "20px" }}> */}
          <GlycanQuerySummary
            data={query}
            onModifySearch={handleModifySearch}
          />
        </section>
        <section>
          {selectedColumns && selectedColumns.length !== 0 && (
            <PaginatedTable
              trStyle={rowStyleFormat}
              data={data}
              columns={selectedColumns}
              page={page}
              sizePerPage={sizePerPage}
              totalSize={totalSize}
              onTableChange={handleTableChange}
              downloadButton={
                <DownloadButton
                  types={[
                    { type: "csv", data: "glycan_list" },
                    { type: "json", data: "glycan_list" }
                  ]}
                  dataId={id}
                />
              }
            />
          )}
        </section>
      </Container>
    </>
  );
};

export default GlycanList;
