"use client";

import { useEffect, useState } from "react";
import { SendHorizontal } from "lucide-react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  newQuestion: string;
  setNewQuestion: React.Dispatch<React.SetStateAction<string>>;
}

export const AddModal: React.FC<AddModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  newQuestion,
  setNewQuestion,
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
      title="Add Question"
      description="Add a new question to the list"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex items-center space-x-4">
        <div className="grid flex-1 gap-2">
          <Label htmlFor="link" className="sr-only">
            Link
          </Label>
          <Input
            id="link"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Type your question here"
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
