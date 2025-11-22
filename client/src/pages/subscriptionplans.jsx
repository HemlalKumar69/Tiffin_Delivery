// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";

// export default function SubscriptionPlans() {
//     const navigate = useNavigate();

//     const [showModal, setShowModal] = useState(false);

//     const [plans] = useState([
//         {
//             id: 1,
//             name: "15-Day Plan",
//             duration_day: 15,
//             skip_day: 2,
//             price: 1200,
//             description: "Basic meal plan for 15 days",
//             is_active: true,
//         },
//         {
//             id: 2,
//             name: "30-Day Plan",
//             duration_day: 30,
//             skip_day: 5,
//             price: 2200,
//             description: "Monthly tiffin plan",
//             is_active: true,
//         },
//     ]);

//     return (
//         <div className="min-h-screen bg-linear-to-b from-white to-sky-50 p-6 sm:p-8">

//             {/* HEADER */}
//             <header className="mb-6 flex justify-between items-center">

//                 {/* 🔙 BACK BUTTON */}
//                 <Button
//                     className="bg-gray-600 hover:bg-gray-700 text-white rounded-xl shadow-md"
//                     onClick={() => navigate("/admin-dashboard")}
//                 >
//                     ← Back
//                 </Button>

//                 <h1 className="text-2xl font-bold text-sky-700">Manage Plans</h1>

//                 {/* CREATE NEW PLAN BUTTON */}
//                 <Button
//                     className="bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md"
//                     onClick={() => setShowModal(true)}
//                 >
//                     + Create New Plan
//                 </Button>
//             </header>

//             {/* Plans Table */}
//             <Card className="rounded-2xl shadow-md">
//                 <CardContent className="p-4">
//                     <table className="w-full text-sm">
//                         <thead>
//                             <tr className="text-left border-b text-gray-600">
//                                 <th className="py-2">Name</th>
//                                 <th>Duration</th>
//                                 <th>Skip Days</th>
//                                 <th>Price (₹)</th>
//                                 <th>Status</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {plans.map((plan) => (
//                                 <tr key={plan.id} className="border-b">
//                                     <td className="py-2 font-medium text-sky-700">{plan.name}</td>
//                                     <td>{plan.duration_day} days</td>
//                                     <td>{plan.skip_day}</td>
//                                     <td>{plan.price}</td>

//                                     <td>
//                                         <span
//                                             className={`px-2 py-1 rounded-lg text-xs font-medium ${plan.is_active
//                                                     ? "bg-green-100 text-green-700"
//                                                     : "bg-red-100 text-red-600"
//                                                 }`}
//                                         >
//                                             {plan.is_active ? "Active" : "Inactive"}
//                                         </span>
//                                     </td>

//                                     {/* EDIT / DELETE BUTTONS */}
//                                     <td>
//                                         <div className="flex gap-2">
//                                             <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-lg">
//                                                 Edit
//                                             </Button>

//                                             <Button className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-lg">
//                                                 Delete
//                                             </Button>
//                                         </div>
//                                     </td>

//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </CardContent>
//             </Card>

//             {/* CREATE PLAN MODAL */}
//             {showModal && (
//                 <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
//                     <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6">

//                         <h2 className="text-xl font-bold text-sky-700 mb-4">
//                             Create New Subscription Plan
//                         </h2>

//                         <div className="flex flex-col gap-3">

//                             <input type="text" placeholder="Plan Name" className="border p-2 rounded-lg" />
//                             <input type="number" placeholder="Duration (days)" className="border p-2 rounded-lg" />
//                             <input type="number" placeholder="Skip Days" className="border p-2 rounded-lg" />
//                             <input type="number" placeholder="Price (₹)" className="border p-2 rounded-lg" />

//                             <textarea rows="3" placeholder="Description" className="border p-2 rounded-lg" />

//                             <select className="border p-2 rounded-lg">
//                                 <option value="true">Active</option>
//                                 <option value="false">Inactive</option>
//                             </select>

//                         </div>

//                         <div className="flex justify-end gap-3 mt-6">
//                             <Button
//                                 className="bg-gray-300 text-black px-4 py-2 rounded-lg"
//                                 onClick={() => setShowModal(false)}
//                             >
//                                 Cancel
//                             </Button>

//                             <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
//                                 Save Plan
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }



// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import api from "@/services/api";
// import { toast } from "sonner";

// export default function SubscriptionPlans() {
//     const navigate = useNavigate();

//     const [showModal, setShowModal] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [plans, setPlans] = useState([]);

//     const [formData, setFormData] = useState({
//         id: null,
//         name: "",
//         duration_days: "",
//         skip_days: "",
//         price: "",
//         description: "",
//         is_active: true,
//     });

//     const [isEditing, setIsEditing] = useState(false);

//     // 🔥 FETCH ALL PLANS
//     const loadPlans = async () => {
//         try {
//             const res = await api.get("/admin/subscription-plans");
//             setPlans(res.data.rows || []);
//         } catch (err) {
//             toast.error("Failed to load plans");
//         }
//     };

//     useEffect(() => {
//         loadPlans();
//     }, []);

//     // FORM CHANGE HANDLER
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     // 🔥 OPEN CREATE MODAL
//     const openCreateModal = () => {
//         setIsEditing(false);
//         setFormData({
//             id: null,
//             name: "",
//             duration_days: "",
//             skip_days: "",
//             price: "",
//             description: "",
//             is_active: true,
//         });
//         setShowModal(true);
//     };

//     // 🔥 OPEN EDIT MODAL
//     const openEditModal = (plan) => {
//         setIsEditing(true);
//         setFormData({
//             id: plan.id,
//             name: plan.name,
//             duration_day: plan.duration_days,
//             skip_day: plan.skip_days,
//             price: plan.price,
//             description: plan.description || "",
//             is_active: plan.is_active,
//         });
//         setShowModal(true);
//     };

//     // 🔥 SAVE (CREATE + EDIT)
//     const handleSave = async () => {
//         setLoading(true);

//         try {
//             if (isEditing) {
//                 // UPDATE PLAN
//                 await api.put(`/admin/subscription-plans/${formData.id}`, formData);
//                 toast.success("Plan updated successfully");
//             } else {
//                 // CREATE NEW PLAN
//                 await api.post("/admin/subscription-plans", formData);
//                 toast.success("Plan created successfully");
//             }

//             setShowModal(false);
//             loadPlans();
//         } catch (err) {
//             toast.error("Failed to save plan");
//         }

//         setLoading(false);
//     };

//     // 🔥 DELETE PLAN
//     const deletePlan = async (id) => {
//         if (!confirm("Are you sure you want to delete this plan?")) return;

//         try {
//             await api.delete(`/admin/subscription-plans/${id}`);
//             toast.success("Plan deleted");
//             loadPlans();
//         } catch (err) {
//             toast.error("Failed to delete");
//         }
//     };

//     return (
//         <div className="min-h-screen bg-linear-to-b from-white to-sky-50 p-6 sm:p-8">

//             {/* HEADER */}
//             <header className="mb-6 flex justify-between items-center">
//                 <Button
//                     className="bg-gray-600 hover:bg-gray-700 text-white rounded-xl shadow-md"
//                     onClick={() => navigate("/admin-dashboard")}
//                 >
//                     ← Back
//                 </Button>

//                 <h1 className="text-2xl font-bold text-sky-700">Manage Plans</h1>

//                 <Button
//                     className="bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md"
//                     onClick={openCreateModal}
//                 >
//                     + Create New Plan
//                 </Button>
//             </header>

//             {/* PLANS TABLE */}
//             <Card className="rounded-2xl shadow-md">
//                 <CardContent className="p-4">
//                     <table className="w-full text-sm">
//                         <thead>
//                             <tr className="text-left border-b text-gray-600">
//                                 <th className="py-2">Name</th>
//                                 <th>Duration</th>
//                                 <th>Skip Days</th>
//                                 <th>Price</th>
//                                 <th>Status</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {plans.map((plan) => (
//                                 <tr key={plan.id} className="border-b">
//                                     <td className="py-2 font-medium text-sky-700">{plan.name}</td>
//                                     <td>{plan.duration_days} days</td>
//                                     <td>{plan.skip_days}</td>
//                                     <td>₹{plan.price}</td>
//                                     <td>
//                                         <span
//                                             className={`px-2 py-1 rounded-lg text-xs font-medium ${
//                                                 plan.is_active
//                                                     ? "bg-green-100 text-green-700"
//                                                     : "bg-red-100 text-red-600"
//                                             }`}
//                                         >
//                                             {plan.is_active ? "Active" : "Inactive"}
//                                         </span>
//                                     </td>

//                                     <td>
//                                         <div className="flex gap-2">
//                                             <Button
//                                                 className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-lg"
//                                                 onClick={() => openEditModal(plan)}
//                                             >
//                                                 Edit
//                                             </Button>

//                                             <Button
//                                                 className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-lg"
//                                                 onClick={() => deletePlan(plan.id)}
//                                             >
//                                                 Delete
//                                             </Button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </CardContent>
//             </Card>

//             {/* MODAL */}
//             {showModal && (
//                 <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
//                     <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6">
//                         <h2 className="text-xl font-bold text-sky-700 mb-4">
//                             {isEditing ? "Edit Plan" : "Create New Subscription Plan"}
//                         </h2>

//                         <div className="flex flex-col gap-3">
//                             <input
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 type="text"
//                                 placeholder="Plan Name"
//                                 className="border p-2 rounded-lg"
//                             />

//                             <input
//                                 name="duration_days"
//                                 value={formData.duration_days}
//                                 onChange={handleChange}
//                                 type="number"
//                                 placeholder="Duration (days)"
//                                 className="border p-2 rounded-lg"
//                             />

//                             <input
//                                 name="skip_days"
//                                 value={formData.skip_days}
//                                 onChange={handleChange}
//                                 type="number"
//                                 placeholder="Skip Days"
//                                 className="border p-2 rounded-lg"
//                             />

//                             <input
//                                 name="price"
//                                 value={formData.price}
//                                 onChange={handleChange}
//                                 type="number"
//                                 placeholder="Price (₹)"
//                                 className="border p-2 rounded-lg"
//                             />

//                             <textarea
//                                 name="description"
//                                 rows="3"
//                                 value={formData.description}
//                                 onChange={handleChange}
//                                 placeholder="Description"
//                                 className="border p-2 rounded-lg"
//                             />

//                             <select
//                                 name="is_active"
//                                 value={formData.is_active}
//                                 onChange={handleChange}
//                                 className="border p-2 rounded-lg"
//                             >
//                                 <option value={true}>Active</option>
//                                 <option value={false}>Inactive</option>
//                             </select>
//                         </div>
//                         <div className="flex justify-end gap-3 mt-6">
//                             <Button
//                                 className="bg-gray-600 px-4 py-2 rounded-lg"
//                                 onClick={() => setShowModal(false)}
//                             >
//                                 Cancel
//                             </Button>

//                             <Button
//                                 className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
//                                 onClick={handleSave}
//                                 disabled={loading}
//                             >
//                                 {loading ? "Saving..." : "Save Plan"}
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }






import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/services/api";
import { toast } from "sonner";

export default function SubscriptionPlans() {
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [plans, setPlans] = useState([]);

    const [formData, setFormData] = useState({
        id: null,
        name: "",
        duration_days: "",
        skip_days: "",
        price: "",
        description: "",
        is_active: true,
    });

    const [isEditing, setIsEditing] = useState(false);

    // 🔥 FETCH ALL PLANS
    const loadPlans = async () => {
        try {
            const res = await api.get("/admin/subscription-plans");
            // backend returns { rows: [...] } per your earlier examples
            setPlans(res.data.rows || res.data || []);
        } catch (err) {
            toast.error("Failed to load plans");
        }
    };

    useEffect(() => {
        loadPlans();
    }, []);

    // FORM CHANGE HANDLER
    const handleChange = (e) => {
        const { name, value } = e.target;

        // convert is_active to boolean when select changes
        if (name === "is_active") {
            setFormData((prev) => ({
                ...prev,
                [name]: value === "true" || value === true,
            }));
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 🔥 OPEN CREATE MODAL
    const openCreateModal = () => {
        setIsEditing(false);
        setFormData({
            id: null,
            name: "",
            duration_days: "",
            skip_days: "",
            price: "",
            description: "",
            is_active: true,
        });
        setShowModal(true);
    };

    // 🔥 OPEN EDIT MODAL (FIXED: use correct keys)
    const openEditModal = (plan) => {
        setIsEditing(true);

        setFormData({
            id: plan.id,
            name: plan.name ?? "",
            // use the exact keys your backend/model expects
            duration_days: plan.duration_days ?? plan.duration_days ?? "",
            skip_days: plan.skip_days ?? plan.skip_days ?? "",
            price: plan.price ?? "",
            description: plan.description ?? "",
            is_active: typeof plan.is_active === "boolean" ? plan.is_active : !!plan.is_active,
        });

        setShowModal(true);
    };

    // 🔥 SAVE (CREATE + EDIT) — ensure correct payload types
    const handleSave = async () => {
        setLoading(true);

        try {
            // Prepare payload with correct keys and types
            const payload = {
                name: formData.name,
                duration_days: Number(formData.duration_days),
                skip_days: Number(formData.skip_days),
                price: Number(formData.price),
                description: formData.description,
                is_active: Boolean(formData.is_active),
            };

            if (isEditing) {
                // UPDATE PLAN
                await api.put(`/admin/subscription-plans/${formData.id}`, payload);
                toast.success("Plan updated successfully");
            } else {
                // CREATE NEW PLAN
                await api.post("/admin/subscription-plans", payload);
                toast.success("Plan created successfully");
            }

            setShowModal(false);
            loadPlans();
        } catch (err) {
            console.error(err);
            // Try to show helpful message if backend returns validation errors
            const msg = err?.response?.data?.message || "Failed to save plan";
            toast.error(msg);
        }

        setLoading(false);
    };

    // 🔥 DELETE PLAN
    const deletePlan = async (id) => {
        if (!confirm("Are you sure you want to delete this plan?")) return;

        try {
            await api.delete(`/admin/subscription-plans/${id}`);
            toast.success("Plan deleted");
            loadPlans();
        } catch (err) {
            toast.error("Failed to delete");
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-white to-sky-50 p-6 sm:p-8">

            {/* HEADER */}
            <header className="mb-6 flex justify-between items-center">
                <Button
                    className="bg-gray-600 hover:bg-gray-700 text-white rounded-xl shadow-md"
                    onClick={() => navigate("/admin-dashboard")}
                >
                    ← Back
                </Button>

                <h1 className="text-2xl font-bold text-sky-700">Manage Plans</h1>

                <Button
                    className="bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md"
                    onClick={openCreateModal}
                >
                    + Create New Plan
                </Button>
            </header>

            {/* PLANS TABLE */}
            <Card className="rounded-2xl shadow-md">
                <CardContent className="p-4">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left border-b text-gray-600">
                                <th className="py-2">Name</th>
                                <th>Duration</th>
                                <th>Skip Days</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {plans.map((plan) => (
                                <tr key={plan.id} className="border-b">
                                    <td className="py-2 font-medium text-sky-700">{plan.name}</td>
                                    <td>{plan.duration_days} days</td>
                                    <td>{plan.skip_days}</td>
                                    <td>₹{plan.price}</td>
                                    <td>
                                        <span
                                            className={`px-2 py-1 rounded-lg text-xs font-medium ${
                                                plan.is_active
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-600"
                                            }`}
                                        >
                                            {plan.is_active ? "Active" : "Inactive"}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="flex gap-2">
                                            <Button
                                                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-lg"
                                                onClick={() => openEditModal(plan)}
                                            >
                                                Edit
                                            </Button>

                                            <Button
                                                className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-lg"
                                                onClick={() => deletePlan(plan.id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
                    <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6">
                        <h2 className="text-xl font-bold text-sky-700 mb-4">
                            {isEditing ? "Edit Plan" : "Create New Subscription Plan"}
                        </h2>

                        <div className="flex flex-col gap-3">
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                type="text"
                                placeholder="Plan Name"
                                className="border p-2 rounded-lg"
                            />

                            <input
                                name="duration_days"
                                value={formData.duration_days}
                                onChange={handleChange}
                                type="number"
                                placeholder="Duration (days)"
                                className="border p-2 rounded-lg"
                            />

                            <input
                                name="skip_days"
                                value={formData.skip_days}
                                onChange={handleChange}
                                type="number"
                                placeholder="Skip Days"
                                className="border p-2 rounded-lg"
                            />

                            <input
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                type="number"
                                placeholder="Price (₹)"
                                className="border p-2 rounded-lg"
                            />

                            <textarea
                                name="description"
                                rows="3"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Description"
                                className="border p-2 rounded-lg"
                            />

                            <select
                                name="is_active"
                                value={String(formData.is_active)}
                                onChange={handleChange}
                                className="border p-2 rounded-lg"
                            >
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <Button
                                className="bg-gray-600 px-4 py-2 rounded-lg"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </Button>

                            <Button
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                                onClick={handleSave}
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save Plan"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
