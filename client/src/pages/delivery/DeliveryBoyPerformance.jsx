// import { useParams, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import api from "@/services/api";

// export default function DeliveryBoyPerformance() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [performance, setPerformance] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadPerformance();
//   }, []);

//   const loadPerformance = async () => {
//     try {
//       const res = await api.get(
//         `/admin/delivery-boys/${id}/performance?start_date=2024-01-01&end_date=2024-01-31`
//       );
//       setPerformance(res.data);
//     } catch (error) {
//       alert("Failed to fetch performance");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <p className="p-6">Loading performance...</p>;

//   return (
//     <div className="p-6 max-w-xl mx-auto">

//       {/* Back Button */}
//       <button
//         onClick={() => navigate("/delivery-boys")}
//         className="mb-4 bg-gray-600 hover:bg-gray-700 text-white px-4 py-1 rounded"
//       >
//         ← Back
//       </button>

//       <h1 className="text-2xl font-bold mb-4">Delivery Boy Performance</h1>

//       <div className="bg-gray-100 p-5 rounded-lg shadow">
//         <p className="text-lg"><strong>Total Deliveries:</strong> {performance.total_deliveries}</p>
//         <p className="text-lg"><strong>Delivered:</strong> {performance.delivered}</p>
//         <p className="text-lg"><strong>Pending:</strong> {performance.pending}</p>
//         <p className="text-lg"><strong>Skipped:</strong> {performance.skipped}</p>
//         <p className="text-lg"><strong>Success Rate:</strong> {performance.success_rate}%</p>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import api from "@/services/api";

export default function DeliveryBoyPerformance() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const boy = location.state; // boy object directly from list page

  const [start, setStart] = useState("2024-01-01");
  const [end, setEnd] = useState("2024-01-31");
  const [data, setData] = useState(null);

  const fetchPerformance = async () => {
    try {
      const res = await api.get(
        `/admin/delivery-boys/${id}/performance?start_date=${start}&end_date=${end}`
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
      alert("Error fetching performance");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/deliveryboy-list")}
        className="mb-4 bg-gray-600 text-white px-4 py-2 rounded"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-3">
        Delivery Boy Performance
      </h1>

      {/* BOY NAME */}
      <p className="text-lg font-medium text-indigo-600 mb-6">
        {boy ? `Name: ${boy.name}` : "Loading..."}
      </p>

      {/* DATE RANGE */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label>Start Date</label>
          <input
            type="date"
            className="border w-full p-2 rounded"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </div>
        <div>
          <label>End Date</label>
          <input
            type="date"
            className="border w-full p-2 rounded"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>
      </div>

      {/* FETCH BUTTON */}
      <button
        onClick={fetchPerformance}
        className="w-full bg-indigo-600 text-white py-2 rounded"
      >
        Fetch Performance
      </button>

      {/* PERFORMANCE RESULT */}
      {data && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg border">
          <p>Total Deliveries: <b>{data.total_deliveries}</b></p>
          <p>Delivered: <b>{data.delivered}</b></p>
          <p>Pending: <b>{data.pending}</b></p>
          <p>Skipped: <b>{data.skipped}</b></p>
          <p>Success Rate: <b>{data.success_rate}%</b></p>
        </div>
      )}
    </div>
  );
}
