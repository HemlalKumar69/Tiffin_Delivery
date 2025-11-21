// import { useEffect, useState } from "react";
// import areasSeed from "@/data/bhopal_areas.json";
// import Modal from "@/components/Modal";

// export default function ColonyManager() {
//   const [areas, setAreas] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editing, setEditing] = useState(null);
//   const [form, setForm] = useState({ area_id: "", area_name: "", blocks_text: "", pincode: "" });

//   useEffect(() => {
//     setAreas(areasSeed);
//   }, []);

//   const openCreate = () => {
//     setEditing(null);
//     setForm({ area_id: "", area_name: "", blocks_text: "", pincode: "" });
//     setShowModal(true);
//   };

//   const openEdit = (a) => {
//     setEditing(a);
//     setForm({ area_id: a.area_id, area_name: a.area_name, blocks_text: a.blocks.join(", "), pincode: a.pincode || "" });
//     setShowModal(true);
//   };

//   const save = () => {
//     const blocks = form.blocks_text.split(",").map(s => s.trim()).filter(Boolean);
//     if (!form.area_name) { alert("Area name required"); return; }
//     if (editing) {
//       setAreas(prev => prev.map(p => p.area_id === editing.area_id ? { ...p, area_name: form.area_name, blocks, pincode: form.pincode || null } : p));
//     } else {
//       const newArea = { area_id: form.area_id || form.area_name.toLowerCase().replace(/\s+/g,"_"), area_name: form.area_name, blocks, pincode: form.pincode || null, lat: null, lng: null };
//       setAreas(prev => [newArea, ...prev]);
//     }
//     setShowModal(false);
//   };

//   const remove = (id) => {
//     if (!confirm("Delete this area?")) return;
//     setAreas(prev => prev.filter(a => a.area_id !== id));
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Colonies / Areas</h1>
//         <button onClick={openCreate} className="px-4 py-2 bg-green-600 text-white rounded">+ Add Area</button>
//       </div>

//       <div className="grid gap-3">
//         {areas.map(a => (
//           <div key={a.area_id} className="p-3 border rounded flex justify-between items-start">
//             <div>
//               <div className="font-semibold">{a.area_name} <span className="text-xs text-gray-400 ml-2">({a.pincode || "no pincode"})</span></div>
//               <div className="text-sm text-gray-600 mt-1">Blocks: {a.blocks.join(", ")}</div>
//             </div>
//             <div className="flex gap-2">
//               <button onClick={() => openEdit(a)} className="px-3 py-1 bg-blue-600 text-white rounded">Edit</button>
//               <button onClick={() => remove(a.area_id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {showModal && (
//         <Modal onClose={() => setShowModal(false)}>
//           <h2 className="text-lg font-semibold mb-2">{editing ? "Edit Area" : "Create Area"}</h2>
//           <div className="flex flex-col gap-2">
//             <input placeholder="Area Name" value={form.area_name} onChange={(e)=>setForm({...form,area_name:e.target.value})} className="border p-2 rounded" />
//             <input placeholder="Area ID (optional)" value={form.area_id} onChange={(e)=>setForm({...form,area_id:e.target.value})} className="border p-2 rounded" />
//             <textarea placeholder="Blocks (comma separated)" value={form.blocks_text} onChange={(e)=>setForm({...form,blocks_text:e.target.value})} className="border p-2 rounded" />
//             <input placeholder="Pincode (optional)" value={form.pincode} onChange={(e)=>setForm({...form,pincode:e.target.value})} className="border p-2 rounded" />
//           </div>

//           <div className="flex justify-end gap-2 mt-4">
//             <button onClick={()=>setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
//             <button onClick={save} className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import bhopalAreas from "@/data/bhopal_areas.json";
import Topbar from "@/components/Topbar";

export default function ColonyManager() {
  const [areas, setAreas] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ colony: "", area: "", zoneText: "", blocksText: "" });

  useEffect(()=> setAreas(bhopalAreas), []);

  const openCreate = () => { setEdit(null); setForm({ colony: "", area: "", zoneText: "", blocksText: "" }); setOpen(true); };
  const openEdit = (col, areaObj) => { setEdit({col, area: areaObj}); setForm({ colony: col.colony, area: areaObj.area, zoneText: areaObj.zones.map(z=>z.zone).join(", "), blocksText: areaObj.zones.flatMap(z=>z.blocks).join(", ") }); setOpen(true); };

  const save = () => {
    // local save (UI only). For server, call POST/PUT /admin/areas
    if (!form.colony || !form.area) { alert("Colony and area required"); return; }
    if (edit) {
      setAreas(prev => prev.map(c => {
        if (c.colony !== edit.colony.colony) return c;
        return {
          ...c,
          areas: c.areas.map(a => a.area === edit.area.area ? { area: form.area, zones: [{ zone: form.zoneText || "Default", blocks: form.blocksText.split(",").map(s=>s.trim()).filter(Boolean) }] } : a)
        };
      }));
    } else {
      const existing = areas.find(a => a.colony === form.colony);
      if (existing) {
        existing.areas.push({ area: form.area, zones: [{ zone: form.zoneText || "Default", blocks: form.blocksText.split(",").map(s=>s.trim()).filter(Boolean) }] });
        setAreas([...areas]);
      } else {
        setAreas([{ colony: form.colony, areas: [{ area: form.area, zones: [{ zone: form.zoneText || "Default", blocks: form.blocksText.split(",").map(s=>s.trim()).filter(Boolean) }] }] }, ...areas]);
      }
    }
    setOpen(false);
  };

  const removeArea = (colonyName, areaName) => {
    if (!confirm("Delete area?")) return;
    setAreas(prev => prev.map(c => c.colony === colonyName ? { ...c, areas: c.areas.filter(a=>a.area !== areaName) } : c));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />
      <div className="flex">
        <div className="w-64"></div>
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <div><h1 className="text-2xl font-semibold">Colonies & Areas</h1><p className="text-sm text-gray-500">Add / Edit / Delete</p></div>
            <button onClick={openCreate} className="px-4 py-2 bg-green-600 text-white rounded">+ Add Area</button>
          </div>

          <div className="grid gap-4">
            {areas.map(c => (
              <div key={c.colony} className="bg-white p-4 rounded shadow-sm">
                <div className="flex justify-between items-center">
                  <div><div className="font-semibold">{c.colony}</div><div className="text-sm text-gray-500">Areas: {c.areas.length}</div></div>
                </div>
                <div className="mt-3 grid gap-2">
                  {c.areas.map(a => (
                    <div key={a.area} className="flex justify-between items-center border rounded p-2">
                      <div>
                        <div className="font-medium">{a.area}</div>
                        <div className="text-sm text-gray-500">Zones: {a.zones.map(z=>z.zone).join(", ")}</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={()=>openEdit(c,a)} className="px-3 py-1 bg-blue-600 text-white rounded">Edit</button>
                        <button onClick={()=>removeArea(c.colony,a.area)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {open && (
            <Modal onClose={()=>setOpen(false)}>
              <div>
                <h3 className="text-lg font-semibold mb-3">{edit ? "Edit Area" : "Create Area"}</h3>
                <div className="flex flex-col gap-3">
                  <input placeholder="Colony" value={form.colony} onChange={e=>setForm({...form,colony:e.target.value})} className="border p-2 rounded" />
                  <input placeholder="Area" value={form.area} onChange={e=>setForm({...form,area:e.target.value})} className="border p-2 rounded" />
                  <input placeholder="Zone (comma separated)" value={form.zoneText} onChange={e=>setForm({...form,zoneText:e.target.value})} className="border p-2 rounded" />
                  <input placeholder="Blocks (comma separated)" value={form.blocksText} onChange={e=>setForm({...form,blocksText:e.target.value})} className="border p-2 rounded" />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button onClick={()=>setOpen(false)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                  <button onClick={save} className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
                </div>
              </div>
            </Modal>
          )}
        </main>
      </div>
    </div>
  );
}
