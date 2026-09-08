import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  HelpCircle, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Leaf, 
  ChevronDown, 
  ChevronUp, 
  PhoneCall, 
  Headphones, 
  ExternalLink,
  Store,
  Calendar,
  ArrowLeft
} from 'lucide-react';
import { handleBackNavigation } from '../utils/navigation';

export const ContactPage = () => {
  const navigate = useNavigate();
  const [activeSubject, setActiveSubject] = useState('general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    preferredContact: 'email',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0); // open first FAQ by default

  const inquiryTopics = [
    { id: 'general', label: '🌱 General Inquiry' },
    { id: 'orders', label: '📦 Order & Delivery' },
    { id: 'wholesale', label: '🚜 Bulk & Farm Supply' },
    { id: 'feedback', label: '💬 Feedback & Support' }
  ];

  const faqs = [
    {
      question: "How fast will my organic fruits & vegetables arrive?",
      answer: "We offer same-day express delivery for orders placed before 12:00 PM. All produce is harvested directly from certified organic farms every morning to ensure peak freshness."
    },
    {
      question: "Are Klan Organics products 100% certified organic?",
      answer: "Yes, 100%! All our fruits, vegetables, food staples, cosmetics, and fertilizers carry official NPOP, USDA Organic, and Jaivik Bharat certifications with zero synthetic chemicals."
    },
    {
      question: "What is your replacement policy if fresh produce arrives damaged?",
      answer: "We stand by our 100% Quality Guarantee. If any fresh item does not meet your standards, take a quick photo and report it via phone/WhatsApp within 24 hours for a full refund or instant replacement."
    },
    {
      question: "Do you supply organic fertilizers & farming products in bulk?",
      answer: "Absolutely! We support commercial organic farmers and home gardeners with bulk organic fertilizers, bio-pesticides, and soil enhancers. Select 'Bulk & Farm Supply' in the contact form for custom pricing."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      preferredContact: 'email',
      message: ''
    });
  };

  return (
    <div className="contact-page-wrapper">
      {/* 1. HERO HEADER SECTION */}
      <section className="contact-hero-section">
        <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 10 }}>
          <button 
            type="button"
            onClick={(e) => handleBackNavigation(navigate, e)} 
            className="back-arrow-btn"
            style={{ background: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            title="Go back to previous page"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
        </div>
        <div className="contact-hero-content">
          <div className="contact-badge">
            <Sparkles size={16} />
            <span>24/7 Organic Customer Care</span>
          </div>
          <h1 className="contact-hero-title serif-heading">
            We’d Love to Hear <span className="highlight-text">From You</span>
          </h1>
          <p className="contact-hero-subtitle">
            Have questions about our organic produce, order delivery, farm tours, or bulk supply? 
            Our dedicated team of organic enthusiasts is here to assist you every step of the way.
          </p>
        </div>
      </section>

      <div className="contact-container">
        {/* 2. QUICK CONTACT HIGHLIGHT CARDS (GRID) */}
        <section className="quick-contact-grid">
          <div className="quick-contact-card">
            <div className="card-icon-wrapper green-icon">
              <PhoneCall size={24} />
            </div>
            <div className="card-details">
              <h3>Call Us Directly</h3>
              <p className="card-main-info">+91 98765 43210</p>
              <p className="card-sub-info">Toll Free: 1800-ORGANIC</p>
              <a href="tel:+919876543210" className="card-action-btn">
                <span>Call Now</span>
              </a>
            </div>
          </div>

          <div className="quick-contact-card">
            <div className="card-icon-wrapper whatsapp-icon">
              <MessageSquare size={24} />
            </div>
            <div className="card-details">
              <h3>WhatsApp Support</h3>
              <p className="card-main-info">+91 98765 43210</p>
              <p className="card-sub-info">Instant chat response &lt; 5 mins</p>
              <a 
                href="https://wa.me/919876543210?text=Hi%20Klan%20Organics,%20I%20have%20a%20query!" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="card-action-btn whatsapp-btn"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="quick-contact-card">
            <div className="card-icon-wrapper amber-icon">
              <Mail size={24} />
            </div>
            <div className="card-details">
              <h3>Email Support</h3>
              <p className="card-main-info">hello@klanorganics.com</p>
              <p className="card-sub-info">Replied within 2 business hours</p>
              <a href="mailto:hello@klanorganics.com" className="card-action-btn">
                <span>Send Email</span>
              </a>
            </div>
          </div>

          <div className="quick-contact-card">
            <div className="card-icon-wrapper blue-icon">
              <Store size={24} />
            </div>
            <div className="card-details">
              <h3>Experience Store & HQ</h3>
              <p className="card-main-info">Green City, Earth</p>
              <p className="card-sub-info">Mon - Sat: 8:00 AM - 8:00 PM</p>
              <a href="#store-map" className="card-action-btn">
                <span>View Directions</span>
              </a>
            </div>
          </div>
        </section>

        {/* 3. MAIN SPLIT SECTION: FORM & STORE EXPERIENCE */}
        <section className="contact-main-split">
          {/* LEFT: INTERACTIVE CONTACT FORM */}
          <div className="contact-form-wrapper">
            <div className="form-card-header">
              <span className="section-eyebrow">Direct Inquiry</span>
              <h2 className="serif-heading">Send Us a Message</h2>
              <p>Fill out the form below and our team will get back to you promptly.</p>
            </div>

            {/* Subject Selector Tabs */}
            <div className="inquiry-topic-selector">
              {inquiryTopics.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  className={`topic-tab ${activeSubject === topic.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveSubject(topic.id);
                    setFormData({ ...formData, subject: topic.label });
                  }}
                >
                  {topic.label}
                </button>
              ))}
            </div>

            {submitted ? (
              <div className="form-success-card">
                <div className="success-icon-circle">
                  <CheckCircle2 size={48} />
                </div>
                <h3>Message Sent Successfully!</h3>
                <p>
                  Thank you <strong>{formData.name}</strong>. We have received your inquiry regarding{' '}
                  <em>"{formData.subject || 'General Inquiry'}"</em>. 
                  Our team will contact you shortly via <strong>{formData.preferredContact}</strong>.
                </p>
                <div className="success-actions">
                  <button className="btn-solid-green" onClick={resetForm}>
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="premium-contact-form">
                <div className="form-row dual-fields">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-row dual-fields">
                  <div className="form-group">
                    <label>Phone Number (Optional)</label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Preferred Response Method</label>
                    <select
                      value={formData.preferredContact}
                      onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone Call</option>
                      <option value="whatsapp">WhatsApp Message</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Subject / Specific Product</label>
                  <input
                    type="text"
                    placeholder="e.g. Order #1042 or Organic Mangoes Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Your Message *</label>
                  <textarea
                    rows="5"
                    placeholder="Tell us how we can help you today..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-inquiry-btn">
                  <span>Submit Inquiry</span>
                  <Send size={18} />
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: STORE INFO & MAP CARD */}
          <div className="contact-sidebar-wrapper" id="store-map">
            {/* Store & Location Card */}
            <div className="store-info-card">
              <div className="store-card-header">
                <Leaf className="leaf-badge-icon" size={20} />
                <h3>Flagship Organic Store & Farm HQ</h3>
              </div>

              <div className="store-detail-row">
                <MapPin className="detail-icon" size={20} />
                <div>
                  <strong>Address</strong>
                  <p>123 Organic Street, Green City, Earth - 560001</p>
                </div>
              </div>

              <div className="store-detail-row">
                <Clock className="detail-icon" size={20} />
                <div>
                  <strong>Operating Hours</strong>
                  <p>Mon - Sat: 8:00 AM - 8:00 PM</p>
                  <p>Sunday: 9:00 AM - 4:00 PM</p>
                </div>
              </div>

              <div className="store-detail-row">
                <Calendar className="detail-icon" size={20} />
                <div>
                  <strong>Weekend Organic Farm Walk</strong>
                  <p>Free guided farm tours every Saturday at 10:00 AM.</p>
                </div>
              </div>

              {/* Styled Google Maps Embed */}
              <div className="google-map-container">
                <iframe
                  title="Klan Organics Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9734994276713!2d77.5945627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                  width="100%"
                  height="220"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="map-direct-link">
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="open-map-btn"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Direct Instant Support Card */}
            <div className="instant-support-banner">
              <div className="banner-badge">Need Urgent Help?</div>
              <h4>Speak With Our Organic Specialist</h4>
              <p>Got a quick question about freshness or live orders? Chat live with our customer support manager now.</p>
              <a href="tel:+919876543210" className="instant-call-btn">
                <Headphones size={18} />
                <span>Call +91 98765 43210</span>
              </a>
            </div>
          </div>
        </section>

        {/* 4. FREQUENTLY ASKED QUESTIONS SECTION */}
        <section className="contact-faq-section">
          <div className="faq-section-header">
            <div className="faq-icon-badge"><HelpCircle size={22} /></div>
            <h2 className="serif-heading">Frequently Asked Questions</h2>
            <p>Quick answers to common questions about our organic produce, shipping, and policies.</p>
          </div>

          <div className="faq-accordion-list">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item-card ${openFaq === index ? 'open' : ''}`}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="faq-question-row">
                  <h4 className="faq-question-text">{faq.question}</h4>
                  <button className="faq-toggle-btn" aria-label="Toggle answer">
                    {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
                {openFaq === index && (
                  <div className="faq-answer-body">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 5. TRUST & GUARANTEE STRIP */}
        <section className="contact-trust-strip">
          <div className="trust-strip-item">
            <Leaf size={28} className="trust-icon" />
            <div>
              <h4>100% Certified Organic</h4>
              <p>Zero synthetic pesticides or harmful chemicals</p>
            </div>
          </div>

          <div className="trust-strip-item">
            <Truck size={28} className="trust-icon" />
            <div>
              <h4>Farm-Fresh Express Delivery</h4>
              <p>Harvested daily & delivered straight to your door</p>
            </div>
          </div>

          <div className="trust-strip-item">
            <ShieldCheck size={28} className="trust-icon" />
            <div>
              <h4>Quality Guaranteed</h4>
              <p>Hassle-free replacement if you're not satisfied</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
