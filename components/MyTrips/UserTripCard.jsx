import { Colors } from "@/app-example/constants/theme";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import moment from "moment";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
//small ones
export default function UserTripCard({ trip }) {
  const router = useRouter();

  const parsedTripData = trip?.tripData ? JSON.parse(trip.tripData) : null;

  return (
    <View style={styles.containerOtherTrips}>
      {/* Image of trip */}
      <Image
        source={{
          uri:
            parsedTripData?.locationInfo?.placeImageUrl ||
            trip?.destination?.full?.placeImageUrl ||
            "https://via.placeholder.com/400",
        }}
        style={styles.otherTripImages}
        resizeMode="cover"
      />

        {/* Location of trip */}
      <View style={styles.textsContainer}>
        <View>
          <Text style={styles.title}>
            {trip?.tripPlan?.travelPlan?.location}
          </Text>

          <Text style={styles.subText}>
            {parsedTripData?.startDate
              ? moment(parsedTripData.startDate).format("DD MMM, YYYY")
              : ""}
          </Text>

          <Text style={styles.subText}>
            {parsedTripData?.travellers?.title}
          </Text>

          <Text style={styles.subText}>
            Budget: 
          </Text>
        </View>

        
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.removeButton}>
            <Feather name="x" size={25} color="#d70b0bff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.proceedButton}
            onPress={() =>
              router.push({
                pathname: "/trip-detail",
                params: {
                  trip: JSON.stringify(trip),
                },
              })
            }
          >
            <Feather name="arrow-up-right" size={25} color="#62e169ff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerOtherTrips: {
    flexDirection: "row",
    borderColor: Colors.GREY,
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 10,
    padding: 15,
    backgroundColor: "#fff",
    width: 355,
  },
  otherTripImages: {
    borderRadius: 15,
    height: 110,
    width: 110,
  },
  textsContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 18,
  },
  subText: {
    fontFamily: "outfit-medium",
    marginTop: 4,
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  proceedButton: {
    marginLeft: 12,
    padding: 6,
  },
  removeButton: {
    marginLeft: 12,
    padding: 6,
  },
});
