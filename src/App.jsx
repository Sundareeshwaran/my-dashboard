import { Route, Routes } from "react-router";

import Dashboard from "./pages/dashboard";
import Error from "./pages/error";
import Layout from "./components/layout";
import Users from "./pages/users";
import Clients from "./pages/clients";
import Settings from "./pages/settings";
import Login from "./pages/login";

import ProtectedRoute from "./auth/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="clients" element={<Clients />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;
