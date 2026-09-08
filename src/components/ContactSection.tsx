import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, MapPin, CheckCircle, Send, AlertCircle, Instagram, Star, ExternalLink } from 'lucide-react';
import { SiteSettings } from '../types';
import { api } from '../services/api';

interface ContactSectionProps {
  settings?: SiteSettings | null;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    weddingDate: '',
    location: '',
    eventType: 'Destination Wedding (2-3 Days)',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.submitEnquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        weddingDate: formData.weddingDate,
        location: formData.location,
        eventType: formData.eventType,
        message: formData.message
      });

      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        weddingDate: '',
        location: '',
        eventType: 'Destination Wedding (2-3 Days)',
        message: ''
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Could not submit enquiry. Please reach us directly via WhatsApp or phone.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const phone = settings?.phoneNumber || '+91 98765 43210';
  const waNumber = settings?.whatsappNumber || '+91 98765 43210';
  const email = settings?.email || 'weddings@senphotography.com';
  const city = settings?.city || 'Udaipur · New Delhi · Worldwide';
  const address = settings?.address || 'Heritage Walkway, Ambavgarh, Udaipur, Rajasthan';
  const cleanPhoneForDialer = `tel:${phone.replace(/\s+/g, '')}`;
  const cleanWaNumber = waNumber.replace(/[^0-9]/g, '') || '919876543210';
  const whatsappLink = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
    'Hello SEN PHOTOGRAPHY, I would like to inquire about wedding photography and cinema availability.'
  )}`;
  const instagramUrl = settings?.instagramUrl || 'https://instagram.com/senphotography';

  return (
    <section id="contact" className="py-24 md:py-36 bg-[#0c0c0d] text-[#e8e4dc] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header: EXACT requested layout */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs md:text-sm tracking-[0.4em] uppercase text-[#d4af37] font-semibold block mb-2">
            CONNECT WITH US
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#fbf8f2] font-light tracking-tight mb-4">
            LET'S CAPTURE YOUR STORY
          </h2>
          <div className="w-24 sm:w-32 h-[1px] bg-[#d4af37]/60 mx-auto mb-6" />
          <p className="font-serif italic text-lg sm:text-2xl text-[#f4eee0] font-light leading-relaxed max-w-2xl mx-auto">
            "Your memories deserve more than just photographs.<br />
            They deserve to be remembered exactly as they felt."
          </p>
        </div>

        {/* 3 Prominent Quick Action Buttons */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* CALL */}
            <a
              href={cleanPhoneForDialer}
              className="flex items-center justify-center space-x-3 py-4 px-6 bg-[#161619] hover:bg-[#1f1f25] border border-white/10 hover:border-[#d4af37] transition-all duration-300 group"
            >
              <Phone className="w-4 h-4 text-[#d4af37]" />
              <span className="text-xs tracking-[0.25em] uppercase font-semibold text-white group-hover:text-[#d4af37] transition-colors">
                CALL NOW
              </span>
            </a>

            {/* WHATSAPP */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-3 py-4 px-6 bg-[#161619] hover:bg-[#1f1f25] border border-white/10 hover:border-[#25D366] transition-all duration-300 group"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span className="text-xs tracking-[0.25em] uppercase font-semibold text-white group-hover:text-[#25D366] transition-colors">
                WHATSAPP
              </span>
            </a>

            {/* INSTAGRAM */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-3 py-4 px-6 bg-[#161619] hover:bg-[#1f1f25] border border-white/10 hover:border-[#E1306C] transition-all duration-300 group"
            >
              <Instagram className="w-4 h-4 text-[#E1306C]" />
              <span className="text-xs tracking-[0.25em] uppercase font-semibold text-white group-hover:text-[#E1306C] transition-colors">
                INSTAGRAM
              </span>
            </a>
          </div>
        </div>

        {/* Form and Contact Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Studio Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-light mb-4">
                Studio & Enquiries
              </h3>
              <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed mb-8">
                We accept a curated calendar of weddings each season to provide every couple our personal, undivided artistic devotion.
              </p>

              <div className="space-y-4 pt-4 border-t border-white/10 text-left">
                <div className="flex items-start space-x-3 p-3.5 bg-white/[0.02] border border-white/10">
                  <Phone className="w-4 h-4 text-[#d4af37] shrink-0 mt-1" />
                  <div>
                    <span className="text-[9px] tracking-[0.2em] uppercase text-white/40 block">DIRECT PHONE</span>
                    <span className="text-xs text-white font-medium">{phone}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3.5 bg-white/[0.02] border border-white/10">
                  <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0 mt-1" />
                  <div>
                    <span className="text-[9px] tracking-[0.2em] uppercase text-white/40 block">WHATSAPP CHAT</span>
                    <span className="text-xs text-white font-medium">{waNumber}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3.5 bg-white/[0.02] border border-white/10">
                  <Mail className="w-4 h-4 text-white/70 shrink-0 mt-1" />
                  <div>
                    <span className="text-[9px] tracking-[0.2em] uppercase text-white/40 block">EMAIL INQUIRIES</span>
                    <span className="text-xs text-white font-medium">{email}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3.5 bg-white/[0.02] border border-white/10">
                  <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-1" />
                  <div>
                    <span className="text-[9px] tracking-[0.2em] uppercase text-white/40 block">STUDIO LOCATION</span>
                    <span className="text-xs text-white font-medium">{city}</span>
                    <p className="text-[11px] text-white/50 mt-0.5">{address}</p>
                  </div>
                </div>

                {settings?.googleReviewUrl && (
                  <a
                    href={settings.googleReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 bg-white/[0.02] border border-white/10 hover:border-[#d4af37]/60 transition-colors group"
                  >
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-[#d4af37] fill-current" />
                      <span className="text-xs text-white group-hover:text-[#d4af37]">Google Reviews & Ratings</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-white/40" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Date Booking Form */}
          <div className="lg:col-span-7 bg-[#111113] border border-white/10 p-8 sm:p-12 relative text-left">
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-light mb-2">
              Book Your Date
            </h3>
            <p className="text-xs text-white/50 mb-8 tracking-wider font-light">
              Fill out the details below, and our team will get in touch with you directly.
            </p>

            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-2xl text-white font-light">
                  Enquiry Received
                </h4>
                <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to SEN PHOTOGRAPHY. We look forward to documenting your celebration.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 text-[11px] tracking-[0.2em] uppercase border border-white/20 text-white/70 hover:text-white"
                >
                  SEND ANOTHER ENQUIRY
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3 bg-red-950/50 border border-red-800 text-red-300 text-xs flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-white/60 mb-2 font-medium">
                      YOUR FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full bg-black/50 border border-white/15 px-4 py-3 text-xs text-white placeholder-white/20 focus:border-[#d4af37] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-white/60 mb-2 font-medium">
                      PHONE / WHATSAPP *
                    </label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full bg-black/50 border border-white/15 px-4 py-3 text-xs text-white placeholder-white/20 focus:border-[#d4af37] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-white/60 mb-2 font-medium">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@domain.com"
                      className="w-full bg-black/50 border border-white/15 px-4 py-3 text-xs text-white placeholder-white/20 focus:border-[#d4af37] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-white/60 mb-2 font-medium">
                      TENTATIVE DATE
                    </label>
                    <input
                      type="date"
                      name="weddingDate"
                      value={formData.weddingDate}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-white/15 px-4 py-3 text-xs text-white placeholder-white/20 focus:border-[#d4af37] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-white/60 mb-2 font-medium">
                      WEDDING CITY / VENUE *
                    </label>
                    <input
                      type="text"
                      required
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Udaipur / Jagmandir Palace"
                      className="w-full bg-black/50 border border-white/15 px-4 py-3 text-xs text-white placeholder-white/20 focus:border-[#d4af37] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-white/60 mb-2 font-medium">
                      EVENT TYPE
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-white/15 px-4 py-3 text-xs text-white placeholder-white/20 focus:border-[#d4af37] focus:outline-none transition-colors"
                    >
                      <option value="Destination Wedding (2-3 Days)" className="bg-[#121214]">Destination Wedding (2-3 Days)</option>
                      <option value="Single Day Wedding & Reception" className="bg-[#121214]">Single Day Wedding & Reception</option>
                      <option value="Pre-Wedding Cinema & Shoot" className="bg-[#121214]">Pre-Wedding Cinema & Shoot</option>
                      <option value="Intimate Heritage Wedding" className="bg-[#121214]">Intimate Heritage Wedding</option>
                      <option value="Maternity / Heirloom Portraits" className="bg-[#121214]">Maternity / Heirloom Portraits</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-white/60 mb-2 font-medium">
                    YOUR VISION & ESTIMATED DETAILS
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your event traditions, locations, guest count, or vision..."
                    className="w-full bg-black/50 border border-white/15 px-4 py-3 text-xs text-white placeholder-white/20 focus:border-[#d4af37] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#d4af37] hover:bg-[#c49f2b] disabled:opacity-50 text-[#0c0c0d] font-semibold text-xs tracking-[0.25em] uppercase transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <span>TRANSMITTING ENQUIRY...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>SUBMIT INQUIRY</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
