import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Col, Dropdown } from "react-bootstrap";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";
import { LayoutSplashScreen } from "../../../_metronic/layout";
import { useHistory } from "react-router-dom";
import { showErrorDialog, showSuccessDialog } from "../../utility";
import {
  getUser,
  selectData,
  // selectPageNo,
  // selectPageSize,
  // selectTotalRecord,
  // selectLoading,
} from "./layoutSlice";
import { LayoutTable } from "./LayoutTable";

import { selectUser } from "../auth/authSlice";

import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";

export const LayoutPage = ({ className }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const data = useSelector(selectData);
  // const loading = useSelector(selectLoading);
  // const pageNo = useSelector(selectPageNo);
  // const pageSize = useSelector(selectPageSize);
  // const totalRecord = useSelector(selectTotalRecord);

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [role, setRole] = useState("");

  const handleSearch = async () => {
    const params = {
      username: username,
      fullname: fullname,
      role: role,
      pageNo: 1,
      pageSize: 10,
    };
    callApi(params);
  };

  // const handleTableChange = async (
  //   type,
  //   { page, sizePerPage, sortField, sortOrder, data }
  // ) => {
  //   if (type === "pagination") {
  //     const params = {
  //       username: username,
  //       fullname: fullname,
  //       role: role,
  //       pageNo: page,
  //       pageSize: sizePerPage,
  //     };
  //     callApi(params);
  //   } else {
  //     let result;
  //     if (sortOrder === "asc") {
  //       result = data.sort((a, b) => {
  //         if (a[sortField] > b[sortField]) {
  //           return 1;
  //         } else if (b[sortField] > a[sortField]) {
  //           return -1;
  //         }
  //         return 0;
  //       });
  //       console.log(result, "asc");
  //     } else {
  //       result = data.sort((a, b) => {
  //         if (a[sortField] > b[sortField]) {
  //           return -1;
  //         } else if (b[sortField] > a[sortField]) {
  //           return 1;
  //         }
  //         return 0;
  //       });
  //       console.log(result, "desc");
  //     }
  //   }
  // };

  const callApi = async (params) => {
    try {
      setIsloading(true);
      const response = await dispatch(getUser(params));
      const res = response.payload;
      if (res.status === 200) {
      } else {
        showErrorDialog(res.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsloading(false);
    }
  };
  const data = [
    {
      title: "mobil",
      type: "pajero",
      data: [
        { no: "1", warna: "merah" },
        { no: "2", warna: "hijau" },
      ],
    },
    {
      title: "motor",
      type: "bebek",
      data: [
        { no: "1", warna: "merah" },
        { no: "2", warna: "hijau" },
      ],
    },
    {
      title: "sepeda",
      type: "listrik",
      data: [
        { no: "1", warna: "merah" },
        { no: "2", warna: "hijau" },
      ],
    },
  ];
  return (
    <Card>
      <CardHeader title="layout">
        <CardHeaderToolbar>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Dropdown Button
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">list 3</Dropdown.Item>
              <Dropdown.Item href="#/action-2">list 2</Dropdown.Item>
              <Dropdown.Item href="#/action-3">list 1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <Form>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Fullname</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Role</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
          </Form.Row>

          <Button
            variant="primary"
            disabled={isLoading}
            onClick={!isLoading ? handleSearch : null}
          >
            {isLoading ? "Loading…" : "Search"}
          </Button>
        </Form>{" "}
        {/* Table */}
        {/* <LayoutTable
          // data={data}
          // page={pageNo}
          // sizePerPage={pageSize}
          // totalSize={totalRecord}
          // onTableChange={handleTableChange}
          // loading={loading}
          /> */}
      </CardBody>

    </Card>
  );
};
