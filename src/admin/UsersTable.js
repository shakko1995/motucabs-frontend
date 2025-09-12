// src/admin/UsersTable.js
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AdminContext } from "../context/AdminContext";

export default function UsersTable() {
  const { adminToken } = useContext(AdminContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${adminToken}` },
      })
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.error(err));
  }, [adminToken]);

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">Users</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="p-2 border">{u.name}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">{u.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
