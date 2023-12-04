import { TransactionColumn } from "./components/columns";
import { TransactionClient } from "./components/client";
import axios from "axios";

const TransactionsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const { data } = await axios.get('http://localhost:4000/users/transaction-history');
  // Map the received data to match the expected structure
  const formattedData: TransactionColumn[] = data.map((item: any) => ({
    id: item._id, // assuming "_id" is the correct field for id
    name1: item.name1,
    name2: item.name2,
    amount: item.amount.toString(),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TransactionClient data={formattedData} />
      </div>
    </div>
  );
};

export default TransactionsPage;
