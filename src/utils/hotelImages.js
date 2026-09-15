const HOTEL_IMAGES = {
  Hotels: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
  'Guest Houses': 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
  'Pubs & Gastropubs': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
  'Self-Catering': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
  Other: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
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