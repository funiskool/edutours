import React, { useState, useEffect } from "react";
import SearchBar from "../../../components/ui/SearchBar";
import Image from "../../../components/AppImage";

const HeroSection = ({ onSearch }) => {
  const heroSlides = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/29793799/pexels-photo-29793799.jpeg",
      title: "Magical Manali"
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/14012627/pexels-photo-14012627.jpeg",
      title: "Goa Beach Escape"
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/8936686/pexels-photo-8936686.jpeg",
      title: "Romantic Paris"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1920&q=80",
      title: "Beautiful Bali"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80",
      title: "Dubai Dreams"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[400px] sm:h-[480px] md:h-[600px] lg:h-[740px] overflow-hidden">
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/35" />
        </div>
      ))}

      {/* Title */}
      <div className="absolute bottom-20 sm:bottom-24 md:bottom-28 lg:bottom-36 left-1/2 -translate-x-1/2 z-10 text-center px-4">
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
          {heroSlides[currentSlide].title}
        </h1>
      </div>

      {/* Search Bar */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 w-full px-4">
        <div className="max-w-6xl mx-auto">
          <SearchBar variant="hero" onSearch={onSearch} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
