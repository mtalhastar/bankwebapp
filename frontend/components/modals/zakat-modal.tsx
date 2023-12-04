import { useEffect, useState } from "react";
import { CircleDollarSign } from "lucide-react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ZakatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCalculateZakat: () => void;
  zakatAmount: number;
}

export const ZakatModal: React.FC<ZakatModalProps> = ({
  isOpen,
  onClose,
  onCalculateZakat,
  zakatAmount,
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
      title="Calculate Zakat"
      description="Calculate Zakat for your savings account"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex items-center space-x-4">
        <div className="grid flex-1 gap-2">
          <Label htmlFor="amount" className="sr-only">
            Calculated Zakat Amount
          </Label>
          <Input
            id="amount"
            value={zakatAmount.toString()}
            disabled
          />
        </div>
        <Button type="button" size="sm" onClick={onCalculateZakat}>
          <span className="sr-only">Calculate Zakat</span>
          <CircleDollarSign className="h-4 w-4" />
        </Button>
      </div>
    </Modal>
  );
};
