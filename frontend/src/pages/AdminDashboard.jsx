import { useEffect, useState } from "react";
import api from "../services/api";
import UserModal from "../components/UserModal";
const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/users");
      setUsers(response.data.users || []);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleAddUser = () => {
    setEditingUser(null);
    setError("");
    setMessage("");
    setModalOpen(true);
  };
  const handleEditUser = (user) => {
    setEditingUser(user);
    setError("");
    setMessage("");
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    if (actionLoading) return;
    setModalOpen(false);
    setEditingUser(null);
  };
  const handleSubmitUser = async (formData) => {
    try {
      setActionLoading(true);
      setError("");
      setMessage("");
      if (editingUser) {
        const response = await api.put(`/users/${editingUser._id}`, formData);
        setMessage(response.data.message || "User updated successfully");
      } else {
        const response = await api.post("/users", formData);
        setMessage(response.data.message || "User added successfully");
      }
      setModalOpen(false);
      setEditingUser(null);
      await fetchUsers();
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setActionLoading(false);
    }
  };
  const handleDeleteUser = async (user) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.fullName}?`,
    );
    if (!confirmed) return;
    try {
      setActionLoading(true);
      setError("");
      setMessage("");
      const response = await api.delete(`/users/${user._id}`);
      setMessage(response.data.message || "User deleted successfully");
      await fetchUsers();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete user");
    } finally {
      setActionLoading(false);
    }
  };
  const adminCount = users.filter((user) => user.role === "Admin").length;
  const userCount = users.filter((user) => user.role === "User").length;
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      {" "}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        {" "}
        <div>
          {" "}
          <p className="text-sm font-semibold tracking-wide text-indigo-600">
            {" "}
            ADMIN DASHBOARD{" "}
          </p>{" "}
          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            {" "}
            User Management{" "}
          </h1>{" "}
          <p className="mt-2 text-slate-500">
            {" "}
            Manage users, roles and account access.{" "}
          </p>{" "}
        </div>{" "}
        <button
          onClick={handleAddUser}
          disabled={actionLoading}
          className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-60"
        >
          {" "}
          + Add User{" "}
        </button>{" "}
      </div>{" "}
      {message && (
        <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {" "}
          {message}{" "}
        </div>
      )}{" "}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {" "}
          {error}{" "}
        </div>
      )}{" "}
      <div className="mb-6 grid gap-5 sm:grid-cols-3">
        {" "}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {" "}
          <p className="text-sm text-slate-500">Total Users</p>{" "}
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {" "}
            {users.length}{" "}
          </p>{" "}
        </div>{" "}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {" "}
          <p className="text-sm text-slate-500">Administrators</p>{" "}
          <p className="mt-2 text-3xl font-bold text-indigo-600">
            {" "}
            {adminCount}{" "}
          </p>{" "}
        </div>{" "}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {" "}
          <p className="text-sm text-slate-500">Regular Users</p>{" "}
          <p className="mt-2 text-3xl font-bold text-emerald-600">
            {" "}
            {userCount}{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {" "}
        <div className="border-b border-slate-200 px-6 py-5">
          {" "}
          <h2 className="font-bold text-slate-900"> All Users </h2>{" "}
          <p className="mt-1 text-sm text-slate-500">
            {" "}
            View and manage registered accounts.{" "}
          </p>{" "}
        </div>{" "}
        {loading ? (
          <div className="flex justify-center py-16">
            {" "}
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />{" "}
          </div>
        ) : users.length === 0 ? (
          <div className="py-16 text-center text-sm text-slate-500">
            {" "}
            No users found.{" "}
          </div>
        ) : (
          <div className="overflow-x-auto">
            {" "}
            <table className="w-full min-w-[750px]">
              {" "}
              <thead className="bg-slate-50">
                {" "}
                <tr>
                  {" "}
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {" "}
                    Name{" "}
                  </th>{" "}
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {" "}
                    Email{" "}
                  </th>{" "}
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {" "}
                    Role{" "}
                  </th>{" "}
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {" "}
                    Actions{" "}
                  </th>{" "}
                </tr>{" "}
              </thead>{" "}
              <tbody className="divide-y divide-slate-100">
                {" "}
                {users.map((user) => (
                  <tr key={user._id} className="transition hover:bg-slate-50">
                    {" "}
                    <td className="px-6 py-4">
                      {" "}
                      <div className="flex items-center gap-3">
                        {" "}
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                          {" "}
                          {user.fullName?.charAt(0).toUpperCase()}{" "}
                        </div>{" "}
                        <span className="text-sm font-semibold text-slate-900">
                          {" "}
                          {user.fullName}{" "}
                        </span>{" "}
                      </div>{" "}
                    </td>{" "}
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {" "}
                      {user.email}{" "}
                    </td>{" "}
                    <td className="px-6 py-4">
                      {" "}
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${user.role === "Admin" ? "bg-indigo-100 text-indigo-700" : "bg-emerald-100 text-emerald-700"}`}
                      >
                        {" "}
                        {user.role}{" "}
                      </span>{" "}
                    </td>{" "}
                    <td className="px-6 py-4">
                      {" "}
                      <div className="flex gap-2">
                        {" "}
                        <button
                          onClick={() => handleEditUser(user)}
                          disabled={actionLoading}
                          className="rounded-md bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 disabled:opacity-50"
                        >
                          {" "}
                          Edit{" "}
                        </button>{" "}
                        <button
                          onClick={() => handleDeleteUser(user)}
                          disabled={actionLoading}
                          className="rounded-md bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                        >
                          {" "}
                          Delete{" "}
                        </button>{" "}
                      </div>{" "}
                    </td>{" "}
                  </tr>
                ))}{" "}
              </tbody>{" "}
            </table>{" "}
          </div>
        )}{" "}
      </div>{" "}
      <UserModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitUser}
        editingUser={editingUser}
      />{" "}
    </main>
  );
};
export default AdminDashboard;
