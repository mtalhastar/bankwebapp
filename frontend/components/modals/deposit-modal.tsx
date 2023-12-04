import { useEffect, useState } from "react";
import { SendHorizontal } from "lucide-react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  depositAmount: string; // Add deposit amount state
  setDepositAmount: React.Dispatch<React.SetStateAction<string>>; // Set deposit amount state
}

export const DepositModal: React.FC<DepositModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  depositAmount,
  setDepositAmount,
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
      title="Deposit Money"
      description="Deposit money to your account"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex items-center space-x-4">
        <div className="grid flex-1 gap-2">
          <Label htmlFor="amount" className="sr-only">
            Deposit Amount
          </Label>
          <Input
            id="amount"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="Enter your amount here"
          />
        </div>
        <Button type="submit" size="sm" onClick={onConfirm}>
          <span className="sr-only">Deposit</span>
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </Modal>
  );
};
