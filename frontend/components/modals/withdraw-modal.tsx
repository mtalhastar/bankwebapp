import { useEffect, useState } from "react";
import { SendHorizontal } from "lucide-react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  withdrawAmount: string; // Add withdraw amount state
  setWithdrawAmount: React.Dispatch<React.SetStateAction<string>>; // Set withdraw amount state
}

export const WithdrawModal: React.FC<WithdrawModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  withdrawAmount,
  setWithdrawAmount,
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
      title="Withdraw Money"
      description="Withdraw money from your account"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex items-center space-x-4">
        <div className="grid flex-1 gap-2">
          <Label htmlFor="amount" className="sr-only">
            Withdraw Amount
          </Label>
          <Input
            id="amount"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            placeholder="Enter your amount here"
          />
        </div>
        <Button type="submit" size="sm" onClick={onConfirm}>
          <span className="sr-only">Withdraw</span>
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </Modal>
  );
};
