import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { hotelsData } from '../utils/hotelsData';
import { getHotelImage, getCategoryByClassification } from '../utils/hotelImages';

const ease = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export default function PropertyDetail() {
  const { id } = useParams();
  const hotel = hotelsData.find((h) => String(h.id) === String(id));

  if (!hotel) {
    return (
      <ReactLenis root>
        <div dir="ltr" className="bg-warm min-h-screen font-sans text-sage flex flex-col items-center justify-center px-8">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Property not found.</h1>
          <p className="text-gray-500 font-light text-lg mb-8">The listing you are looking for may have been removed.</p>
          <Link to="/catalog" className="bg-sage text-white px-8 py-3 rounded-full font-medium hover:bg-terracotta transition duration-300">
            Back to Directory
          </Link>
        </div>
      </ReactLenis>
    );
  }

  const image = getHotelImage(hotel);
  const category = getCategoryByClassification(hotel.classification);

  return (
    <ReactLenis root>
      <div dir="ltr" className="bg-warm font-sans text-sage overflow-hidden">

        {/* Hero */}
        <section className="relative h-[65vh] md:h-[85vh] flex flex-col justify-end pb-12 md:pb-16 px-6 md:px-16 overflow-hidden">
          <motion.img
            src={image}
            alt={hotel.name}
            initial={{ scale: 1.1, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ scale: 1, clipPath: 'inset(0 0 0% 0)' }}
            transition={{ duration: 1.6, ease }}
            className="absolute inset-0 w-full h-full object-cover will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sage/95 via-sage/40 to-transparent z-10" />

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6, ease }} className="relative z-20 max-w-7xl mx-auto w-full">
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 text-warm/60 hover:text-warm text-sm uppercase tracking-widest font-medium mb-6 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Back to Directory
            </Link>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <span className="bg-terracotta text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                  {hotel.classification}
                </span>
                <h1 className="text-5xl md:text-8xl font-serif font-bold text-white leading-[1.05]">
                  {hotel.name}
                </h1>
              </div>
              {hotel.rating && (
                <div className="flex flex-col items-end">
                  <span className="bg-white/15 backdrop-blur-sm text-white text-lg px-5 py-2 rounded-full font-medium flex items-center gap-2">
                    <span className="text-gold">★</span> {hotel.rating}
                  </span>
                  <span className="text-warm/50 text-sm mt-1">{hotel.reviewsCount} reviews</span>
                </div>
              )}
            </div>
          </motion.div>
        </section>

        {/* Details Grid */}
        <section className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">

            {/* Main Content */}
            <motion.div variants={fadeUp} className="md:col-span-8 space-y-12">
              {/* Location */}
              <div>
                <p className="text-terracotta uppercase tracking-[0.2em] text-xs font-bold mb-3">Location</p>
                <p className="text-lg text-gray-700 font-light leading-relaxed">
                  {hotel.location.address}, {hotel.location.city}, {hotel.location.postalCode || ''} {hotel.location.country || 'United Kingdom'}
                </p>
              </div>

              {/* Business Features */}
              <div>
                <p className="text-terracotta uppercase tracking-[0.2em] text-xs font-bold mb-4">Business Features</p>
                <div className="flex flex-wrap gap-3">
                  {hotel.businessFeatures.map((feature, idx) => (
                    <span key={idx} className="bg-warm border border-sage/10 text-sage text-sm font-medium px-5 py-2.5 rounded-full">
                      ✓ {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Classification */}
              <div>
                <p className="text-terracotta uppercase tracking-[0.2em] text-xs font-bold mb-3">Classification</p>
                <span className="bg-sage text-white text-sm px-5 py-2 rounded-full font-medium">{category}</span>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div variants={fadeUp} className="md:col-span-4 space-y-8">
              {/* Policies */}
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <p className="text-terracotta uppercase tracking-[0.2em] text-xs font-bold mb-4">Policies</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Check-in</span>
                  <span className="text-sage font-semibold">{hotel.policies.checkIn || 'Flexible'}</span>
                </div>
                <div className="border-t border-gray-100" />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Check-out</span>
                  <span className="text-sage font-semibold">{hotel.policies.checkOut || 'Flexible'}</span>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-sage text-warm p-8 rounded-2xl space-y-4">
                <p className="text-gold uppercase tracking-[0.2em] text-xs font-bold mb-4">Contact</p>
                {hotel.contact.phone && (
                  <a href={`tel:${hotel.contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-warm/80 hover:text-warm transition-colors">
                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                    {hotel.contact.phone}
                  </a>
                )}
                {hotel.contact.website && (
                  <a href={hotel.contact.website} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-warm/80 hover:text-warm transition-colors">
                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                    Visit website
                  </a>
                )}
              </div>

              {/* CTA */}
              <Link
                to="/contact"
                className="block bg-terracotta text-white text-center py-4 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-terracotta-hover transition duration-300"
              >
                Enquire Now
              </Link>
            </motion.div>

          </motion.div>
        </section>

      </div>
    </ReactLenis>
  );
}