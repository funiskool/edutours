import { useEffect, useState } from "react";

const useHomeTours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Temporary dummy data (replace later with API)
    const dummyTours = [
      {
        _id: 1,
        title: "Goa Beach Escape",
        price: 15000,
        section: "incredible-india",
        image: "https://source.unsplash.com/600x400/?goa",
      },
      {
        _id: 2,
        title: "Kashmir Paradise",
        price: 22000,
        section: "incredible-india",
        image: "https://source.unsplash.com/600x400/?kashmir",
      },
      {
        _id: 3,
        title: "Jaipur Royal Tour",
        price: 18000,
        section: "incredible-india",
        image: "https://source.unsplash.com/600x400/?jaipur",
      },
    ];

    setTimeout(() => {
      setTours(dummyTours);
      setLoading(false);
    }, 1000);
  }, []);

  return { tours, loading };
};

export default useHomeTours;
