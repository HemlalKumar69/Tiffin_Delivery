import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const item = (to, label) => (
    <NavLink
      to={to}
      className={({isActive}) => `block px-4 py-2 rounded-lg ${isActive? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
    >
      {label}
    </NavLink>
  );

  return (
    <aside className="w-64 bg-white border-r p-4 min-h-screen">
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-1">Admin</div>
        <div className="font-semibold text-lg">Tiffin Panel</div>
      </div>

      <nav className="flex flex-col gap-2">
        {item("/delivery-boys", "Delivery Boys")}
        {item("/colonies", "Colonies")}
        {item("/blocks", "Blocks")}
        {item("/assign-colony", "Assign Colony")}
        {item("/assign-block", "Assign Block")}
        {item("/assignments", "Assignments")}
        {item("/customers", "Customers")}
      </nav>
    </aside>
  );
}
