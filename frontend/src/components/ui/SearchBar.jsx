import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, CalendarDays, Moon, Users, Plus, Minus, Search } from "lucide-react";

const durations = Array.from({ length: 24 }, (_, i) => `${i + 1} Night${i + 1 > 1 ? "s" : ""}`);

const SearchBar = ({ onSearch }) => {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("3 Nights");
  const [openTravellers, setOpenTravellers] = useState(false);

  const [travellers, setTravellers] = useState({
    adults: 2,
    children: 0,
    infants: 0,
  });

  const updateCount = (type, value) => {
    setTravellers((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + value),
    }));
  };

  const handleSearch = () => {
    onSearch?.({ destination, date, duration, travellers });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-7xl mx-auto"
    >
      <div className="flex items-center gap-3 bg-white rounded-full shadow-xl px-6 py-4 border">

        {/* Destination */}
        <div className="flex items-center gap-3 flex-1">
          <MapPin size={28} className="text-primary" />
          <input
            type="text"
            placeholder="Where are you going?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full outline-none text-xl"
          />
        </div>

        <div className="h-8 w-px bg-gray-200" />

        {/* Calendar */}
        <div className="flex items-center gap-3 flex-1">
          <CalendarDays size={28} className="text-primary" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full outline-none text-xl bg-transparent"
          />
        </div>

        <div className="h-8 w-px bg-gray-200" />

        {/* Duration */}
        <div className="flex items-center gap-3 flex-1">
          <Moon size={28} className="text-primary" />
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full outline-none text-xl bg-transparent"
          >
            {durations.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="h-8 w-px bg-gray-200" />

        {/* Travellers */}
        <div className="relative flex-1">
          <button
            onClick={() => setOpenTravellers(!openTravellers)}
            className="flex items-center gap-3 w-full"
          >
            <Users size={28} className="text-primary" />
            <span className="text-md">
              {travellers.adults} Adults · {travellers.children} Children · {travellers.infants} Infants
            </span>
          </button>

          <AnimatePresence>
            {openTravellers && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-14 left-0 bg-white rounded-xl shadow-lg p-4 w-64 z-50"
              >
                {["adults", "children", "infants"].map((type) => (
                  <div key={type} className="flex items-center justify-between mb-3">
                    <span className="capitalize text-xl">{type}</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateCount(type, -1)}
                        className="p-1 rounded-full border"
                      >
                        <Minus size={14} />
                      </button>
                      <span>{travellers[type]}</span>
                      <button
                        onClick={() => updateCount(type, 1)}
                        className="p-1 rounded-full border"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSearch}
          className="bg-primary text-white px-8 py-3 rounded-full flex items-center gap-2 text-sm font-medium"
        >
          <Search size={18} />
          Search
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SearchBar;
