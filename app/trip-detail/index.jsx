import { Colors } from "@/app-example/constants/theme";
import Feather from "@expo/vector-icons/Feather";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Hotels from "../../components/TripDetails/Hotels";
import PlannedTrips from "../../components/TripDetails/PlannedTrips";

export default function Index() {
  const navigation = useNavigation();
  const { trip } = useLocalSearchParams();
  const [tripDetails, setTripDetails] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTransparent: true,
      headerTitle: "",
    });

    const parsed = JSON.parse(trip); // converts raw string from URL params into an object
    const parsedTripData = JSON.parse(parsed.tripData); // parses nested tripData string into an object
    setTripDetails({ ...parsed, tripData: parsedTripData }); // saves parsed trip to state
  }, []);

  return (
    tripDetails && (
      <View>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View>
            <View style={styles.headerRow}>
              {/* Back Button */}
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" size={30} color={Colors.BLACK} />
              </TouchableOpacity>

              {/* Title */}
              <Text style={styles.ItineraryText}>Travel Itinerary</Text>

  
            </View>
            <Image
              source={{
                uri:
                  "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
                  tripDetails?.tripData?.locationInfo?.photoRef +
                  "&key=" +
                  process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
              }}
              style={styles.mainDestination}
              resizeMode="cover"
            />
            <Text style={styles.title}>
              {tripDetails?.tripPlan?.travelPlan?.location}
            </Text>
          </View>

          <View>
            {/* TRIP PLANNER INFORMATION */}
            <PlannedTrips
              itineraryInfo={tripDetails?.tripPlan?.travelPlan?.itinerary}
            />

            {/* HOTEL RECO */}
            <Hotels HotelReco={tripDetails?.tripPlan?.travelPlan?.hotels} />
          </View>

          <View style={styles.emptySpace}>
            
          </View>
        </ScrollView>

        <View style={styles.bookButton}>
          <TouchableOpacity style={styles.bookButtonInner}>
            <Text style={styles.bookButtonText}>Book</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
  },

  ItineraryText: {
    fontFamily: "outfit-bold",
    fontSize: 35,
    color: Colors.BLUE,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 25,
    marginRight: 50, 
  },

  title: {
    fontFamily: "outfit-bold",
    fontSize: 30,
    marginTop: 15,
    color: Colors.BLACK,
    textAlign: "center",
    marginBottom: -20,
  },

  mainDestination: {
    borderRadius: 20,
    width: "95%",
    height: 180,
    alignSelf: "center",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 20,
  },

  bookButton: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: Colors.BLUE,
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 99,
  },

  bookButtonInner: {
    paddingVertical: 16,
    alignItems: "center",
  },

  bookButtonText: {
    color: "#fff",
    fontFamily: "outfit-bold",
    fontSize: 18,
  },

  emptySpace: { 
    marginTop: 95,
  },
});
