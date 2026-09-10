import { useEffect, useState } from "react";

const UserModal = ({ isOpen, onClose, onSubmit, editingUser }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  const isEditMode = Boolean(editingUser);

  useEffect(() => {
    if (editingUser) {
      setFormData({
        fullName: editingUser.fullName || "",
        email: editingUser.email || "",
        password: "",
        role: editingUser.role || "",
      });
    } else {
      setFormData({
        fullName: "",
        email: "",
        password: "",
        role: "",
      });
    }

    setErrors({});
  }, [editingUser, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    if (!isEditMode && !formData.password) {
      newErrors.password = "Password is required";
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const data = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      role: formData.role,
    };

    if (formData.password) {
      data.password = formData.password;
    }

    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {isEditMode ? "Edit User" : "Add User"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isEditMode
                ? "Update user account details"
                : "Create a new user account"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          
          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-indigo-200 ${
                errors.fullName
                  ? "border-red-400"
                  : "border-slate-300 focus:border-indigo-500"
              }`}
            />

            {errors.fullName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="user@example.com"
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-indigo-200 ${
                errors.email
                  ? "border-red-400"
                  : "border-slate-300 focus:border-indigo-500"
              }`}
            />

            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Password
              {isEditMode && (
                <span className="ml-2 font-normal text-slate-400">
                  (Optional)
                </span>
              )}
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={
                isEditMode
                  ? "Leave blank to keep current password"
                  : "Minimum 6 characters"
              }
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-indigo-200 ${
                errors.password
                  ? "border-red-400"
                  : "border-slate-300 focus:border-indigo-500"
              }`}
            />

            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-indigo-200 ${
                errors.role
                  ? "border-red-400"
                  : "border-slate-300 focus:border-indigo-500"
              }`}
            >
              <option value="">Select role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>

            {errors.role && (
              <p className="mt-1 text-xs text-red-500">
                {errors.role}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              {isEditMode ? "Update User" : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;