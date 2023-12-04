"use client";

import { useEffect, useState } from "react";
import { SendHorizontal } from "lucide-react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BillboardColumn } from "@/app/questions/components/columns";

interface TransferModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
    selectedUser: string; // Add selected user state
    setSelectedUser: React.Dispatch<React.SetStateAction<string>>; // Set selected user state
    transferAmount: string; // Add transfer amount state
    setTransferAmount: React.Dispatch<React.SetStateAction<string>>; // Set transfer amount state
    users: BillboardColumn[]; // Array of users for the select options
  }
  
  export const TransferModal: React.FC<TransferModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading,
    selectedUser,
    setSelectedUser,
    transferAmount,
    setTransferAmount,
    users,
  }) => {
    const [isMounted, setIsMounted] = useState(false);
  
    useEffect(() => {
      setIsMounted(true);
    }, []);
  
    if (!isMounted) {
      return null;
    }
  
    return (
      <Modal
        title="Transfer Money"
        description="Transfer money to another account"
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="flex items-center space-x-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="userSelect" className="sr-only">
              Select User
            </Label>
            <select
              id="userSelect"
              className="w-full px-3 py-2 border bg-gray-100 text-black rounded-lg placeholder-gray-900 focus:outline-none border-gray-400"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
            <Label htmlFor="amount" className="sr-only">
              Transfer Amount
            </Label>
            <Input
              id="amount"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              placeholder="Enter your amount here"
            />
          </div>
          <Button type="submit" size="sm" onClick={onConfirm}>
            <span className="sr-only">Send</span>
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </Modal>
    );
  };