import Button from "../../../components/button";
import { CheckCircleIcon } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const Modal = ({ isOpen, onClose, message }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-secondary-200 text-white text-center p-6 rounded-md shadow-lg max-w-sm w-full">
        <CheckCircleIcon className="size-16 mx-auto mb-3" />
        <p className="mb-4">{message}</p>

        <Button onClick={onClose}> Fechar</Button>
      </div>
    </div>
  );
};

export default Modal;
