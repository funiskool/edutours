import { motion } from "framer-motion";
import   useHomeTours  from "../../../components/ui/useHomeTours.js";

export function IncredibleIndiaSection() {
  const { tours, loading } = useHomeTours();

  if (loading) return null;

  const indiaTours = tours
    .filter(t => t.section === "incredible-india")
    .slice(0, 6);

  return (
    <section className="py-16 max-w-7xl mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-10"
      >
        Incredible India 🇮🇳
      </motion.h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {indiaTours.map(tour => (
          <motion.div
            key={tour._id}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <img src={tour.image} className="h-56 w-full object-cover" />
            <div className="p-5">
              <h3 className="text-xl font-semibold">{tour.title}</h3>
              <p className="text-orange-600 font-bold mt-2">
                ₹{tour.price}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
