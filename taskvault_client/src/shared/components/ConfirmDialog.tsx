import Button from "@/shared/components/Button";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isLoading = false,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-surface rounded-2xl shadow-xl border border-border-default w-full max-w-sm max-h-[90vh] overflow-y-auto">
        <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 sticky top-0 bg-surface">
          <h2 className="text-base sm:text-lg font-themeFont font-bold text-primary mb-1 sm:mb-2">
            {title}
          </h2>
          <p className="text-muted font-bodyFont text-xs sm:text-sm">{message}</p>
        </div>

        <div className="border-t border-border-default px-4 sm:px-6 py-3 sm:py-4 flex gap-2 sm:gap-3">
          <Button
            variant="ghost"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 text-xs sm:text-sm"
          >
            {cancelLabel}
          </Button>
          <Button
            variant="error"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 text-xs sm:text-sm"
          >
            {isLoading ? "Processing..." : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
