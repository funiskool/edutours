import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Map,
  CalendarCheck,
  Globe,
  FileText,
  Image,
  Users,
  Star,
  Tag,
  CreditCard,
  Settings,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Tours & Packages", icon: Map },
  { name: "Bookings", icon: CalendarCheck },
  { name: "Destinations", icon: Globe },
  { name: "Website Content", icon: FileText },
  { name: "Media Library", icon: Image },
  { name: "Users", icon: Users },
  { name: "Reviews", icon: Star },
  { name: "Offers & Coupons", icon: Tag },
  { name: "Payments", icon: CreditCard },
  { name: "Site Settings", icon: Settings },
];

const AdminSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();

  return (
    <aside className="h-screen w-64 bg-slate-900 text-white fixed left-0 top-0 flex flex-col">
      
      {/* Logo */}
      <div className="px-6 py-5 text-xl font-bold border-b border-slate-700">
        Travel Admin
      </div>

      {/* Back to Website */}
      <motion.button
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition"
      >
        <ArrowLeft size={18} />
        Back to Website
      </motion.button>

      {/* Divider */}
      <div className="border-b border-slate-700 my-2" />

      {/* Menu */}
      <nav className="flex-1 space-y-1 px-3 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.name;

          return (
            <motion.button
              key={item.name}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActive(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
            >
              <Icon size={18} />
              {item.name}
            </motion.button>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
