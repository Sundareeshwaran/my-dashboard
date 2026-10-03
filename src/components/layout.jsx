import { NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "../auth/useAuth";

const Layout = () => {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();
  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md ${isActive ? "bg-primary text-foreground" : "text-primary-foreground hover:bg-sidebar-accent"}`;

  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="flex bg-white">
      <div className="flex flex-col h-screen bg-sidebar p-4 text-lg font-semibold text-foreground">
        <nav className="flex flex-1 max-w-3xs gap-2 flex-col h-screen bg-sidebar p-4 text-lg font-semibold text-foreground">
          {loading ? (
            <p>Loading user...</p>
          ) : user ? (
            <p className="text-primary-foreground">Welcome, {user.userName}</p>
          ) : (
            <p className="text-destructive">User not found</p>
          )}
          <hr className="my-4 border-border" />
          <NavLink to="/" end className={navLinkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/users" className={navLinkClass}>
            Users
          </NavLink>

          <NavLink to="/clients" className={navLinkClass}>
            Clients
          </NavLink>

          <NavLink to="/settings" className={navLinkClass}>
            Settings
          </NavLink>
        </nav>
        <button
          onClick={handleSignOut}
          className="border rounded-md px-4 py-2 bg-primary hover:font-bold hover:bg-primary/80 transition-colors"
        >
          Sign Out
        </button>
      </div>

      <main className="relative bg-background flex-2 rounded-3xl border shadow-2xl p-2 m-2">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
