export default function Confirm({ title="Confirm", text="Are you sure?", onCancel, onConfirm }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{text}</p>
      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
        <button onClick={onConfirm} className="px-4 py-2 rounded bg-red-600 text-white">Delete</button>
      </div>
    </div>
  );
}
