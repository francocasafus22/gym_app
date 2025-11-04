import React from "react";
import { X } from "lucide-react";
export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null; // No renderiza nada si no está abierto

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-xs flex justify-center items-center z-50"
      onClick={() => onClose()}
    >
      <div
        className="bg-primary border-1 border-border rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto  mx-5 relative flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-border hover:text-accent transition-colors duration-200"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {children}
      </div>
    </div>
  );
}
