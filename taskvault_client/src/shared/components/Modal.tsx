import { ReactNode } from "react";
import Button from "@/shared/components/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onSubmit?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-2xl shadow-xl border border-border-default w-full max-w-md">
        <div className="px-6 pt-6 pb-4 border-b border-border-default">
          <h2 className="text-xl font-themeFont font-bold text-primary">
            {title}
          </h2>
        </div>

        <div className="p-6">{children}</div>

        <div className="border-t border-border-default px-6 py-4 flex gap-3">
          <Button variant="ghost" onClick={onClose} className="flex-1">
            {cancelLabel}
          </Button>
          {onSubmit && (
            <Button variant="primary" onClick={onSubmit} className="flex-1">
              {submitLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
