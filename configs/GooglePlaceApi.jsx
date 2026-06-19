export const getPlaces = async (query) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
    );

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};