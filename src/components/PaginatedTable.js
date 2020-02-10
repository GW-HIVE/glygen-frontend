import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  PaginationTotalStandalone,
  SizePerPageDropdownStandalone
} from "react-bootstrap-table2-paginator";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

const PaginatedTable = ({
  data,
  page,
  columns,
  sizePerPage,
  onTableChange,
  totalSize,
  onDownload,
  editColumnLink
}) => {
  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} Results
    </span>
  );

  const options = {
    // paginationSize: 4,
    // pageStartIndex: 0,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    // firstPageText: "First",
    // prePageText: "Back",
    // nextPageText: "Next",
    // lastPageText: "Last",
    // nextPageTitle: "First page",
    // prePageTitle: "Pre page",
    // firstPageTitle: "Next page",
    // lastPageTitle: "Last page",
    showTotal: true,
    paginationTotalRenderer: customTotal,
    sizePerPageList: [
      {
        text: "20",
        value: 20
      },
      {
        text: "40",
        value: 40
      },
      {
        text: "60",
        value: 60
      }
    ] // A numeric array is also available. the purpose of above example is custom the text
  };

  return (
    <div>
      <PaginationProvider
        pagination={paginationFactory({
          ...options,
          custom: true,
          page,
          sizePerPage,
          totalSize
        })}
      >
        {({ paginationProps, paginationTableProps }) => (
          <div>
            <div>
              <SizePerPageDropdownStandalone {...paginationProps} />

              <PaginationTotalStandalone {...paginationProps} />

              {onDownload && <button>Download</button>}

              {editColumnLink && (
                <Button component={Link} to={editColumnLink}>
                  Edit Columns
                </Button>
              )}

              <PaginationListStandalone {...paginationProps} />
            </div>
            <BootstrapTable
              remote
              keyField="id"
              data={data}
              columns={columns}
              onTableChange={onTableChange}
              {...paginationTableProps}
            />
            <div>
              <PaginationTotalStandalone {...paginationProps} />
              <PaginationListStandalone {...paginationProps} />
            </div>
          </div>
        )}
      </PaginationProvider>
    </div>
  );
};

export default PaginatedTable;
