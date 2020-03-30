import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  PaginationTotalStandalone,
  SizePerPageDropdownStandalone
} from "react-bootstrap-table2-paginator";

const PaginatedTable = ({
  data,
  page,
  columns,
  sizePerPage,
  onTableChange,
  totalSize,
  onDownload
}) => {
  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} Results
    </span>
  );

  const options = {
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
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

  const selectRow = {
    mode: "checkbox", // multi select
    columnWidth: "60px"
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

              {onDownload && <button onClick={onDownload}>Download</button>}

              <PaginationListStandalone {...paginationProps} />
            </div>
            <BootstrapTable
              scrollTop={"Bottom"}
              striped
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
