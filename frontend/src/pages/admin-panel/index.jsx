import { useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import Header from "components/ui/Header";

function AdminLayout() {
  const [active, setActive] = useState("Dashboard");

  return (
    <>
      
      <div className="flex">
        <AdminSidebar active={active} setActive={setActive} />
        <main className="ml-64 p-6 w-full">
          <h1 className="text-2xl font-semibold">{active}</h1>
        </main>
      </div>
    </>
  );
}

export default AdminLayout;
