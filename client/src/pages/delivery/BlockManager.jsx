import { useState } from "react";
import bhopalAreas from "@/data/bhopal_areas.json";
import Topbar from "@/components/Topbar";

export default function BlockManager(){
  const [areas] = useState(bhopalAreas);
  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />
      <div className="flex">
        <div className="w-64"></div>
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Blocks & Zones</h1>
            <p className="text-sm text-gray-500">View and manage zones/blocks</p>
          </div>

          <div className="grid gap-4">
            {areas.map(col => (
              <div key={col.colony} className="bg-white p-4 rounded shadow-sm">
                <div className="font-semibold">{col.colony}</div>
                <div className="mt-2 space-y-2">
                  {col.areas.map(a => (
                    <div key={a.area} className="border p-2 rounded">
                      <div className="font-medium">{a.area}</div>
                      <div className="text-sm text-gray-600 mt-1">Zones:</div>
                      <ul className="ml-4 mt-1 list-disc text-sm text-gray-700">
                        {a.zones.map(z => <li key={z.zone}>{z.zone} — {z.blocks.join(", ")}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
