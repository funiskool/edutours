import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import QueryForm from "./components/QueryForm";

function App() {
  const [showForm, setShowForm] = useState(false);

  // Show the form 5 seconds after the user visits
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 5000); // 5000 ms = 5 seconds

    return () => clearTimeout(timer);
  }, []);


  return (
    <div>
      <Routes />

      {/* Popup Query Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-100">
          <div className=" p-6 rounded-lg shadow-lg relative w-full">
            {showForm && (
              <QueryForm
                phoneNumber="919818990772"
                onClose={() => setShowForm(false)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
