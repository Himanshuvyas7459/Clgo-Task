import Header from "../components/Header";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const Dashboard = () => {
  const role = sessionStorage.getItem("role");

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {role === "Admin" ? (
        <AdminDashboard />
      ) : (
        <UserDashboard />
      )}
    </div>
  );
};

export default Dashboard;