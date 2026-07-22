"use client";

interface Props {
  onClose: () => void;
  onSubmit: () => void;
  loading: boolean;
}

export default function ModalFooter({ onClose, onSubmit, loading }: Props) {
  return (
    <div
      className="
      flex
      items-center
      justify-end
      gap-3
      border-t
      px-6
      py-4
    "
    >
      {/* Cancel Button */}

      <button
        type="button"
        onClick={onClose}
        disabled={loading}
        className="
    inline-flex
    items-center
    justify-center
    rounded-xl
    border
    border-gray-300
    bg-white
    px-5
    py-2.5
    text-sm
    font-medium
    text-gray-700
    transition-all
    duration-200
    hover:border-gray-400
    hover:bg-gray-100
    hover:text-gray-900
    focus:outline-none
    focus:ring-2
    focus:ring-indigo-500
    focus:ring-offset-2
    disabled:cursor-not-allowed
    disabled:opacity-50
    dark:border-gray-700
    dark:bg-gray-800
    dark:text-gray-200
    dark:hover:border-gray-600
    dark:hover:bg-gray-700
    dark:hover:text-white
    dark:focus:ring-offset-gray-900
  "
      >
        Cancel
      </button>

      {/* Update Button */}

      <button
        type="button"
        onClick={onSubmit}
        disabled={loading}
        className="
    inline-flex
    items-center
    justify-center
    rounded-xl
    bg-gradient-to-r
    from-indigo-600
    to-violet-600
    px-6
    py-2.5
    text-sm
    font-semibold
    text-white
    shadow-lg
    shadow-indigo-500/20
    transition-all
    duration-200
    hover:-translate-y-0.5
    hover:from-indigo-700
    hover:to-violet-700
    hover:shadow-xl
    hover:shadow-indigo-500/30
    focus:outline-none
    focus:ring-2
    focus:ring-indigo-500
    focus:ring-offset-2
    disabled:cursor-not-allowed
    disabled:opacity-50
    dark:focus:ring-offset-gray-900
  "
      >
        {loading ? "Updating..." : "Update Application"}
      </button>
    </div>
  );
}
