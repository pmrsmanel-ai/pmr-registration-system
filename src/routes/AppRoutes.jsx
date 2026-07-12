import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Register from "../pages/Register";
import Success from "../pages/Success";
import CheckResult from "../pages/CheckResult";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "../components/auth/ProtectedRoute";

function AppRoutes() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/success"
        element={<Success />}
      />

      <Route
  path="/check-result"
  element={<CheckResult />}
/>

      <Route
        path="/login"
        element={<Login />}
      />

      <Route

        path="/admin"

        element={

          <ProtectedRoute>

            <Admin />

          </ProtectedRoute>

        }

      />

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>

  );

}

export default AppRoutes;