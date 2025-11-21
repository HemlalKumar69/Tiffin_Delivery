// import { useEffect, useState } from "react";
// import api from "@/services/api";

// export default function Assignments() {
//   const [assignments, setAssignments] = useState([]);

//   useEffect(()=> {
//     (async () => {
//       try {
//         const res = await api.get("/admin/delivery-boys/assignments");
//         setAssignments(res.data || []);
//       } catch (err) {
//         // fallback mock
//         setAssignments([
//           { id: 1, delivery_boy: { name: "Rahul" }, area_name: "Arera Colony", blocks: ["E-1","E-2"] }
//         ]);
//       }
//     })();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Assignments</h1>
//       <div className="grid gap-3">
//         {assignments.map(a => (
//           <div key={a.id} className="p-3 border rounded flex justify-between items-center">
//             <div>
//               <div className="font-semibold">{a.area_name}</div>
//               <div className="text-sm text-gray-600">Blocks: {a.blocks?.join ? a.blocks.join(", ") : (a.blocks || []).toString()}</div>
//             </div>
//             <div className="text-sm">{a.delivery_boy?.name}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import api from "@/services/api";
import Topbar from "@/components/Topbar";

export default function Assignments(){
  const [items, setItems] = useState([]);
  useEffect(()=> {
    (async ()=> {
      try {
        const res = await api.get("/admin/delivery-boys/assignments");
        setItems(res.data || []);
      } catch {
        setItems([{ id:1, delivery_boy: { name: "Rahul" }, area_name: "Arera Colony", blocks: ["E-1","E-2"] }]);
      }
    })();
  },[]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />
      <div className="flex">
        <div className="w-64"></div>
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-semibold mb-4">Assignments</h1>
          <div className="grid gap-3">
            {items.map(a => (
              <div key={a.id} className="bg-white p-4 rounded shadow-sm flex justify-between items-center">
                <div>
                  <div className="font-semibold">{a.area_name}</div>
                  <div className="text-sm text-gray-500">Blocks: {Array.isArray(a.blocks) ? a.blocks.join(", ") : (a.blocks || "").toString()}</div>
                </div>
                <div className="text-sm">{a.delivery_boy?.name}</div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
