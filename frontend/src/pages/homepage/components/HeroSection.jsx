import React, { useState, useEffect } from 'react';
import SearchBar from '../../../components/ui/SearchBar';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import img1 from '../../../../public/assets/images/Homepg/img1.jpeg';
import img2 from '../../../../public/assets/images/Homepg/img2.jpeg';
import img3 from '../../../../public/assets/images/Homepg/img3.jpeg';
import img4 from '../../../../public/assets/images/Homepg/img4.jpeg';
import img5 from '../../../../public/assets/images/Homepg/img5.jpeg';
import img6 from '../../../../public/assets/images/Homepg/img6.jpeg';


const HeroSection = ({ onSearch }) => {
  const heroSlides = [
  {
    id: 1,
    image:img1 ,
    imageAlt: "A group of travelers posing inside a museum with a large sculpture during a guided educational tour",
    title: "Cultural & Educational Museum Tour",
    subtitle: "Explore iconic museums and experience history, art, and culture together with expert-guided group tours.",
    badge: "Most Popular"
  },
  {
    id: 2,
    image: img2,
    imageAlt: "Students on an educational tour posing near a rocket display at a space science and technology center in India",
    title: "Space Science Educational Tour",
    subtitle: "Experience India’s space achievements up close with inspiring visits designed to spark curiosity and learning.",
    badge: "Best for Students"
  },
  {
    id: 4,
    image: img4,
    imageAlt: "Group of travelers posing at a heritage site with a large statue during a cultural and sightseeing tour",
    title: "Heritage & Sightseeing Group Tour",
    subtitle: "Visit iconic landmarks and cultural attractions while enjoying memorable group travel experiences.",
    badge: "Cultural Highlights"
  },{
    id: 5,
    image: img5,
    imageAlt: "Diverse group of young students hiking through lush green mountain trail with backpacks during outdoor adventure learning camp",
    title: "Adventure Learning Camps",
    subtitle: "Feel the thrill of nature as you explore scenic trails, fresh mountain air, and unforgettable group moments.",
    badge: "Adventure Special"
  },
  {
    id: 6,
    image: img6,
    imageAlt: "Group of travelers wearing safety helmets and life jackets posing together after an exciting river rafting adventure",
    title: "Thrilling River Rafting Group",
    subtitle: "Experience heart-pounding rapids, teamwork, and unforgettable moments surrounded by stunning natural landscapes.",
    badge: "Adventure Awaits"
  }
];


  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides?.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides?.length) % heroSlides?.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides?.length);
  };

  return (
    <> 
    <section className="relative w-full h-[520px] md:h-[550px] lg:h-[650px] overflow-visible">
      <div className="absolute inset-0">
        {heroSlides?.map((slide, index) =>
        <div
          key={slide?.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
          index === currentSlide ? 'opacity-100' : 'opacity-0'}`
          }>

            <Image
            src={slide?.image}
            alt={slide?.imageAlt}
            className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/20" />

          </div>
        )}
      </div>
      <div className="relative z-10 h-full flex flex-col justify-center max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-16 -translate-y-16 md:-translate-y-20 lg:-translate-y-24 transform">
          {heroSlides?.[currentSlide]?.badge &&
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/90 text-primary-foreground rounded-full mb-4 md:mb-6">
              <Icon name="Star" size={16} />
              <span className="text-sm md:text-base font-medium font-caption">
                {heroSlides?.[currentSlide]?.badge}
              </span>
            </div>
          }
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4 md:mb-6">
            {heroSlides?.[currentSlide]?.title}
          </h1>
          
        </div>



        {/* Slide indicators */}
        
      </div>
      <button
        onClick={handlePrevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-card/80 hover:bg-card rounded-full flex items-center justify-center transition-smooth shadow-warm"
        aria-label="Previous slide">

        <Icon name="ChevronLeft" size={24} />
      </button>
      
      <button
        onClick={handleNextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-card/80 hover:bg-card rounded-full flex items-center justify-center transition-smooth shadow-warm"
        aria-label="Next slide">

        <Icon name="ChevronRight" size={24} />
      </button>

      {/* Search bar overlapping bottom of hero: half on image, half on white bg below */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 z-30 w-full px-4">
        <div className="max-w-7xl mx-auto">
          <SearchBar variant="hero" onSearch={onSearch} />
        </div>
      </div>

    </section>

    {/* white spacer so the lower half of the search bar sits on white background */}
    <div className="bg-white h-20" aria-hidden="true" />
    </>);

};

export default HeroSection;