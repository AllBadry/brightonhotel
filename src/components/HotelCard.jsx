import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function HotelCard({ hotel }) {
  const cardRef = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.3 });
  const sy = useSpring(my, { stiffness: 90, damping: 18, mass: 0.3 });

  const imgX = useTransform(sx, [-0.5, 0.5], [16, -16]);
  const imgY = useTransform(sy, [-0.5, 0.5], [16, -16]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const defaultImage = "https://images.unsplash.com/photo-1551882547-ff40c0d5bf8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-warm-card rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row overflow-hidden hover:shadow-md transition duration-300 w-full text-left"
      dir="ltr"
    >
      <span className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-terracotta to-gold group-hover:w-full transition-all duration-700 ease-out z-10" />

      {/* قسم الصورة */}
      <div className="md:w-1/3 h-56 md:h-auto relative overflow-hidden">
        <motion.img
          src={defaultImage}
          alt={hotel.name}
          style={{ x: imgX, y: imgY }}
          initial={{ scale: 1.1 }}
          whileHover={{ scale: 1.18 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sage/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* قسم المحتوى والتفاصيل */}
      <div className="p-6 md:w-2/3 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-serif font-bold text-sage group-hover:text-terracotta transition-colors duration-300">
                {hotel.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                📍 {hotel.location.address}, {hotel.location.city}
              </p>
            </div>
            {hotel.rating && (
              <div className="flex flex-col items-end">
                <span className="bg-sage-light text-white text-sm px-3 py-1 rounded-full font-medium flex items-center gap-1.5">
                  <span className="text-gold">★</span> {hotel.rating}
                </span>
                <span className="text-xs text-gray-400 mt-1">{hotel.reviewsCount} reviews</span>
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="bg-terracotta text-white font-medium text-xs px-3 py-1 rounded-md">
              {hotel.classification}
            </span>
          </div>

          {/* المرافق العملية (Business Features) */}
          <div className="mt-4 flex flex-wrap gap-2">
            {hotel.businessFeatures.map((feature, idx) => (
              <span key={idx} className="bg-warm text-gray-600 border border-gray-200 text-xs px-3 py-1.5 rounded-md">
                ✓ {feature}
              </span>
            ))}
          </div>
        </div>

        {/* قسم السياسات والتواصل */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
          <div className="text-sm text-gray-600 flex flex-col">
            <span><strong>Check-in:</strong> {hotel.policies.checkIn || "N/A"}</span>
            <span><strong>Contact:</strong> {hotel.contact.phone || "N/A"}</span>
          </div>

          {hotel.contact.website ? (
            <a
              href={hotel.contact.website}
              target="_blank"
              rel="noreferrer"
              className="bg-sage hover:bg-sage-light text-white px-6 py-2.5 rounded-lg font-medium transition shadow-sm group-hover:bg-terracotta"
            >
              Visit Website
            </a>
          ) : (
            <button className="bg-gray-300 text-gray-500 px-6 py-2.5 rounded-lg font-medium cursor-not-allowed">
              No Website
            </button>
          )}
        </div>
      </div>

    </div>
  );
}