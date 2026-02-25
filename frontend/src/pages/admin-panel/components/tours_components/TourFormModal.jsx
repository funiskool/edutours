import { useState } from "react";
import { supabase } from "../../../../lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

const categories = {
  Indian: ["Adventure", "Beaches", "Hill Stations", "Spiritual", "Wildlife"],
  International: ["Adventure", "Beaches", "Luxury", "City Tours", "Cruise"],
};

const AddTourModal = ({ onClose, refreshTours }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    short_description: "",
    description: "",
    category: "Indian",
    subcategory: "",
    duration_days: "",
    duration_nights: "",
    price: "",
    discount_price: "",
    currency: "INR",
    available_slots: "",
    booking_deadline: "",
    location: "",
    country: "",
    cancellation_policy: "",
   
    is_active: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);

    const { error } = await supabase.from("tours").insert([formData]);

    setLoading(false);

    if (!error) {
      refreshTours();
      onClose();
    } else {
      alert("Error adding tour");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          className="bg-white w-[950px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-8"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Add New Tour
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black"
            >
              ✕
            </button>
          </div>

          {/* FORM GRID */}
          <div className="grid grid-cols-2 gap-5">

            <Input label="Title" name="title" value={formData.title} onChange={handleChange} />

            {/* Category */}
            <Select
              label="Category"
              name="category"
              value={formData.category}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  category: e.target.value,
                  subcategory: "",
                });
              }}
              options={Object.keys(categories)}
            />

            {/* Subcategory */}
            <Select
              label="Subcategory"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              options={categories[formData.category]}
            />

            <Input label="Duration Days" type="number" name="duration_days" value={formData.duration_days} onChange={handleChange} />
            <Input label="Duration Nights" type="number" name="duration_nights" value={formData.duration_nights} onChange={handleChange} />

            <Input label="Price" type="number" name="price" value={formData.price} onChange={handleChange} />
            <Input label="Discount Price" type="number" name="discount_price" value={formData.discount_price} onChange={handleChange} />

            <Input label="Currency" name="currency" value={formData.currency} onChange={handleChange} />
            <Input label="Available Slots" type="number" name="available_slots" value={formData.available_slots} onChange={handleChange} />

            <Input label="Booking Deadline" type="date" name="booking_deadline" value={formData.booking_deadline} onChange={handleChange} />
            <Input label="Location" name="location" value={formData.location} onChange={handleChange} />
            <Input label="Country" name="country" value={formData.country} onChange={handleChange} />

            {/* Full Width Fields */}
            <FullTextarea
              label="Short Description"
              name="short_description"
              value={formData.short_description}
              onChange={handleChange}
            />

            <FullTextarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />

            <FullTextarea
              label="Cancellation Policy"
              name="cancellation_policy"
              value={formData.cancellation_policy}
              onChange={handleChange}
            />

            {/* Status & Active */}
            <div className="col-span-2 flex items-center gap-4 mt-4">
             
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                />
                Active Tour
              </label>
             
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="mt-8 flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-black text-white rounded-lg hover:opacity-90"
            >
              {loading ? "Saving..." : "Create Tour"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <input
      {...props}
      className="w-full mt-1 px-4 py-2 border border-black text-black rounded-lg focus:outline-none"
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <select
      {...props}
      className="w-full mt-1 px-4 py-2 border border-black text-black rounded-lg focus:outline-none"
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const FullTextarea = ({ label, ...props }) => (
  <div className="col-span-2">
    <label className="text-sm text-gray-600">{label}</label>
    <textarea
      {...props}
      rows="3"
      className="w-full mt-1 px-4 py-2 border border-black text-black rounded-lg focus:outline-none"
    />
  </div>
);

export default AddTourModal;