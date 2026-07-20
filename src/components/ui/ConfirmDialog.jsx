import { AlertTriangle } from "lucide-react";
import Button from "./Button";

function ConfirmDialog({

  open,

  title = "Konfirmasi",

  message = "Apakah Anda yakin ingin melanjutkan?",

  confirmText = "Ya",

  cancelText = "Batal",

  confirmVariant = "danger",

  loading = false,

  onConfirm,

  onCancel,

}) {

  if (!open) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl">

        <div className="flex flex-col items-center p-8 text-center">

          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">

            <AlertTriangle
              size={30}
              className="text-red-600"
            />

          </div>

          <h2 className="text-2xl font-bold text-gray-900">

            {title}

          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500">

            {message}

          </p>

        </div>

        <div className="flex gap-3 border-t border-gray-100 p-6">

          <Button
            variant="outline"
            fullWidth
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </Button>

          <Button
            variant={confirmVariant}
            fullWidth
            loading={loading}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>

        </div>

      </div>

    </div>

  );

}

export default ConfirmDialog;