import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const CategoryGrid = () => {
  const homeCategories = [
    {
      id: 'fruits-veg',
      title: 'Fruits & Vegetables',
      subtitle: 'Fresh & Seasonal',
      slug: 'fruits',
      image: '/images/fruits_hero_banner.jpg'
    },
    {
      id: 'snacks',
      title: 'Snacks',
      subtitle: 'Crunchy & Wholesome',
      slug: 'snacks',
      image: '/images/cat_snacks.jpg'
    },
    {
      id: 'sweets',
      title: 'Sweets',
      subtitle: 'Pure & Traditional',
      slug: 'sweets',
      image: '/images/cat_sweets.jpg'
    },
    {
      id: 'drinks',
      title: 'Drinks / Beverages',
      subtitle: 'Cold-Pressed & Pure',
      slug: 'healthy-drinks',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'ready-to-eat',
      title: 'Ready-to-Eat Food',
      subtitle: 'Quick & Wholesome',
      slug: 'ready-to-eat',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'cosmetics',
      title: 'Cosmetics',
      subtitle: 'Natural Beauty Care',
      slug: 'cosmetics',
      image: '/images/hero_cosmetics.jpg'
    },
    {
      id: 'hair-oils',
      title: 'Hair Oils',
      subtitle: 'Nourish & Strengthen',
      slug: 'hair-oils',
      image: '/images/hair_oils_banner.jpg'
    },
    {
      id: 'org-chemicals',
      title: 'Organic Chemicals',
      subtitle: 'Safe & Non-Toxic',
      slug: 'org-chemicals',
      image: '/images/natural_fertilizer.jpg'
    }
  ];

  return (
    <section className="shop-by-category-section">
      <div className="section-header-flex">
        <h2 className="section-title-serif">Shop by Category</h2>
        <Link to="/products" className="view-all-pill-btn">
          <span>View All Categories</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="category-6cards-grid">
        {homeCategories.map(cat => (
          <Link key={cat.id} to={`/category/${cat.slug}`} className="category-item-card">
            <div className="cat-card-img-circle">
              <img src={cat.image} alt={cat.title} className="cat-item-img" />
            </div>
            <div className="cat-card-info">
              <h3 className="cat-item-title">{cat.title}</h3>
              <p className="cat-item-subtitle">{cat.subtitle}</p>
              <div className="cat-item-link">
                <span>Shop Now</span>
                <ArrowRight size={12} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

