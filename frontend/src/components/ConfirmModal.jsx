import React from "react";

export default function ConfirmModal({ product, onCancel, onConfirm }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 transform transition-all animate-in fade-in zoom-in duration-200">
        <div className="flex flex-col items-center text-center">
          {/* Warning Icon */}
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-3xl mb-4">
            ⚠
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Delete Product?
          </h3>

          <p className="text-gray-600 mb-6">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-900">
              "{product.title}"
            </span>
            ? This action cannot be undone.
          </p>

          <div className="flex gap-3 w-full">
            <button
              className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg shadow-red-200 transition-all active:scale-95"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
