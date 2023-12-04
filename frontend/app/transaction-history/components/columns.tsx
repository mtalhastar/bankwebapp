"use client"

import { ColumnDef } from "@tanstack/react-table"

export type TransactionColumn = {
  name1: string
  name2: string;
  amount: Number;
}

export const columns: ColumnDef<TransactionColumn>[] = [
  {
    accessorKey: "name1",
    header: "Sender",
  },
  {
    accessorKey: "name2",
    header: "Receiver",
  },
  {
    accessorKey: "amount",
    header: "Amount"
  }
];
