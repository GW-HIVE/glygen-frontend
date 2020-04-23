import React, { useState, useEffect } from "react";

import PaginatedTable from "./PaginatedTable";

const ClientPaginatedTable = props => {
  const { data, columns, defaultSizePerPage = 20 } = props;

  const [page, setPage] = useState(1);
  const [pageContents, setPageContents] = useState([]);
  const [currentSort, setCurrentSort] = useState("");
  const [currentSortOrder, setCurrentSortOrder] = useState("");
  const [sizePerPage, setSizePerPage] = useState(defaultSizePerPage);

  useEffect(() => {
    const start = (page - 1) * sizePerPage;
    const end = page * sizePerPage;
    const pageData = data.slice(start, end);
    setPageContents(pageData);
  }, [page, currentSort, currentSortOrder, sizePerPage]);

  const handleTableChange = (
    type,
    { page, sizePerPage, sortField, sortOrder }
  ) => {
    data.sort((a, b) => {
      if (a[sortField] > b[sortField]) {
        return sortOrder === "asc" ? 1 : -1;
      } else if (a[sortField] < b[sortField]) {
        return sortOrder === "asc" ? -1 : 1;
      }
      return 0;
    });
    setPage(page);
    setCurrentSort(sortField);
    setCurrentSortOrder(sortOrder);
    setSizePerPage(sizePerPage);
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
