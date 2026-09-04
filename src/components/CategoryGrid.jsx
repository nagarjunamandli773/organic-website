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
      id: 'organic-food',
      title: 'Organic Food',
      subtitle: 'Healthy & Natural',
      slug: 'organic-food',
      image: '/images/organic_foods_banner.png'
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
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'org-chemicals',
      title: 'Org Chemicals',
      subtitle: 'Safe & Non-Toxic',
      slug: 'org-chemicals',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'organic-products',
      title: 'Organic Products',
      subtitle: 'Pure & Eco-Certified',
      slug: 'organic-products',
      image: '/images/fruits_hero_banner.jpg'
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

