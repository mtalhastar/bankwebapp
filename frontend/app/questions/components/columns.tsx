"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type BillboardColumn = {
  id: string
  name: string;
  email: string;
  balance: Number;
  accountType: string;
}

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "name",
    header: "Users",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "accountType",
    header: "Account Type"
  },
  {
    accessorKey: "balance",
    header: "Balance",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
