export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-800"
          aria-label="Close"
        >
          ✕
        </button>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
