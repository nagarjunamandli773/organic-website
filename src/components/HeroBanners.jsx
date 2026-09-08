import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const BANNERS = [
  {
    id: 'banner-fruits',
    badge1: '100%',
    badge2: 'ORGANIC',
    titleLine1: 'Fresh Organic Fruits',
    titleLine2: '& Berry Harvest',
    subtitle: 'Sun-Ripened Oranges, Crisp Apples, Fresh Berries & Pomegranates',
    image: '/images/hero_fruits_veg_1.jpg',
    alt: 'Fresh Organic Fruits Harvest',
    link: '/category/fruits',
    btnText: 'Shop Fruits',
    cardClass: 'banner-card-green',
    btnClass: 'green-btn',
    badgeClass: 'green-badge'
  },
  {
    id: 'banner-ready-to-eat',
    badge1: 'READY TO',
    badge2: 'EAT',
    titleLine1: 'Wholesome Ready Meals',
    titleLine2: '& Gourmet Bowls',
    subtitle: 'Slow-Cooked Dal Makhani, Instant Quinoa & Organic Heat-and-Eat Dishes',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1600&auto=format&fit=crop&q=80',
    alt: 'Organic Ready To Eat Meals',
    link: '/category/ready-to-eat',
    btnText: 'Shop Ready Meals',
    cardClass: 'banner-card-beige',
    btnClass: 'brown-btn',
    badgeClass: 'green-badge',
    titleClass: 'brown-title'
  },
  {
    id: 'banner-snacks',
    badge1: 'ORGANIC',
    badge2: 'SNACKS',
    titleLine1: 'Wholesome Snacks',
    titleLine2: '& Energy Crunch',
    subtitle: 'Roasted Multigrain Clusters, Foxnut Makhana & Nutritious Seeds',
    image: '/images/cat_snacks.jpg',
    alt: 'Organic Wholesome Snacks',
    link: '/category/snacks',
    btnText: 'Shop Snacks',
    cardClass: 'banner-card-mint',
    btnClass: 'green-btn',
    badgeClass: 'green-badge'
  },
  {
    id: 'banner-sweets',
    badge1: 'PURE',
    badge2: 'SWEETS',
    titleLine1: 'Traditional Sweets',
    titleLine2: '& Festive Delights',
    subtitle: 'Pure Ghee Laddus, Kaju Katli & Artisanal Organic Sweet Treats',
    image: '/images/cat_sweets.jpg',
    alt: 'Organic Traditional Sweets',
    link: '/category/sweets',
    btnText: 'Shop Sweets',
    cardClass: 'banner-card-beige',
    btnClass: 'brown-btn',
    badgeClass: 'green-badge',
    titleClass: 'brown-title'
  },
  {
    id: 'banner-drinks',
    badge1: 'HEALTHY',
    badge2: 'DRINKS',
    titleLine1: 'Cold-Pressed Juices',
    titleLine2: '& Probiotic Drinks',
    subtitle: 'Fresh Citrus, Pomegranate Elixirs, Immunity Shots & Kombucha',
    image: '/images/hero_drinks_fullscreen.jpg',
    alt: 'Healthy Organic Drinks & Beverages',
    link: '/category/drinks',
    btnText: 'Explore Drinks',
    cardClass: 'banner-card-mint',
    btnClass: 'green-btn',
    badgeClass: 'green-badge'
  },
  {
    id: 'banner-cosmetics',
    badge1: 'CHEMICAL',
    badge2: 'FREE',
    titleLine1: 'Natural Cosmetics',
    titleLine2: '& Skincare Elixirs',
    subtitle: 'Botanical Facial Oils, Aloe Vera & Organic Glow Products',
    image: '/images/hero_cosmetics_fullscreen.jpg',
    alt: 'Organic Cosmetics & Skincare',
    link: '/category/cosmetics',
    btnText: 'Explore Beauty',
    cardClass: 'banner-card-beige',
    btnClass: 'brown-btn',
    badgeClass: 'green-badge',
    titleClass: 'brown-title'
  },
  {
    id: 'banner-hair-oils',
    badge1: 'HERBAL',
    badge2: 'CARE',
    titleLine1: 'Ayurvedic Hair Oils',
    titleLine2: '& Scalp Therapy',
    subtitle: 'Nourishing Amla, Bhringraj, Rosemary & Pure Coconut Oils',
    image: '/images/hair_oils_banner.jpg',
    alt: 'Herbal Hair Oils & Scalp Care',
    link: '/category/hair-oils',
    btnText: 'Shop Hair Oils',
    cardClass: 'banner-card-green',
    btnClass: 'green-btn',
    badgeClass: 'green-badge'
  },
  {
    id: 'banner-sanitary',
    badge1: '100%',
    badge2: 'COTTON',
    titleLine1: 'Organic Sanitary',
    titleLine2: '& Hygiene Care',
    subtitle: '100% Organic Cotton Tampons, Biodegradable Pads & Care Wipes',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1600&auto=format&fit=crop&q=80',
    alt: 'Organic Sanitary & Feminine Care',
    link: '/category/sanitary',
    btnText: 'Shop Sanitary Care',
    cardClass: 'banner-card-mint',
    btnClass: 'green-btn',
    badgeClass: 'green-badge'
  },
  {
    id: 'banner-fertilizers',
    badge1: '100%',
    badge2: 'BIO CARE',
    titleLine1: 'Chemical-Free Bio Care',
    titleLine2: '& Fertilizers',
    subtitle: 'Natural Neem Oil Spray, Seaweed Extracts & Organic Plant Boosters',
    image: '/images/hero_fertilizers_fullscreen.jpg',
    alt: 'Organic Fertilizers & Bio Care',
    link: '/category/org-chemicals',
    btnText: 'Shop Bio Care',
    cardClass: 'banner-card-green',
    btnClass: 'green-btn',
    badgeClass: 'green-badge'
  },
  {
    id: 'banner-vegetables',
    badge1: 'FARM',
    badge2: 'FRESH',
    titleLine1: 'Farm Fresh Organic',
    titleLine2: 'Vegetables & Harvest',
    subtitle: 'Crisp Leafy Spinach, Vine Tomatoes, Cucumbers & Bell Peppers',
    image: '/images/hero_fruits_veg_4.jpg',
    alt: 'Farm Fresh Vegetables',
    link: '/category/vegetables',
    btnText: 'Shop Vegetables',
    cardClass: 'banner-card-mint',
    btnClass: 'green-btn',
    badgeClass: 'green-badge'
  }
];

export const HeroBanners = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % BANNERS.length);
    }, 2000); // Automatically switch every 2 seconds

    return () => clearInterval(timer);
  }, [isHovered]);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + BANNERS.length) % BANNERS.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % BANNERS.length);
  };

  return (
    <section
      className="hero-banners-section carousel-hero-section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="hero-carousel-container">
        {/* Slides Track */}
        <div className="hero-carousel-slides-wrapper">
          {BANNERS.map((banner, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={banner.id}
                className={`hero-carousel-slide ${isActive ? 'active-slide' : ''} ${banner.cardClass}`}
              >
                {/* Full-Cover Background Image */}
                <img
                  src={banner.image}
                  alt={banner.alt}
                  className="hero-banner-bg-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&auto=format&fit=crop&q=80';
                  }}
                />

                {/* Subtle Overlay for High Text Readability */}
                <div className="hero-banner-overlay" />

                {/* Circle Badge */}
                <div className={`banner-circle-badge ${banner.badgeClass}`}>
                  <span>{banner.badge1}</span>
                  <span>{banner.badge2}</span>
                </div>

                {/* Text Content */}
                <div className="banner-text-content">
                  <h2 className={`hero-banner-title ${banner.titleClass || ''}`}>
                    {banner.titleLine1}<br />{banner.titleLine2}
                  </h2>
                  <p className="hero-banner-sub">
                    {banner.subtitle}
                  </p>
                  <Link to={banner.link} className={`hero-banner-btn ${banner.btnClass}`}>
                    <span>{banner.btnText}</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Left / Right Arrow Navigation Buttons */}
        <button
          type="button"
          className="carousel-arrow-btn prev-arrow"
          onClick={goToPrev}
          aria-label="Previous Slide"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          type="button"
          className="carousel-arrow-btn next-arrow"
          onClick={goToNext}
          aria-label="Next Slide"
        >
          <ChevronRight size={22} />
        </button>

        {/* Navigation Dots Indicator */}
        <div className="carousel-dots-indicator">
          {BANNERS.map((banner, index) => (
            <button
              key={banner.id}
              type="button"
              className={`carousel-dot-btn ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

