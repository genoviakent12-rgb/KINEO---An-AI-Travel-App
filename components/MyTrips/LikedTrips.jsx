import { Colors } from "@/app-example/constants/theme";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { useContext } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LikedTripsContext } from "../../context/LikedTripsContext";

export default function LikedTrips() {
  const { likedTrips = [], removeLikedTrip } = useContext(LikedTripsContext);
  const router = useRouter();

  if (!likedTrips || likedTrips.length === 0) {
    return (
      <View style={[styles.emptyContainer, {height:"100%"}]}>
        <Text style={styles.emptyText}>No liked trips yet!</Text>
        <Text style={styles.emptySubText}>
          Swipe right on a destination to save it here.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.listContainer}>
      {likedTrips.map((item, index) => {
        if (!item) return null;

        return (
          <View key={item.docId || index} style={styles.card}>
            <Image
              source={{ uri: item.placeImageUrl }}
              style={styles.cardImage}
            />

            <View style={styles.cardInfo}>
              <Text style={styles.placeName}>
                {item.placeName || "Unknown Place"}
              </Text>
              <Text style={styles.location}>
                {item.capitalCity || "Unknown City"},{" "}
                {item.country || "Unknown Country"}
              </Text>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeLikedTrip(item.docId)}
              >
                <Feather name="x" size={25} color="red" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.proceedButton}
                onPress={() =>
                  router.push({
                    pathname: "/create-trip/travelInformation",
                    params: {
                      trip: JSON.stringify(item),
                    },
                  })
                }
              >
                <Feather name="arrow-up-right" size={25} color="green" />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: "center",
    marginTop: 250,
    paddingHorizontal: 30,
  },
  emptyText: {
    fontFamily: "outfit-bold",
    fontSize: 20,
    color: Colors.BLUE,
    marginBottom: 8,
  },
  emptySubText: {
    fontFamily: "outfit-medium",
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#eee",
    overflow: "hidden", // prevents image overflow
  },
  cardImage: {
    width: 90,
    height: 90,
  },
  cardInfo: {
    flex: 1,
    paddingHorizontal: 14,
  },
  placeName: {
    fontFamily: "outfit-bold",
    fontSize: 16,
    color: Colors.BLUE,
  },
  location: {
    fontFamily: "outfit",
    fontSize: 13,
    color: "#888",
  },
  buttonRow: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 6,
  },
  removeButton: {
    padding: 4,
  },
  proceedButton: {
    padding: 4,
  },
});