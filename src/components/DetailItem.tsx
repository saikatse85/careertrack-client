interface Props {
  label: string;
  value?: string;
}

export default function DetailItem({ label, value }: Props) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>

      <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
        {value || "-"}
      </div>
    </div>
  );
}
