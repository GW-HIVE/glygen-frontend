import React, { useState, useEffect } from "react";

import PaginatedTable from "./PaginatedTable";

const ClientPaginatedTable = props => {
  const { data, columns, sizePerPage = 10 } = props;

  const [page, setPage] = useState(1);
  const [pageContents, setPageContents] = useState([]);

  useEffect(() => {
    const start = (page - 1) * sizePerPage;
    const end = page * sizePerPage;
    const pageData = data.slice(start, end);

    setPageContents(pageData);
  }, [page]);

  const handleTableChange = (type, { page }) => {
    setPage(page);
  };

  return (
    <PaginatedTable
      data={pageContents}
      columns={columns}
      page={page}
      sizePerPage={sizePerPage}
      totalSize={data.length}
      onTableChange={handleTableChange}
    />
  );
};

export default ClientPaginatedTable;
