import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";
import Topbar from "@/components/Topbar";

export default function DeliveryBoyList() {
  const navigate = useNavigate();
  const [boys, setBoys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/admin/delivery-boys");
        setBoys(Array.isArray(res.data) ? res.data : res.data.rows || []);
      } catch (err) {
        // fallback mock
        setBoys([{ id: 1, name: "Rahul", phone: "9000000001", is_active: true, deliveryBoyAssignments: [] }]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />
      <div className="flex">
        <div className="w-64"></div>
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold">Delivery Boys</h1>
              <p className="text-sm text-gray-500">List and assignments</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => navigate("/assign-colony")} className="px-4 py-2 rounded bg-indigo-600 text-white">Assign Colony</button>
              <button onClick={() => navigate("/assign-block")} className="px-4 py-2 rounded bg-emerald-600 text-white">Assign Block</button>
            </div>
          </div>

          {loading ? <div>Loading...</div> : (
            <div className="grid gap-4">
              {boys.map(b => (
                <div key={b.id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="text-lg font-semibold">{b.name}</div>
                      {b.is_active ? <span className="text-xs bg-green-100 text-green-700 px-2 rounded">Active</span> : <span className="text-xs bg-red-100 text-red-700 px-2 rounded">Inactive</span>}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{b.phone || b.email}</div>

                    <div className="text-sm text-gray-600 mt-3">
                      <div className="font-medium">Assigned</div>
                      {b.deliveryBoyAssignments && b.deliveryBoyAssignments.length ? (
                        <ul className="list-disc ml-5 mt-1 text-sm">
                          {b.deliveryBoyAssignments.map(a => (
                            <li key={a.id}>
                              {a.assignmentColony?.name ?? `Colony ${a.colony_id}`} {a.is_active ? "(active)" : "(inactive)"}
                            </li>
                          ))}
                        </ul>
                      ) : <div className="italic text-gray-400 mt-1">No assignments</div>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button onClick={() => navigate(`/assign-colony?boy=${b.id}`)} className="px-3 py-1 bg-indigo-600 text-white rounded">Assign</button>
                    <button onClick={() => navigate(`/assign-block/${b.id}`)} className="px-3 py-1 bg-gray-200 rounded">Assign Block</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
