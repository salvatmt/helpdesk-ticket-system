import Sidebar from "../components/ui/Sidebar";

import Navbar from "../components/ui/Navbar";


function DashboardLayout({ children }) {

  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <main className="p-6">

          {children}

        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;