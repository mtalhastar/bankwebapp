'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, BillboardColumn } from "./columns";
import { Button } from "@/components/ui/button";

interface BillboardClientProps {
  data: BillboardColumn[];
}

export const BillboardClient: React.FC<BillboardClientProps> = ({
  data,
}) => {

  const router = useRouter();

  const[name,setname]=useState('');
  
  useEffect (() => {
    const namee=localStorage.getItem("token");
    if(namee==null){
      return;
    }
    setname(namee);
  })

  return (
    <>
      <div className="flex items-center justify-between">
        {/* <Heading title={`Account Holders (${data.length})`} description="Manage account holders" /> */}
        <Heading title={`Welcome ${name}`} description="" />
        <div className="flex space-x-2">
          <Button
            onClick={() => router.push('/transaction-history')}
          >Transaction History</Button>
          <Button
            onClick={() => router.push('/login')}
          >Logout</Button>
        </div>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
