import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import Button from "@material-ui/core/Button";
import { head, getMeta } from "../utils/head";
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { getGlycanList } from "../data";
import { GLYCAN_COLUMNS, getUserSelectedColumns } from "../data/glycan";
import GlycanQuerySummary from "../components/GlycanQuerySummary";
import PaginatedTable from "../components/PaginatedTable";

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

  const handleTableChange = (type, { page, sizePerPage }) => {
    setPage(page);
    setSizePerPage(sizePerPage);

    getGlycanList(id, (page - 1) * sizePerPage + 1).then(({ data }) => {
      // place to change values before rendering

      setData(data.results);
      setQuery(data.query);
      setPagination(data.pagination);

      //   setSizePerPage()
      setTotalSize(data.pagination.total_length);
    });
  };

  const handleModifySearch = () => {
    props.history.push(`/glycan-search/${id}`);
  };

  return (
    <>
      <Helmet>
        <title>{head.glycanList.title}</title>
        {getMeta(head.glycanList)}
      </Helmet>
      <section>
        <GlycanQuerySummary data={query} onModifySearch={handleModifySearch} />
      </section>
      <section>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/glycan-list/${id}/edit`}
        >
          Edit Columns
        </Button>
        {selectedColumns && selectedColumns.length !== 0 && (
          <PaginatedTable
            data={data}
            columns={selectedColumns}
            page={page}
            sizePerPage={sizePerPage}
            totalSize={totalSize}
            onTableChange={handleTableChange}
            onDownload={() => {}}
          />
        )}
      </section>
    </>
  );
};

export default GlycanList;
