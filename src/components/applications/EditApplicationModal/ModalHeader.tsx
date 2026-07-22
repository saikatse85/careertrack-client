"use client";

interface Props {
  onClose: () => void;
}

export default function ModalHeader({ onClose }: Props) {
  return (
    <div className="flex items-center justify-between border-b px-6 py-4">
      <h2 className="text-lg text-gray-700 dark:text-white font-semibold">
        Edit Application
      </h2>

      <button
        onClick={onClose}
        className="text-gray-500 z-20 hover:text-black text-xl"
      >
        ×
      </button>
    </div>
  );
}
