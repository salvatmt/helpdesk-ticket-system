import {
  Link
} from "react-router-dom";

import {
  useAuth
} from "../../hooks/useAuth";


function Sidebar() {

  const { logout } = useAuth();

  return (

    <aside className="w-64 bg-black text-white min-h-screen p-5">

      <h2 className="text-2xl font-bold mb-10">
        Help Desk
      </h2>

      <nav className="flex flex-col gap-4">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/tickets">
          Tickets
        </Link>

        <button
          onClick={logout}
          className="text-left text-red-400"
        >
          Logout
        </button>

      </nav>

    </aside>
  );
}

export default Sidebar;