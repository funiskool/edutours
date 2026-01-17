import React, { useState, useEffect } from "react";
import { countryCodes } from "../data/countryCodes";

export default function QueryForm() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selected, setSelected] = useState(countryCodes[0]); // India default
  const [showForm, setShowForm] = useState(false); // control popup

  const [form, setForm] = useState({
    name: "",
    phone: "",
    destination: "",
  });

  // Show form after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!showForm) return null; // don't render until 5 seconds

  // WhatsApp number in international format (without +)
  const myWhatsAppNumber = "919876543210"; // Replace with your number

  const handleWhatsApp = () => {
    if (!form.name || !form.phone || !form.destination) {
      alert("Please fill all fields!");
      return;
    }

    const message = `Hello! I am ${form.name}. My phone number is ${selected.dialCode} ${form.phone}. I am interested in traveling to ${form.destination}.`;

    const url = `https://wa.me/${myWhatsAppNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-xl overflow-hidden">
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setShowForm(false)}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-800 font-bold"
        >
          ✕
        </button>

        {/* HEADER */}
        <div className="bg-red-500 px-6 py-6 text-center text-white">
          <h2 className="text-xl font-bold">Request a Call Back</h2>
          <p className="text-sm opacity-90">We'll get in touch with you soon</p>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-5">
          {/* FULL NAME */}
          <div>
            <label className="mb-1 block font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-lg border bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* MOBILE NUMBER */}
          <div>
            <label className="mb-1 block font-medium text-gray-700">
              Mobile Number
            </label>
            <div className="relative flex">
              {/* COUNTRY DROPDOWN */}
              <button
                type="button"
                onClick={() => setOpenDropdown(!openDropdown)}
                className="flex items-center gap-2 rounded-l-lg border border-r-0 bg-gray-50 px-3 py-3"
              >
                <img
                  src={selected.flag}
                  alt={selected.name}
                  className="w-6 h-4 object-cover"
                />
                <span className="text-sm font-medium">
                  {selected.code} {selected.dialCode}
                </span>
                <span className="ml-1 text-xs">▼</span>
              </button>

              {/* PHONE INPUT */}
              <input
                type="tel"
                placeholder="Enter mobile number"
                className="flex-1 rounded-r-lg border bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              {/* DROPDOWN LIST */}
              {openDropdown && (
                <div className="absolute top-full left-0 z-50 mt-1 w-full max-h-60 overflow-y-auto rounded-lg border bg-white shadow-lg">
                  {countryCodes.map((c) => (
                    <div
                      key={c.code}
                      onClick={() => {
                        setSelected(c);
                        setOpenDropdown(false);
                      }}
                      className="flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-orange-50"
                    >
                      <img
                        src={c.flag}
                        alt={c.name}
                        className="w-6 h-4 object-cover"
                      />
                      <span className="text-sm text-gray-800">{c.name}</span>
                      <span className="ml-auto text-sm text-gray-500">
                        {c.dialCode}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* DESTINATION */}
          <div>
            <label className="mb-1 block font-medium text-gray-700">
              Preferred Destination
            </label>
            <input
              type="text"
              placeholder="Where would you like to go?"
              className="w-full rounded-lg border bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) =>
                setForm({ ...form, destination: e.target.value })
              }
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            onClick={handleWhatsApp}
            className="w-full rounded-xl bg-red-500 py-3 font-semibold text-white shadow-md hover:opacity-90"
          >
            Request a Call Back
          </button>
        </div>
      </div>
    </div>
  );
}
