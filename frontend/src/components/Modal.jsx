import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null; // No renderiza nada si no está abierto

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex justify-center items-center z-50">
      <div className="bg-primary border-1 border-border rounded-lg w-full max-w-xl p-20 pb-10 mx-5 relative flex flex-col justify-between">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          X
        </button>

        {children}
      </div>
    </div>
  );
}
