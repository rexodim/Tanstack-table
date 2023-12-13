"use client";
import React, { useState } from "react";
import FilterPill from "@/app/components/FilterPill";
import DataTable from "@/app/components/DataTable";
import { Modal, ModalContent, ModalFooter, ModalTitle } from "@/app/components/Modal";
import Button from "@/app/components/Button";
import { IRequest, Status } from "@/app/types";
import StatusState from "@/app/components/StatusState";
import { format, parseISO } from "date-fns";
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Input from "@/app/components/Input";
import Select from "@/app/components/Select";
import useRequests from "@/app/hooks/useRequests";

const STATUS_OPTIONS = [
  { label: Status.Draft, value: Status.Draft },
  { label: Status.Pending, value: Status.Pending },
  { label: Status.Complete, value: Status.Complete },
];

const columnHelper = createColumnHelper<IRequest>();

const columns = [
  columnHelper.accessor("id", {
    header: "Request Id",
    cell: (info) => info.getValue(),
    minSize: 115,
  }),
  columnHelper.accessor("status", {
    header: "Progress",
    cell: (info) => <StatusState value={info.getValue()} />,
    minSize: 115,
  }),
  columnHelper.accessor((row) => row.item, {
    header: "Item",
    cell: (info) => info.getValue(),
    minSize: 400,
  }),
  columnHelper.accessor((row) => row.createdAt, {
    header: "Created At",
    cell: (info) => format(parseISO(info.renderValue() as string), "MMM d, yyyy h:mm a"),
    minSize: 400,
  }),
];

const Home = () => {
  const [modalsState, setModalsState] = useState({
    status: false,
    request: false,
  });
  const [status, setStatus] = useState("");
  const [requestId, setRequestId] = useState("");

  const { data = [], isLoading } = useRequests();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const openStatusModal = () => {
    setModalsState({ status: true, request: false });
  };

  const openRequestModal = () => {
    setModalsState({ status: false, request: true });
  };

  const handleApplyStatusFilter = () => {
    table.getColumn("status")?.setFilterValue(status);
    setModalsState((prev) => ({ ...prev, status: false }));
  };

  const handleApplyRequestIdFilter = () => {
    if (+requestId) {
      table.getColumn("id")?.setFilterValue(() => [+requestId, +requestId]);
    } else {
      table.getColumn("id")?.setFilterValue(undefined);
    }
    setModalsState((prev) => ({ ...prev, request: false }));
  };

  const handleDeleteStatusFilter = () => {
    table.getColumn("status")?.setFilterValue(undefined);
    setStatus("");
  };

  const handleDeleteRequestIdFilter = () => {
    table.getColumn("id")?.setFilterValue(undefined);
    setRequestId("");
  };

  return (
    <main className="m-8 min-h-screen">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <FilterPill
              field="State"
              value={table.getColumn("status")?.getFilterValue() as string}
              handleAddClick={openStatusModal}
              handleDeleteClick={handleDeleteStatusFilter}
            />
            <Modal
              close={() => setModalsState((prev) => ({ ...prev, status: false }))}
              open={modalsState.status}
              position={{ top: 32, left: 0 }}
              disableBackdrop
            >
              <ModalTitle>Filter by State</ModalTitle>
              <ModalContent>
                <div className="flex flex-row items-center justify-between gap-2">
                  <label className="w-max text-sm font-normal leading-[125%] text-gray-light">Is equal to:</label>
                  <Select value={status} onChange={(e) => setStatus(e.target.value)} options={STATUS_OPTIONS} />
                </div>
              </ModalContent>
              <ModalFooter>
                <Button fullWidth disabled={!status} onClick={handleApplyStatusFilter}>
                  Apply
                </Button>
              </ModalFooter>
            </Modal>
          </div>
          <div className="relative">
            <FilterPill
              value={((table.getColumn("id")?.getFilterValue() as string[]) || [""])[0]}
              field="Request ID"
              handleAddClick={openRequestModal}
              handleDeleteClick={handleDeleteRequestIdFilter}
            />
            <Modal
              open={modalsState.request}
              close={() => setModalsState((prev) => ({ ...prev, request: false }))}
              position={{ top: 32, left: 0 }}
              disableBackdrop
            >
              <ModalTitle>Filter by Request ID</ModalTitle>
              <ModalContent>
                <div className="flex flex-row items-center justify-between gap-2">
                  <label className="w-max text-sm font-normal leading-[125%] text-gray-light">Is equal to:</label>
                  <Input value={requestId} onChange={(e) => setRequestId(e.target.value)} />
                </div>
              </ModalContent>
              <ModalFooter>
                <Button fullWidth disabled={!requestId} onClick={handleApplyRequestIdFilter}>
                  Apply
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
        <DataTable table={table} loading={isLoading} />
      </div>
    </main>
  );
};

export default Home;
