/* eslint-disable jsx-a11y/aria-proptypes */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import paginationFactory from "react-bootstrap-table2-paginator";
import {
  toAbsoluteUrl,
  sortCaret,
  headerSortingClasses,
  PleaseWaitMessage,
  NoRecordsFoundMessage,
} from "../../../_metronic/_helpers";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  formatDate,
  sizePerPageList,
  StatusFormatter,
  attachFormatter,
} from "../../utility";
export const LayoutTable = ({
  data,
  page,
  sizePerPage,
  onTableChange,
  totalSize,
  loading,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    // Add number
    const pageBefore = sizePerPage * (page - 1);
    const initData = data.map((item, index) => {
      return {
        ...item,
        no: index + 1 + pageBefore,
      };
    });
    setTableData(initData);
  }, [data, sizePerPage, page]);

  const columns = [
    {
      text: "No",
      dataField: "no",
      sort: true,
      sortCaret,
      headerSortingClasses,
    },
    {
      text: "username",
      dataField: "username",
      sort: true,
      sortCaret,
      headerSortingClasses,
    },
    {
      text: "fullname",
      dataField: "fullname",
      sort: true,
      sortCaret,
      headerSortingClasses,
    },
  ];

  const options = {
    page: page,
    sizePerPage: sizePerPage,
    showTotal: true,
    totalSize: totalSize,
    sizePerPageList: sizePerPageList,
  };

  return (
    <>
      <BootstrapTable
        remote
        wrapperClasses="table-responsive"
        classes="table table-head-custom table-vertical-center overflow-hidden"
        bootstrap4
        bordered={false}
        keyField="retNumber"
        data={tableData}
        columns={columns}
        pagination={paginationFactory(options)}
        onTableChange={onTableChange}
        hover
      >
        <PleaseWaitMessage entities={loading ? null : tableData} />
        <NoRecordsFoundMessage entities={loading ? null : tableData} />
      </BootstrapTable>
    </>
  );
};
