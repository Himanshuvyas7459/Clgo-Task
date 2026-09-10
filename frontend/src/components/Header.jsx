import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const user = JSON.parse(
    sessionStorage.getItem("user") || "{}"
  );

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <button
          onClick={() => navigate("/dashboard")}
          className="text-xl font-bold text-slate-900"
        >
          User<span className="text-indigo-600">Manager</span>
        </button>

        <div className="flex items-center gap-4">

          <div className="hidden items-center gap-3 sm:flex">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">
                {user.fullName}
              </p>

              <p className="text-xs text-slate-500">
                {user.email}
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                user.role === "Admin"
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {user.role}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
          >
            Logout
          </button>

        </div>
      </div>
    </header>
  );
};

export default Header;