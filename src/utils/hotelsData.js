import rawHotelsData from '../data.json';

export const hotelsData = rawHotelsData
  .flat()
  .filter((h, i, arr) => arr.findIndex((x) => x.id === h.id) === i);