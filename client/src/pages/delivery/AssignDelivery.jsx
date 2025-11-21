// import React, { useEffect, useState } from "react";
// import api from "../../services/api";

// const AssignDelivery = () => {
//   const [colonies, setColonies] = useState([]);
//   const [selectedColony, setSelectedColony] = useState("");

//   const [areas, setAreas] = useState([]);
//   const [selectedArea, setSelectedArea] = useState("");

//   const [zones, setZones] = useState([]);
//   const [selectedZone, setSelectedZone] = useState("");

//   const [deliveryBoys, setDeliveryBoys] = useState([]);
//   const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState("");

//   useEffect(() => {
//     fetchColonies();
//     fetchDeliveryBoys();
//   }, []);

//   const fetchColonies = async () => {
//     try {
//       const res = await api.get("/admin/colonies");
//       setColonies(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchDeliveryBoys = async () => {
//     try {
//       const res = await api.get("/admin/delivery-boys");
//       setDeliveryBoys(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleColonySelect = (colonyId) => {
//     setSelectedColony(colonyId);

//     const colony = colonies.find((c) => c.id == colonyId);
//     if (colony) {
//       setAreas(colony.areas || []);
//       setSelectedArea("");
//       setZones([]);
//       setSelectedZone("");
//     }
//   };

//   const handleAreaSelect = (areaId) => {
//     setSelectedArea(areaId);

//     const area = areas.find((a) => a.id == areaId);
//     if (area) {
//       setZones(area.zones || []);
//       setSelectedZone("");
//     }
//   };

//   const assignColony = async () => {
//     if (!selectedDeliveryBoy || !selectedColony || !selectedArea || !selectedZone) {
//       alert("Please select all fields!");
//       return;
//     }

//     try {
//       const res = await api.post("/admin/delivery-boys/assign", {
//         delivery_boy_id: selectedDeliveryBoy,
//         colony_id: selectedColony
//       });

//       alert("Assigned Successfully!");
//       console.log(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Assignment failed");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto bg-white p-6 mt-4 shadow-md rounded-lg">
//       <h2 className="text-2xl font-semibold mb-4 text-gray-700">
//         Assign Delivery Boy
//       </h2>

//       {/* Colony */}
//       <label className="block mb-2 font-medium text-gray-600">Select Colony</label>
//       <select
//         value={selectedColony}
//         onChange={(e) => handleColonySelect(e.target.value)}
//         className="border w-full p-2 rounded mb-4"
//       >
//         <option value="">-- Select Colony --</option>
//         {colonies.map((col) => (
//           <option key={col.id} value={col.id}>
//             {col.name} ({col.pincode})
//           </option>
//         ))}
//       </select>

//       {/* Area */}
//       <label className="block mb-2 font-medium text-gray-600">Select Area</label>
//       <select
//         value={selectedArea}
//         disabled={!areas.length}
//         onChange={(e) => handleAreaSelect(e.target.value)}
//         className="border w-full p-2 rounded mb-4 disabled:bg-gray-100"
//       >
//         <option value="">-- Select Area --</option>
//         {areas.map((a) => (
//           <option key={a.id} value={a.id}>
//             {a.name}
//           </option>
//         ))}
//       </select>

//       {/* Zone */}
//       <label className="block mb-2 font-medium text-gray-600">Select Zone</label>
//       <select
//         value={selectedZone}
//         disabled={!zones.length}
//         onChange={(e) => setSelectedZone(e.target.value)}
//         className="border w-full p-2 rounded mb-4 disabled:bg-gray-100"
//       >
//         <option value="">-- Select Zone --</option>
//         {zones.map((z) => (
//           <option key={z.id} value={z.id}>
//             {z.name}
//           </option>
//         ))}
//       </select>

//       {/* Delivery Boy */}
//       <label className="block mb-2 font-medium text-gray-600">Delivery Boy</label>
//       <select
//         value={selectedDeliveryBoy}
//         onChange={(e) => setSelectedDeliveryBoy(e.target.value)}
//         className="border w-full p-2 rounded mb-4"
//       >
//         <option value="">-- Select Delivery Boy --</option>
//         {deliveryBoys.map((db) => (
//           <option key={db.id} value={db.id}>
//             {db.name} - {db.phone}
//           </option>
//         ))}
//       </select>

//       <button
//         onClick={assignColony}
//         className="bg-indigo-600 hover:bg-indigo-700 text-white w-full p-3 rounded-md"
//       >
//         Assign Colony
//       </button>
//     </div>
//   );
// };

// export default AssignDelivery;


import areas from "@/data/bhopal_areas.json";
import { useState } from "react";

export default function AssignDeliveryBoys() {
  const [selectedArea, setSelectedArea] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Assign Delivery Boys</h1>

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
