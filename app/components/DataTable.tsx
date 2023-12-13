"use client";
import React, { FC } from "react";
import { Table, flexRender } from "@tanstack/react-table";
import Skeleton from "@/app/components/Skeleton";
import MicroButton from "@/app/components/MicroButton";

type Props = {
  table: Table<any>;
  loading: boolean;
  skeletonRows?: number;
};

const DataTable: FC<Props> = ({ table, loading, skeletonRows = 10 }) => {
  return (
    <div className="w-full">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    style={{
                      width: header.getSize(),
                      maxWidth: header.getSize(),
                    }}
                    className="border-b border-t border-solid border-b-[#ECEEF1] border-t-[#D9DEE3] px-2 py-1.5 text-start text-xs font-semibold leading-normal text-gray-bold"
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {!loading &&
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    className="border-y border-solid border-gray-easy px-2 py-1.5 text-sm leading-normal text-gray-light"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          {loading &&
            Array.from({ length: skeletonRows }).map((_i, index) => {
              return table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id + index}>
                  {headerGroup.headers.map((column) => (
                    <td
                      key={column.id + index}
                      style={{
                        width: column.getSize(),
                        maxWidth: column.getSize(),
                      }}
                      className="px-2 py-1.5"
                    >
                      <Skeleton width={column.getSize() - 16} height={23} />
                    </td>
                  ))}
                </tr>
              ));
            })}
        </tbody>
      </table>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 p-2.5 text-xs font-medium leading-normal text-gray-light">
          <span>Page</span>
          <span>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <MicroButton onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage() || loading}>
            Previous
          </MicroButton>
          <MicroButton onClick={() => table.nextPage()} disabled={!table.getCanNextPage() || loading}>
            Next
          </MicroButton>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
