import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

const App = () => {
  const token = sessionStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/signup"
          element={
            token ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Signup />
            )
          }
        />

        <Route element={<ProtectedRoute />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route element={<AdminRoute />}>
            <Route
              path="/admin"
              element={<Dashboard />}
            />
          </Route>

        </Route>

        <Route
          path="/"
          element={
            <Navigate
              to={token ? "/dashboard" : "/login"}
              replace
            />
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to={token ? "/dashboard" : "/login"}
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;