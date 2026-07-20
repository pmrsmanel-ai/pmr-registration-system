import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Success from "./pages/Success";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import CheckResult from "./pages/CheckResult";
import GraduationLogin from "./pages/GraduationLogin";
import GraduationResult from "./pages/GraduationResult";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import VerifyParticipant from "./pages/VerifyParticipant";

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
        path="/graduation"
        element={<GraduationLogin />}
      />

      <Route
        path="/graduation/result"
        element={<GraduationResult />}
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
    path="/verify/:registration_number"
    element={<VerifyParticipant />}
/>

    </Routes>
  );
}

export default App;