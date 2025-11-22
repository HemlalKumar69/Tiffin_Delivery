// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { useNavigate } from "react-router-dom";

// export default function Notifications() {
//     const navigate = useNavigate();

//     const [message, setMessage] = useState("");
//     const [targetType, setTargetType] = useState("subscription_expiry");
//     const [loading, setLoading] = useState(false);

//     const handleSend = async () => {
//         if (!message.trim()) {
//             alert("Please enter a message");
//             return;
//         }

//         setLoading(true);
//         setTimeout(() => {
//             setLoading(false);
//             alert("Notification Sent (UI Only)");
//             setMessage("");
//         }, 800);
//     };

//     return (
//         <div className="min-h-screen bg-linear-to-b from-white to-sky-50 p-6 sm:p-8">

//             {/* Header */}
//             <header className="mb-6 flex justify-between items-center">
//                 <Button
//                     onClick={() => navigate("/admin-dashboard")}
//                     className="bg-gray-600 hover:bg-gray-700 text-white rounded-xl shadow-md"
//                 >
//                     ← Back
//                 </Button>

//                 <h1 className="text-2xl font-bold text-sky-700">Notifications & Communication</h1>

//                 <div></div>
//             </header>

//             <Card className="rounded-2xl shadow-md max-w-3xl mx-auto">
//                 <CardContent className="p-6 flex flex-col gap-5">

//                     {/* Notification Type */}
//                     <div className="flex flex-col gap-2">
//                         <label className="text-sm font-medium">Notification Type</label>
//                         <select
//                             value={targetType}
//                             onChange={(e) => setTargetType(e.target.value)}
//                             className="border p-2 rounded-lg"
//                         >
//                             <option value="subscription_expiry">Subscription Expiry Alert</option>
//                             <option value="payment_due">Payment Due Reminder</option>
//                             <option value="delivery_update">Delivery Update</option>
//                             <option value="skip_approval">Skip Approval / Denial</option>
//                         </select>
//                     </div>

//                     {/* Message Box */}
//                     <div className="flex flex-col gap-2">
//                         <label className="text-sm font-medium">Message</label>
//                         <textarea
//                             rows="5"
//                             placeholder="Enter notification message..."
//                             value={message}
//                             onChange={(e) => setMessage(e.target.value)}
//                             className="border p-2 rounded-lg"
//                         ></textarea>
//                     </div>

//                     {/* Templates */}
//                     <div className="mt-3">
//                         <h3 className="text-sm font-semibold mb-2 text-sky-700">Quick Templates</h3>

//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                             <Button
//                                 onClick={() =>
//                                     setMessage("Your subscription is about to expire. Please renew soon.")
//                                 }
//                                 className="bg-sky-600 hover:bg-sky-700 text-white rounded-lg"
//                             >
//                                 Subscription Expiry
//                             </Button>

//                             <Button
//                                 onClick={() =>
//                                     setMessage("Your payment is pending. Please complete the due amount.")
//                                 }
//                                 className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
//                             >
//                                 Payment Reminder
//                             </Button>

//                             <Button
//                                 onClick={() =>
//                                     setMessage("Your meal is out for delivery. You will receive it shortly.")
//                                 }
//                                 className="bg-green-600 hover:bg-green-700 text-white rounded-lg"
//                             >
//                                 Delivery Update
//                             </Button>
//                             <Button
//                                 onClick={() =>
//                                     setMessage("Your skip request has been reviewed. Status: Approved/Denied.")
//                                 }
//                                 className="bg-orange-600 hover:bg-orange-700 text-white rounded-lg"
//                             >
//                                 Skip Approval / Denial
//                             </Button>
//                         </div>
//                     </div>

//                     {/* Send Button */}
//                     <div className="flex justify-end">
//                         <Button
//                             onClick={handleSend}
//                             disabled={loading}
//                             className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl shadow-md"
//                         >
//                             {loading ? "Sending..." : "Send Notification"}
//                         </Button>
//                     </div>

//                 </CardContent>
//             </Card>
//         </div>
//     );
// }


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function Notifications() {
    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [targetType, setTargetType] = useState("");
    const [sendTo, setSendTo] = useState("all_customers");
    const [specificId, setSpecificId] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!message.trim()) {
            alert("Please enter a message");
            return;
        }

        if ((sendTo === "specific_customer" || sendTo === "specific_delivery_boy") && !specificId.trim()) {
            alert("Please enter the ID");
            return;
        }

        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            alert("Notification Sent (UI Only)");
            setMessage("");
            setSpecificId("");
            setTargetType("");
        }, 800);
    };

    // --------------------------
    // ⭐ TEMPLATES HANDLER
    // --------------------------
    const applyTemplate = (type) => {
        const templates = {
            subscription_expiry: "Your subscription is about to expire. Please renew soon.",
            payment_due: "Your payment is pending. Please complete the due amount.",
            delivery_update: "Your meal is out for delivery. It will reach shortly.",
            skip_approval: "Your skip request has been reviewed. Status: Approved / Denied.",

            delivery_assignment: "You have been assigned a new delivery route.",
            route_update: "Your delivery route has been updated. Please check the app.",
            pickup_update: "A new pickup is assigned. Kindly proceed to the pickup point.",
            salary_status: "Your salary/payment status has been updated.",
        };

        setMessage(templates[type] || "");
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-white to-sky-50 p-6 sm:p-8">

            {/* Header */}
            <header className="mb-6 flex justify-between items-center">
                <Button
                    onClick={() => navigate("/admin-dashboard")}
                    className="bg-gray-600 hover:bg-gray-700 text-white rounded-xl shadow-md"
                >
                    ← Back
                </Button>

                <h1 className="text-2xl font-bold text-sky-700">Notifications & Communication</h1>

                <div></div>
            </header>

            <Card className="rounded-2xl shadow-md max-w-3xl mx-auto">
                <CardContent className="p-6 flex flex-col gap-6">

                    {/* Send To */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Send Notification To</label>
                        <select
                            value={sendTo}
                            onChange={(e) => setSendTo(e.target.value)}
                            className="border p-2 rounded-lg"
                        >
                            <option value="all_customers">All Customers</option>
                            <option value="specific_customer">Specific Customer (By ID)</option>
                            <option value="all_delivery_boys">All Delivery Boys</option>
                            <option value="specific_delivery_boy">Specific Delivery Boy (By ID)</option>
                        </select>
                    </div>

                    {/* Specific ID */}
                    {(sendTo === "specific_customer" || sendTo === "specific_delivery_boy") && (
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">
                                Enter {sendTo === "specific_customer" ? "Customer ID" : "Delivery Boy ID"}
                            </label>
                            <input
                                type="text"
                                placeholder="Enter ID..."
                                value={specificId}
                                onChange={(e) => setSpecificId(e.target.value)}
                                className="border p-2 rounded-lg"
                            />
                        </div>
                    )}

                    {/* Notification Type */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Notification Type</label>
                        <select
                            value={targetType}
                            onChange={(e) => {
                                setTargetType(e.target.value);
                                applyTemplate(e.target.value);
                            }}
                            className="border p-2 rounded-lg"
                        >
                            <option value="">-- Select Notification Type --</option>

                            {/* CUSTOMER OPTIONS */}
                            {(sendTo === "all_customers" || sendTo === "specific_customer") && (
                                <>
                                    <option value="subscription_expiry">Subscription Expiry Alert</option>
                                    <option value="payment_due">Payment Due Reminder</option>
                                    <option value="delivery_update">Delivery Update</option>
                                    <option value="skip_approval">Skip Approval / Denial</option>
                                </>
                            )}

                            {/* DELIVERY BOY OPTIONS */}
                            {(sendTo === "all_delivery_boys" || sendTo === "specific_delivery_boy") && (
                                <>
                                    <option value="delivery_assignment">New Delivery Assignment</option>
                                    <option value="route_update">Route Update</option>
                                    <option value="pickup_update">Order Pickup Update</option>
                                    <option value="salary_status">Salary / Payment Status</option>
                                </>
                            )}
                        </select>
                    </div>

                    {/* Message Box */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Message</label>
                        <textarea
                            rows="5"
                            placeholder="Enter notification message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="border p-2 rounded-lg"
                        ></textarea>
                    </div>

                    {/* Send Button */}
                    <div className="flex justify-end">
                        <Button
                            onClick={handleSend}
                            disabled={loading}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl shadow-md"
                        >
                            {loading ? "Sending..." : "Send Notification"}
                        </Button>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}
