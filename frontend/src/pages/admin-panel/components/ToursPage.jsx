import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { motion } from "framer-motion";
import AddTourModal from "./tours_components/TourFormModal";
import { Plus, Edit, Image, List, CheckCircle, XCircle } from "lucide-react";

const ToursPage = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchTours = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("tours")
      .select("*")
      .order("created_at", { ascending: false });

    setTours(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const filteredTours = tours.filter((tour) =>
    tour.title?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl shadow-md"
        >
          <Plus size={18} />
          Add Tour
        </motion.button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search tours..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-gray-300 px-5 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Duration</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  Loading tours...
                </td>
              </tr>
            ) : filteredTours.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  No Tours Found
                </td>
              </tr>
            ) : (
              filteredTours.map((tour) => (
                <tr
                  key={tour.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {/* Title */}
                  <td className="p-4 font-medium text-gray-800">
                    {tour.title}
                  </td>

                  {/* Category */}
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-700">
                        {tour.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {tour.subcategory}
                      </span>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="p-4 font-semibold text-gray-800">
                    ₹{tour.discount_price || tour.price}
                  </td>

                  {/* Duration */}
                  <td className="p-4">
                    {tour.duration_days}D / {tour.duration_nights}N
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    {tour.status === "published" ? (
                      <span className="flex items-center gap-1 text-green-600 text-xs font-semibold">
                        <CheckCircle size={14} />
                        Published
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-yellow-600 text-xs font-semibold">
                        <XCircle size={14} />
                        Draft
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex justify-center gap-3 flex-wrap">
                      <ActionButton icon={<Edit size={16} />} label="Edit" />
                      <ActionButton
                        icon={<List size={16} />}
                        label="Itinerary"
                      />
                      <ActionButton icon={<Image size={16} />} label="Images" />
                      <ActionButton
                        icon={<Plus size={16} />}
                        label="Inclusions"
                      />
                      <ActionButton
                        icon={<Plus size={16} />}
                        label="Exclusions"
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showAddForm && (
        <AddTourModal
          onClose={() => setShowAddForm(false)}
          refreshTours={fetchTours}
        />
      )}
    </div>
  );
};

const ActionButton = ({ icon, label }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="flex items-center gap-1 px-3 py-1.5 text-xs bg-gray-900 text-white rounded-lg hover:bg-black transition"
  >
    {icon}
    {label}
  </motion.button>
);

export default ToursPage;
