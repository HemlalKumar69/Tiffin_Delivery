// import { useEffect, useState } from "react";
// import api from "@/services/api";

// export default function CustomerList() {
//   const [customers, setCustomers] = useState([]);

//   useEffect(()=> {
//     (async () => {
//       try {
//         const res = await api.get("/admin/users");
//         setCustomers(res.data.rows || []);
//       } catch (err) {
//         setCustomers([{ id:1, name:"Test Customer", email:"test@example.com", address:"Somewhere" }]);
//       }
//     })();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Customers</h1>
//       <div className="grid gap-3">
//         {customers.map(c => (
//           <div key={c.id} className="p-3 border rounded flex justify-between items-center">
//             <div>
//               <div className="font-semibold">{c.name}</div>
//               <div className="text-xs text-gray-600">{c.email}</div>
//               <div className="text-sm text-gray-500">{c.address}</div>
//             </div>
//             <div className="text-sm text-gray-500">{c.role}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import api from "@/services/api";
import Topbar from "@/components/Topbar";

export default function CustomerList(){
  const [customers, setCustomers] = useState([]);
  useEffect(()=> {
    (async ()=> {
      try {
        const res = await api.get("/admin/users");
        setCustomers(res.data.rows || []);
      } catch {
        setCustomers([{ id:1, name:"Test Customer", email:"test@example.com", address:"Sample address" }]);
      }
    })();
  },[]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />
      <div className="flex">
        <div className="w-64"></div>
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-semibold mb-4">Customers</h1>
          <div className="grid gap-3">
            {customers.map(c => (
              <div key={c.id} className="bg-white p-4 rounded shadow-sm flex justify-between items-center">
                <div>
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-sm text-gray-500">{c.email}</div>
                  <div className="text-xs text-gray-400">{c.address}</div>
                </div>
                <div className="text-sm text-gray-500">{c.role}</div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
