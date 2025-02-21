import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Table, InputGroup, FormControl, Button } from "react-bootstrap";

const generateDummyData = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
  }));
};

export const MyPage = () => {
  const [data, setData] = useState(generateDummyData(50));
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Nama" },
    { accessorKey: "email", header: "Email" },
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      pagination: { pageIndex: page, pageSize },
    },
    onSortingChange: setSorting,
  });

  return (
    <div className="container mt-3">
      {/* Filter Input */}
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>

      {/* Table */}
      <Table striped bordered hover>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  onClick={column.column.getToggleSortingHandler()}
                  style={{ cursor: "pointer" }}
                >
                  {flexRender(column.column.columnDef.header, column.getContext())}
                  {column.column.getIsSorted() === "asc" ? " ▲" : column.column.getIsSorted() === "desc" ? " ▼" : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="d-flex justify-content-between">
        <Button disabled={!table.getCanPreviousPage()} onClick={table.previousPage}>
          Previous
        </Button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <Button disabled={!table.getCanNextPage()} onClick={table.nextPage}>
          Next
        </Button>
      </div>
    </div>
  );
};
