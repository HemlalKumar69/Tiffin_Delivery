// import React, { useEffect, useState } from "react";
// import api from "../../services/api";
// import bhopalAreas from "../../data/bhopal_areas.json";
// import { useNavigate } from "react-router-dom";

// export default function AssignColony() {
//   const navigate = useNavigate();

//   const [deliveryBoys, setDeliveryBoys] = useState([]);
//   const [selectedBoy, setSelectedBoy] = useState("");

//   const [selectedColony, setSelectedColony] = useState("");
//   const [selectedArea, setSelectedArea] = useState("");
//   const [selectedZone, setSelectedZone] = useState("");
//   const [selectedBlock, setSelectedBlock] = useState("");

//   const [areas, setAreas] = useState([]);
//   const [zones, setZones] = useState([]);
//   const [blocks, setBlocks] = useState([]);

//   useEffect(() => {
//     api.get("/admin/delivery-boys").then((res) => {
//       setDeliveryBoys(res.data || []);
//     });
//   }, []);

//   // Colony → Areas
//   useEffect(() => {
//     const colonyData = bhopalAreas.find(
//       (col) => col.colony === selectedColony
//     );
//     setAreas(colonyData?.areas || []);
//     setSelectedArea("");
//     setSelectedZone("");
//     setSelectedBlock("");
//     setZones([]);
//     setBlocks([]);
//   }, [selectedColony]);

//   // Area → Zones
//   useEffect(() => {
//     const areaData = areas.find((a) => a.area === selectedArea);
//     setZones(areaData?.zones || []);
//     setSelectedZone("");
//     setSelectedBlock("");
//     setBlocks([]);
//   }, [selectedArea]);

//   // Zone → Blocks
//   useEffect(() => {
//     const zoneData = zones.find((z) => z.zone === selectedZone);
//     setBlocks(zoneData?.blocks || []);
//     setSelectedBlock("");
//   }, [selectedZone]);

//   const handleAssign = async () => {
//     if (!selectedBoy || !selectedColony || !selectedBlock) {
//       alert("Please select Delivery Boy, Colony & Block");
//       return;
//     }

//     await api.post("/admin/delivery-boys/assign", {
//       delivery_boy_id: selectedBoy,
//       colony_id: selectedColony,
//       area: selectedArea,
//       zone: selectedZone,
//       block: selectedBlock,
//     });

//     alert("Assigned Successfully!");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
      
//       {/* Header Section */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-semibold text-gray-800">
//           Assign Delivery Area
//         </h1>

//         <button
//           onClick={() => navigate(-1)}
//           className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg shadow-sm"
//         >
//           ← Back
//         </button>
//       </div>

//       {/* Card */}
//       <div className="bg-white p-6 rounded-2xl shadow-md max-w-3xl mx-auto border border-gray-100">
        
//         {/* Delivery Boy */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-1">
//             Delivery Boy
//           </label>
//           <select
//             className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
//             value={selectedBoy}
//             onChange={(e) => setSelectedBoy(e.target.value)}
//           >
//             <option value="">Select Delivery Boy</option>
//             {deliveryBoys.map((boy) => (
//               <option key={boy.id} value={boy.id}>
//                 {boy.name} • {boy.phone}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Colony */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-1">
//             Colony
//           </label>
//           <select
//             className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
//             value={selectedColony}
//             onChange={(e) => setSelectedColony(e.target.value)}
//           >
//             <option value="">Select Colony</option>
//             {bhopalAreas.map((c, i) => (
//               <option key={i} value={c.colony}>
//                 {c.colony}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Area */}
//         {areas.length > 0 && (
//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-1">
//               Area
//             </label>
//             <select
//               className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
//               value={selectedArea}
//               onChange={(e) => setSelectedArea(e.target.value)}
//             >
//               <option value="">Select Area</option>
//               {areas.map((a, i) => (
//                 <option key={i} value={a.area}>
//                   {a.area}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {/* Zone */}
//         {zones.length > 0 && (
//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-1">
//               Zone
//             </label>
//             <select
//               className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
//               value={selectedZone}
//               onChange={(e) => setSelectedZone(e.target.value)}
//             >
//               <option value="">Select Zone</option>
//               {zones.map((z, i) => (
//                 <option key={i} value={z.zone}>
//                   {z.zone}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {/* Block */}
//         {blocks.length > 0 && (
//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-1">
//               Block
//             </label>

//             <select
//               className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
//               value={selectedBlock}
//               onChange={(e) => setSelectedBlock(e.target.value)}
//             >
//               <option value="">Select Block</option>
//               {blocks.map((b, i) => (
//                 <option key={i} value={b}>
//                   {b}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {/* Save Button */}
//         <button
//           onClick={handleAssign}
//           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl shadow-md"
//         >
//           Assign Delivery Area
//         </button>
//       </div>
//     </div>
//   );
// }


import areas from "@/data/bhopal_areas.json";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AssignDeliveryBoys() {
  const navigate = useNavigate();
  const [selectedArea, setSelectedArea] = useState(null);

  return (
    <div className="p-6">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700"
      >
        ← Back
      </button>

      {/* PAGE TITLE */}
      <h1 className="text-xl font-bold mb-4">Assign Delivery Boys </h1>

      {/* AREA DROPDOWN */}
      <label className="font-medium">Select Colony / Area</label>
      <select
        className="border p-2 rounded w-full mb-4"
        onChange={(e) =>
          setSelectedArea(areas.find((a) => a.area_id === e.target.value))
        }
        defaultValue=""
      >
        <option value="" disabled>Select Area</option>
        {areas.map((area) => (
          <option key={area.area_id} value={area.area_id}>
            {area.area_name}
          </option>
        ))}
      </select>

      {/* BLOCKS SHOW */}
      {selectedArea && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h2 className="text-md font-semibold">
            Blocks in {selectedArea.area_name}
          </h2>

          <ul className="list-disc ml-6 mt-2">
            {selectedArea.blocks.map((b, idx) => (
              <li key={idx}>{b}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
