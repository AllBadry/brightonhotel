import React from 'react';

export default function HotelCard({ hotel }) {
  // استخدام صورة افتراضية تناسب طابع برايتون والعمل في حال عدم وجود صورة في البيانات
  const defaultImage = "https://images.unsplash.com/photo-1551882547-ff40c0d5bf8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";

  return (
    <div className="bg-warm-card rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row overflow-hidden hover:shadow-md transition duration-300 w-full text-left" dir="ltr">
      
      {/* قسم الصورة */}
      <div className="md:w-1/3 h-56 md:h-auto">
        <img src={defaultImage} alt={hotel.name} className="w-full h-full object-cover" />
      </div>
      
      {/* قسم المحتوى والتفاصيل */}
      <div className="p-6 md:w-2/3 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-serif font-bold text-sage">{hotel.name}</h3>
              <p className="text-sm text-gray-500 mt-1">
                📍 {hotel.location.address}, {hotel.location.city}
              </p>
            </div>
            {hotel.rating && (
              <div className="flex flex-col items-end">
                <span className="bg-sage-light text-white text-sm px-3 py-1 rounded-full font-medium">
                  ⭐ {hotel.rating}
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
              className="bg-sage hover:bg-sage-light text-white px-6 py-2.5 rounded-lg font-medium transition shadow-sm"
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