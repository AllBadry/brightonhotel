const HOTEL_IMAGES = {
  Hotels: '/images/hotel-pool.jpg',
  'Guest Houses': '/images/guesthouse-room.jpg',
  'Pubs & Gastropubs': '/images/gastropub.jpg',
  'Self-Catering': '/images/apartment-interior.jpg',
  Other: '/images/luxury-hotel.jpg',
};

export const getCategoryByClassification = (classification) => {
  const c = (classification || '').toLowerCase();
  if (c.includes('hotel')) return 'Hotels';
  if (c.includes('guest house')) return 'Guest Houses';
  if (c.includes('pub')) return 'Pubs & Gastropubs';
  if (c.includes('self-catering')) return 'Self-Catering';
  return 'Other';
};

export const getHotelImage = (hotel) =>
  HOTEL_IMAGES[getCategoryByClassification(hotel?.classification)] || HOTEL_IMAGES.Other;

export const getHotelImageByClassification = (classification) =>
  HOTEL_IMAGES[getCategoryByClassification(classification)] || HOTEL_IMAGES.Other;