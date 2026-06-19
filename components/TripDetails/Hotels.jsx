import { Colors } from "@/app-example/constants/theme";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { getPlaces } from "../../configs/GooglePlaceApi"; // assume your fetch function is here

export default function Hotels() {
  const [hotelData, setHotelData] = useState([]);

  // Fetch Google Places data when component mounts
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const result = await getPlaces();
        setHotelData(result || []);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, []);

  // Helper function to get image URL
  const getImageUrl = (item) => {
    if (item.photos && item.photos.length > 0) {
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${item.photos[0].photo_reference}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`;
    }
    return require("../../assets/images/MyTripsImages/placeholder-1-e1533569576673.webp");
  };

  return (
    <View style={{ marginTop: 10 }}>
      <Text style={styles.title}>🏨 Hotel Recommendations</Text>

      <FlatList
        data={hotelData}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              style={styles.hotelImages}
              source={typeof getImageUrl(item) === "string" ? { uri: getImageUrl(item) } : getImageUrl(item)}
            />
            <View style={styles.hotelName}>
              <Text numberOfLines={1}>{item.name}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontFamily: "outfit-bold",
    color: Colors.BLUE,
    marginHorizontal: 10,
    letterSpacing: 0.5,
    marginBottom: 10,
  },

  card: {
    marginRight: 20,
    width: 200,
  },

  hotelImages: {
    width: "100%",
    height: 140,
    borderRadius: 20,
  },

  hotelName: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: "outfit-medium",
    color: Colors.BLACK,
  },
});