import React, { useEffect, useState } from "react";
import Routes from "./Routes";
import QueryForm from "./components/QueryForm";

function App() {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowForm(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Routes />
      {showForm && <QueryForm onClose={() => setShowForm(false)} />}
    </>
  );
}

export default App;
