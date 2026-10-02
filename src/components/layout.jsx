import { NavLink, Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="flex bg-white">
      <nav className="flex flex-1 max-w-3xs gap-2 flex-col h-screen bg-sidebar p-4 text-lg font-semibold text-foreground">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `px-4 py-2 rounded-md ${
              isActive
                ? "bg-primary text-foreground"
                : "text-primary-foreground hover:bg-sidebar-accent "
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md ${
              isActive
                ? "bg-primary text-foreground"
                : "text-primary-foreground hover:bg-sidebar-accent "
            }`
          }
        >
          Users
        </NavLink>

        <NavLink
          to="/clients"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md ${
              isActive
                ? "bg-primary text-foreground"
                : "text-primary-foreground hover:bg-sidebar-accent "
            }`
          }
        >
          Clients
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md ${
              isActive
                ? "bg-primary text-foreground"
                : "text-primary-foreground hover:bg-sidebar-accent "
            }`
          }
        >
          Settings
        </NavLink>
      </nav>

      <main className="relative bg-background flex-2 rounded-3xl border shadow-2xl p-2 m-2">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
