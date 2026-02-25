import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminSidebar from "./components/AdminSidebar";
import ToursPage from "./components/ToursPage";
import { Menu, X } from "lucide-react";

function AdminLayout() {
  const [active, setActive] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (active) {
      case "Tours & Packages":
        return <ToursPage />;

      case "Dashboard":
        return (
          <div className="bg-white p-6 rounded-2xl shadow">
            Dashboard Content
          </div>
        );

      default:
        return (
          <div className="bg-white p-6 rounded-2xl shadow">
            {active} Page
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 🔹 Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-gray-900 text-white shadow">
        <button onClick={() => setSidebarOpen(true)}>
          <Menu size={26} />
        </button>
        <h1 className="text-lg font-semibold">{active}</h1>
      </div>

      <div className="flex">
        {/* 🖥 Desktop Sidebar */}
        <div className="hidden md:block fixed">
          <AdminSidebar active={active} setActive={setActive} />
        </div>

        {/* 📱 Mobile Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/50 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
              />

              <motion.div
                className="fixed top-0 left-0 h-full w-64 bg-gray-900 z-50"
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="flex justify-between items-center p-4 text-white">
                  <h2 className="text-lg font-semibold">Admin</h2>
                  <button onClick={() => setSidebarOpen(false)}>
                    <X size={22} />
                  </button>
                </div>

                <AdminSidebar
                  active={active}
                  setActive={(val) => {
                    setActive(val);
                    setSidebarOpen(false);
                  }}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 md:ml-64">
          <h1 className="hidden md:block text-2xl font-semibold mb-6">
            {active}
          </h1>

          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
