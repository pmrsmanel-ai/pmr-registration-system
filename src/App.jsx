import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Success from "./pages/Success";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import CheckResult from "./pages/CheckResult";

import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
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
        path="/login"
        element={<Login />}
      />

      <Route
        path="/hasil"
        element={<CheckResult />}
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;