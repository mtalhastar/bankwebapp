"use client";

import { useEffect, useState } from "react";
import { SendHorizontal } from "lucide-react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  updatedTitle: string;
  setUpdatedTitle: React.Dispatch<React.SetStateAction<string>>;
}

export const UpdateModal: React.FC<UpdateModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading,
    updatedTitle,
    setUpdatedTitle
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
        title="Edit Question"
        description="Edit the existing question"
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
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
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