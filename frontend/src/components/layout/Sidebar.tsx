import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-secondary p-4">
      <nav className="space-y-2">
        <NavLink to="/dashboard" className="block p-2 hover:bg-accent rounded">
          Dashboard
        </NavLink>
        <NavLink to="/MyPlants" className="block p-2 hover:bg-accent rounded">
          My Plants
        </NavLink>
        <NavLink to="/settings" className="block p-2 hover:bg-accent rounded">
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
