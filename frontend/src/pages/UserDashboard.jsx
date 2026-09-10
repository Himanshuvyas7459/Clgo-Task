const UserDashboard = () => {
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">

      <div className="mb-8">
        <p className="text-sm font-semibold tracking-wide text-indigo-600">
          USER DASHBOARD
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Welcome, {user.fullName} 👋
        </h1>

        <p className="mt-2 text-slate-500">
          Here's an overview of your account.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Account Name
          </p>

          <h2 className="mt-2 text-xl font-bold text-slate-900">
            {user.fullName}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Email Address
          </p>

          <h2 className="mt-2 break-all text-xl font-bold text-slate-900">
            {user.email}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Your Role
          </p>

          <span className="mt-3 inline-block rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            {user.role}
          </span>
        </div>

      </div>

      <div className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50 p-8">
        <h2 className="text-xl font-bold text-slate-900">
          Your Account
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          You are successfully authenticated. Your account is protected
          using JWT authentication and role-based access control.
        </p>
      </div>

    </main>
  );
};

export default UserDashboard;