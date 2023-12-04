import { format } from "date-fns";
import { BillboardColumn } from "./components/columns";
import { BillboardClient } from "./components/client";
import axios from "axios";

const BillboardsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const { data } = await axios.get('http://localhost:4000/users/');
  // Map the received data to match the expected structure
  const formattedData: BillboardColumn[] = data.map((item: any) => ({
    id: item._id, // assuming "_id" is the correct field for id
    name: item.name,
    email: item.email,
    balance: item.amount.toString(),
    accountType: item.accountType
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedData} />
      </div>
    </div>
  );
};

export default BillboardsPage;
