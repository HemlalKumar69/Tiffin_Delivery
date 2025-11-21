import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between bg-white p-4 border-b">
      <div className="flex items-center gap-4">
        <button className="text-xl font-bold text-indigo-600" onClick={() => navigate("/admin-dashboard")}>Tiffin Admin</button>
        <div className="text-sm text-gray-600">Delivery Assignment</div>
      </div>
      <div className="flex items-center gap-3">
        <button className="px-3 py-1 rounded bg-gray-100">Help</button>
        <button className="px-3 py-1 rounded bg-red-500 text-white">Logout</button>
      </div>
    </div>
  );
}
