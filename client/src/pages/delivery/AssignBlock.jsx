// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "@/services/api";
// import areasSeed from "@/data/bhopal_areas.json";

// export default function AssignBlock() {
//   const navigate = useNavigate();
//   const { id } = useParams(); // delivery boy id from route
//   const [boys, setBoys] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [selectedBoy, setSelectedBoy] = useState(id ? Number(id) : "");
//   const [selectedArea, setSelectedArea] = useState("");
//   const [selectedBlocks, setSelectedBlocks] = useState([]);

//   useEffect(()=> {
//     setAreas(areasSeed);
//     (async () => {
//       try {
//         const res = await api.get("/admin/delivery-boys");
//         setBoys(Array.isArray(res.data) ? res.data : res.data.rows || []);
//       } catch (err) {
//         setBoys([{id:1,name:"Rahul"}, {id:2,name:"Sameer"}]);
//       }
//     })();
//   }, []);

//   useEffect(()=>{
//     setSelectedBlocks([]);
//   }, [selectedArea]);

//   const toggleBlock = (b) => setSelectedBlocks(prev => prev.includes(b) ? prev.filter(x=>x!==b) : [...prev, b]);

//   const save = async () => {
//     if (!selectedBoy || !selectedArea || !selectedBlocks.length) { alert("Select boy, area and at least one block."); return; }
//     try {
//       // Backend might expect colony assignment first; here we call assign endpoint per docs for colony level.
//       // If backend has a different endpoint for block-level assignment, update accordingly.
//       for (const block of selectedBlocks) {
//         // Example payload; your backend might support sending blocks array — adjust if needed.
//         const payload = { delivery_boy_id: Number(selectedBoy), colony_id: selectedArea, block_name: block };
//         await api.post("/admin/delivery-boys/assign", payload);
//       }
//       alert("Blocks assigned (server)");
//       navigate("/delivery-boys");
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Failed to assign blocks");
//     }
//   };

//   return (
//     <div className="p-6">
//       <button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-gray-600 text-white rounded">← Back</button>
//       <h1 className="text-2xl font-bold mb-3">Assign Blocks</h1>

//       <div className="max-w-2xl space-y-3">
//         <div>
//           <label className="block text-sm font-medium">Delivery Boy</label>
//           <select value={selectedBoy} onChange={(e)=>setSelectedBoy(Number(e.target.value))} className="border p-2 rounded w-full">
//             <option value="">Select Boy</option>
//             {boys.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Colony</label>
//           <select value={selectedArea} onChange={(e)=>setSelectedArea(e.target.value)} className="border p-2 rounded w-full">
//             <option value="">Select Colony</option>
//             {areas.map(a => <option key={a.area_id} value={a.area_id}>{a.area_name}</option>)}
//           </select>
//         </div>

//         {selectedArea && (
//           <div className="p-3 border rounded max-h-48 overflow-y-auto">
//             {areas.find(a => a.area_id === selectedArea).blocks.map(b => (
//               <label key={b} className="flex items-center gap-2 mb-1">
//                 <input type="checkbox" checked={selectedBlocks.includes(b)} onChange={()=>toggleBlock(b)} />
//                 <span className="ml-2">{b}</span>
//               </label>
//             ))}
//           </div>
//         )}

//         <div className="flex justify-end gap-2">
//           <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
//           <button onClick={save} className="px-4 py-2 bg-green-600 text-white rounded">Save Blocks</button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/services/api";
import bhopalAreas from "@/data/bhopal_areas.json";
import Topbar from "@/components/Topbar";

export default function AssignBlock() {
  const { id } = useParams(); // optional delivery boy id
  const navigate = useNavigate();
  const [boys, setBoys] = useState([]);
  const [selectedBoy, setSelectedBoy] = useState(id ? Number(id) : "");
  const [colony, setColony] = useState("");
  const [area, setArea] = useState("");
  const [zone, setZone] = useState("");
  const [blocks, setBlocks] = useState([]);
  const [selectedBlocks, setSelectedBlocks] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/admin/delivery-boys");
        setBoys(Array.isArray(res.data) ? res.data : res.data.rows || []);
      } catch {
        setBoys([{id:1,name:"Rahul"}]);
      }
    })();
  }, []);

  useEffect(() => {
    const c = bhopalAreas.find(x => x.colony === colony);
    const a = c?.areas.find(x => x.area === area);
    const z = a?.zones.find(x => x.zone === zone);
    setBlocks(z?.blocks || []);
    setSelectedBlocks([]);
  }, [colony, area, zone]);

  const toggle = (b) => setSelectedBlocks(prev => prev.includes(b) ? prev.filter(x=>x!==b) : [...prev, b]);

  const save = async () => {
    if (!selectedBoy || !colony || !area || !zone || !selectedBlocks.length) { alert("Select everything"); return; }
    try {
      // If backend expects blocks array in single payload:
      await api.post("/admin/delivery-boys/assign", { delivery_boy_id: Number(selectedBoy), colony_id: colony, area, zone, blocks: selectedBlocks });
      alert("Blocks assigned");
      navigate("/delivery-boys");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />
      <div className="flex">
        <div className="w-64"></div>
        <main className="flex-1 p-6">
          <div className="bg-white p-6 rounded-2xl shadow-md max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Assign Blocks</h2>
              <button onClick={()=>navigate(-1)} className="px-3 py-1 bg-gray-100 rounded">Back</button>
            </div>

            <div className="space-y-4">
              <select className="w-full border rounded px-3 py-2" value={selectedBoy} onChange={e=>setSelectedBoy(e.target.value)}>
                <option value="">Select Delivery Boy</option>
                {boys.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>

              <select className="w-full border rounded px-3 py-2" value={colony} onChange={e=>setColony(e.target.value)}>
                <option value="">Select Colony</option>
                {bhopalAreas.map(c => <option key={c.colony} value={c.colony}>{c.colony}</option>)}
              </select>

              {colony && (
                <select className="w-full border rounded px-3 py-2" value={area} onChange={e=>setArea(e.target.value)}>
                  <option value="">Select Area</option>
                  {bhopalAreas.find(c => c.colony === colony).areas.map(a => <option key={a.area} value={a.area}>{a.area}</option>)}
                </select>
              )}

              {area && (
                <select className="w-full border rounded px-3 py-2" value={zone} onChange={e=>setZone(e.target.value)}>
                  <option value="">Select Zone</option>
                  {bhopalAreas.find(c => c.colony === colony).areas.find(a => a.area === area).zones.map(z => <option key={z.zone} value={z.zone}>{z.zone}</option>)}
                </select>
              )}

              {blocks.length > 0 && (
                <div className="border rounded p-3 max-h-48 overflow-y-auto">
                  {blocks.map(b => (
                    <label key={b} className="flex items-center gap-2 mb-2">
                      <input type="checkbox" checked={selectedBlocks.includes(b)} onChange={()=>toggle(b)} />
                      <span>{b}</span>
                    </label>
                  ))}
                </div>
              )}

              <div className="flex justify-end gap-2">
                <button onClick={()=>navigate(-1)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                <button onClick={save} className="px-4 py-2 bg-indigo-600 text-white rounded">Save Blocks</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
