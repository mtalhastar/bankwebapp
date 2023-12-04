import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSession } from 'next-auth/react';
import { MoreHorizontal, Trash, Send, CircleDollarSign } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { AlertModal } from "@/components/modals/alert-modal";
import { BillboardColumn } from "./columns";

import { TransferModal } from "@/components/modals/transfer-modal";
import { WithdrawModal } from "@/components/modals/withdraw-modal";
import { DepositModal } from "@/components/modals/deposit-modal";
import { ZakatModal } from "@/components/modals/zakat-modal";

import { getServerSession } from 'next-auth/next'

interface CellActionProps {
  data: BillboardColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [zakatModalOpen, setZakatModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [selectedUser, setSelectedUser] = useState(""); 
  const [transferAmount, setTransferAmount] = useState(""); 
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [calculatedZakat, setCalculatedZakat] = useState(0);
  const [users, setUsers] = useState([]);

  const router = useRouter();
  const { data: session } = useSession();
  const[name,setname]=useState('');
  // const session = await getServerSession(authOptions)

  useEffect(() => {
    const namee=localStorage.getItem("token");
    if(namee==null){
      return;
    }
    setname(namee);
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/users"); // Replace with your actual API endpoint
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); 

  const handleTransfer = async () => {
    try {
      setLoading(true);
      await axios.post("http://localhost:4000/users/create-transaction", {
        name1: data.name,
        name2: selectedUser,
        amount: parseFloat(transferAmount),
      });
      toast.success("Money transferred successfully.");
      router.refresh();
      // Perform any additional logic or state update after successful transfer
    } catch (error) {
      toast.error("Error transferring money.");
      console.error(error);
    } finally {
      setTransferModalOpen(false);
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `http://localhost:4000/users/delete-user/${data.id}`
      );
      toast.success("User deleted.");
      router.refresh();
      // Perform any additional logic or state update after successful deletion
    } catch (error) {
      toast.error("Error deleting user.");
      console.error(error);
    } finally {
      setDeleteModalOpen(false);
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    try {
      setLoading(true);
      await axios.post("http://localhost:4000/users/withdraw", {
        name: data.name, // Use the user from whom the withdrawal is happening
        amount: parseFloat(withdrawAmount),
      }).then((response) => { console.log(response) });
      toast.success("Money withdrawn successfully.");
      router.refresh();
      // Perform any additional logic or state update after successful withdrawal
    } catch (error) {
      toast.error("Error withdrawing money.");
      console.error(error);
    } finally {
      setWithdrawModalOpen(false);
      setLoading(false);
    }
  };

  const handleDeposit = async () => {
    try {
      setLoading(true);
      await axios.post("http://localhost:4000/users/deposit", {
        name: data.name, // Use the user to whom the deposit is happening
        amount: parseFloat(depositAmount),
      });
      toast.success("Money deposited successfully.");
      router.refresh();
      // Perform any additional logic or state update after successful deposit
    } catch (error) {
      toast.error("Error depositing money.");
      console.error(error);
    } finally {
      setDepositModalOpen(false);
      setLoading(false);
    }
  };


  const handleCalculateZakat = async () => {
    try {
      const response = await axios.post("http://localhost:4000/users/deduct-zakat", {
        name: data.name,
      });
      setCalculatedZakat(response.data.amount);
      setZakatModalOpen(true);
      router.refresh()
    } catch (error) {
      toast.error("Error calculating Zakat.");
      console.error(error);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteUser}
        loading={loading}
      />
      <ZakatModal
        isOpen={zakatModalOpen}
        onClose={() => setZakatModalOpen(false)}
        onCalculateZakat={handleCalculateZakat}
        zakatAmount={calculatedZakat}
      />
      <TransferModal
        isOpen={transferModalOpen}
        onClose={() => setTransferModalOpen(false)}
        onConfirm={handleTransfer}
        loading={loading}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        transferAmount={transferAmount}
        setTransferAmount={setTransferAmount}
        users={users} // Pass the array of users for the select options
      />
      <WithdrawModal
        isOpen={withdrawModalOpen}
        onClose={() => setWithdrawModalOpen(false)}
        onConfirm={handleWithdraw}
        withdrawAmount={withdrawAmount} // Pass the withdraw amount
        setWithdrawAmount={setWithdrawAmount} // Set withdraw amount state
        loading={loading}
      />
      <DepositModal
        isOpen={depositModalOpen}
        onClose={() => setDepositModalOpen(false)}
        onConfirm={handleDeposit}
        depositAmount={depositAmount} // Pass the deposit amount
        setDepositAmount={setDepositAmount} // Set deposit amount state
        loading={loading}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setTransferModalOpen(true)}>
            <Send className="mr-2 h-4 w-4" /> Transfer Money
          </DropdownMenuItem>
          {name === data.name && (
          <>
            <DropdownMenuItem onClick={() => setWithdrawModalOpen(true)}>
              <CircleDollarSign className="mr-2 h-4 w-4" /> Withdraw Money
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDepositModalOpen(true)}>
              <CircleDollarSign className="mr-2 h-4 w-4" /> Deposit Money
            </DropdownMenuItem>
          </>
          )}
          <DropdownMenuItem onClick={() => setDeleteModalOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete User
          </DropdownMenuItem>
          {data.accountType === "savings" && (
            <DropdownMenuItem onClick={handleCalculateZakat}>
              <CircleDollarSign className="mr-2 h-4 w-4" /> Calculate Zakat
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
