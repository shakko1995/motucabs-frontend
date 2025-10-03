
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AdminContext } from "../context/AdminContext";
import { ArrowRight, X } from "lucide-react";

const statusOptions = ["Pending", "Confirmed", "Cancelled", "Completed"];

const AllBookingsTable = () => {
    const { adminToken } = useContext(AdminContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null); // modal state

    const statusColors = {
        Pending: "bg-yellow-200 text-yellow-800",
        Confirmed: "bg-green-200 text-green-800",
        Cancelled: "bg-red-200 text-red-800",
        Completed: "bg-blue-200 text-blue-800",
    };


    // Fetch all bookings
    const fetchBookings = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/admin/bookings", {
                headers: { Authorization: `Bearer ${adminToken}` },
            });
            if (res.data.success) setBookings(res.data.bookings);
        } catch (err) {
            console.error(err);
            alert("Failed to fetch bookings");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    // Status update
    const handleStatusChange = async (bookingId, status) => {
        try {
            const res = await axios.patch(
                `http://localhost:5000/api/admin/bookings/${bookingId}/status`,
                { status },
                { headers: { Authorization: `Bearer ${adminToken}` } }
            );
            if (res.data.success) {
                // update state directly
                setBookings((prev) =>
                    prev.map((b) => (b._id === bookingId ? { ...b, status } : b))
                );
                if (selectedBooking && selectedBooking._id === bookingId) {
                    setSelectedBooking({ ...selectedBooking, status });
                }
            }
        } catch (err) {
            console.error(err);
            alert("Failed to update status");
        }
    };

    if (loading) return <div className="text-center p-10">Loading...</div>;

    return (
        <div className="overflow-x-auto bg-white shadow-lg rounded-2xl p-4">
            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-3 border">Booking ID</th>
                        <th className="p-3 border">User</th>
                        <th className="p-3 border">Trip</th>
                        <th className="p-3 border">Pickup Date</th>
                        <th className="p-3 border">Vehicle</th>
                        <th className="p-3 border">Amount Paid</th>
                        <th className="p-3 border">Status</th>
                        <th className="p-3 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((b) => (
                        <tr key={b._id} className="hover:bg-gray-50">
                            <td className="p-3 border font-mono text-sm">{b._id}</td>
                            <td className="p-3 border">{b.travellerDetails?.fullName}</td>
                            <td className="p-3 border">
                                {b.tripDetails?.from} → {b.tripDetails?.to}
                            </td>
                            <td className="p-3 border">{b.tripDetails?.pickupDate}</td>
                            <td className="p-3 border">
                                {b.packageDetails?.car ||
                                    b.packageDetails?.fleet ||
                                    b.packageDetails?.vehicleType}
                            </td>
                            <td className="p-3 border">₹{b.paymentDetails?.amountPaid}</td>
                            <td className="p-3 border">
                                <select
                                    value={b.status}
                                    onChange={(e) => handleStatusChange(b._id, e.target.value)}
                                    className={`border rounded px-2 py-1 font-semibold ${statusColors[b.status]}`}
                                >
                                    {statusOptions.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </td>

                            <td className="p-3 border">
                                <button
                                    onClick={() => setSelectedBooking(b)}
                                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm flex items-center gap-1"
                                >
                                    View <ArrowRight size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Booking Details Modal */}
            {selectedBooking && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl p-6 relative">
                        <button
                            onClick={() => setSelectedBooking(null)}
                            className="absolute top-3 right-3 text-gray-600 hover:text-black"
                        >
                            <X size={24} />
                        </button>
                        <h2 className="text-xl font-bold mb-4">Booking Details</h2>
                        <div className="space-y-3">
                            <p><b>Booking ID:</b> {selectedBooking._id}</p>
                            <p><b>User:</b> {selectedBooking.travellerDetails?.fullName}</p>
                            <p><b>Trip:</b> {selectedBooking.tripDetails?.from} → {selectedBooking.tripDetails?.to}</p>
                            <p><b>Pickup Date:</b> {selectedBooking.tripDetails?.pickupDate}</p>
                            <p><b>Vehicle:</b> {selectedBooking.packageDetails?.car || selectedBooking.packageDetails?.fleet || selectedBooking.packageDetails?.vehicleType}</p>
                            <p><b>Amount Paid:</b> ₹{selectedBooking.paymentDetails?.amountPaid}</p>
                            <p>
                                <b>Status:</b>{" "}
                                <select
                                    value={selectedBooking.status}
                                    onChange={(e) =>
                                        handleStatusChange(selectedBooking._id, e.target.value)
                                    }
                                    className="border rounded px-2 py-1"
                                >
                                    {statusOptions.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </p>
                            <p><b>Created At:</b> {new Date(selectedBooking.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllBookingsTable;

