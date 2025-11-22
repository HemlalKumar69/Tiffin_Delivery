// import { useEffect, useState } from "react";
// import api from "@/services/api";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";

// export default function DeliveryBoyList() {
//   const [boys, setBoys] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     loadDeliveryBoys();
//   }, []);

//   const loadDeliveryBoys = async () => {
//     try {
//       const res = await api.get("/admin/delivery-boys");
//       setBoys(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load delivery boys");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="p-6 min-h-screen bg-sky-50">

//       {/* Back Button */}
//       <Button
//         onClick={() => navigate("/admin-dashboard")}
//         className="mb-4 bg-gray-600 hover:bg-gray-700 text-white"
//       >
//         ← Back
//       </Button>

//       <h1 className="text-2xl font-bold text-sky-700 mb-6">
//         Delivery Boy List
//       </h1>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {boys.map((boy) => (
//             <div key={boy.id} className="bg-white shadow-md rounded-xl p-4">
//               <h2 className="text-lg font-semibold text-indigo-600">{boy.name}</h2>

//               <p className="text-gray-600 text-sm mt-1">{boy.email}</p>
//               <p className="text-gray-600 text-sm">{boy.phone}</p>
//               <p className="text-gray-500 text-xs mt-1">{boy.address}</p>

//               <div className="flex justify-end mt-3">
//                 <button
//                   onClick={() => navigate(`/delivery-boy-performance/${boy.id}`, {state: boy})}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
//                 >
//                   Performance
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function DeliveryBoyList() {
  const [boys, setBoys] = useState([]);
  const [loading, setLoading] = useState(true);

  // Popup States
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBoy, setSelectedBoy] = useState(null);
  const [performance, setPerformance] = useState(null);

  // Date Range
  const [start, setStart] = useState("2024-01-01");
  const [end, setEnd] = useState("2024-01-31");

  const navigate = useNavigate();

  useEffect(() => {
    getBoys();
  }, []);

  // Fetch Delivery Boys
  const getBoys = async () => {
    try {
      const res = await api.get("/admin/delivery-boys");
      setBoys(res.data);
    } catch (err) {
      alert("Failed to load delivery boys");
    }
    setLoading(false);
  };

  // Fetch performance
  const fetchPerformance = async () => {
    try {
      const res = await api.get(
        `/admin/delivery-boys/${selectedBoy.id}/performance?start_date=${start}&end_date=${end}`
      );
      setPerformance(res.data);
    } catch (err) {
      alert("Unable to fetch performance");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-sky-50">

      {/* Back Button */}
      <Button
        onClick={() => navigate("/admin-dashboard")}
        className="mb-4 bg-gray-700 text-white"
      >
        ← Back
      </Button>

      <h1 className="text-2xl font-bold text-indigo-700 mb-6">Delivery Boy List</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-3 py-2 text-left">Number</th>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Email</th>
                <th className="px-3 py-2 text-left">Phone</th>
                <th className="px-3 py-2 text-left">Address</th>
                <th className="px-3 py-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {boys.map((boy, index) => (
                <tr key={boy.id} className="border-b hover:bg-gray-100">
                  <td className="px-3 py-2">{index + 1}</td>
                  <td className="px-3 py-2 font-semibold">{boy.name}</td>
                  <td className="px-3 py-2">{boy.email}</td>
                  <td className="px-3 py-2">{boy.phone}</td>
                  <td className="px-3 py-2">{boy.address}</td>

                  <td className="px-3 py-2 text-center">
                    <button
                      onClick={() => {
                        setSelectedBoy(boy);
                        setPerformance(null);
                        setShowPopup(true);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    >
                      Performance
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

      {/* ====================== PERFORMANCE POPUP ====================== */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-30 flex items-center justify-center z-50"
        onClick={() => setShowPopup(false)}
        >
        
          <div className="bg-white w-[380px] p-6 rounded-xl shadow-xl relative"
          onClick={(e) => e.stopPropagation()} 
          >

            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-3 text-xl text-gray-500"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-xl font-bold text-indigo-700 mb-4 text-center">
            Performance :- {" "} {selectedBoy?.name} 
            </h2>

            {/* Date Inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm">Start Date</label>
                <input
                  type="date"
                  className="border p-2 w-full rounded"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm">End Date</label>
                <input
                  type="date"
                  className="border p-2 w-full rounded"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </div>
            </div>

            {/* Fetch Btn */}
            <Button
              onClick={fetchPerformance}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Fetch Performance
            </Button>

            {/* Performance Result */}
            {performance && (
              <div className="mt-5 bg-gray-100 p-4 rounded border text-sm">
                <p>Total Deliveries: <b>{performance.total_deliveries}</b></p>
                <p>Delivered: <b>{performance.delivered}</b></p>
                <p>Pending: <b>{performance.pending}</b></p>
                <p>Skipped: <b>{performance.skipped}</b></p>
                <p>Success Rate: <b>{performance.success_rate}%</b></p>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

