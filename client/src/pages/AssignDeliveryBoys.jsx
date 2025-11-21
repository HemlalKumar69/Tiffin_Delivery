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
