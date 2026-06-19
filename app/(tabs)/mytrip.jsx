import { Colors } from "@/app-example/constants/theme";
import { useRouter } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import StartNewTripsCard from "../../components/MyTrips/StartNewTripsCard";
import UserTripList from "../../components/MyTrips/UserTripList";
import LikedTrips from "../../components/MyTrips/LikedTrips";
import { auth, db } from "./../../configs/FirebaseConfig";

export default function MyTrip() {
  const router = useRouter();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setIsLoading] = useState(false);

  // TRACKS WHICH TAB IS CURRENTLY ACTIVE - "ongoing" OR "liked"
  const [activeTab, setActiveTab] = useState("ongoing"); // FIX: was written as useState=("ongoing") which is wrong syntax

  const user = auth.currentUser;

  // GETUSERTRIPS WILL NOT RUN UNTIL THERE IS A USER LOGGED IN
  useEffect(() => {
    user && GetMyTrips();
  }, [user]); // FIX: removed the extra stray semicolon after the closing bracket

  // ASYNC AND AWAIT MAKES THE CODE BEHAVE MORE SYNCHRONOUSLY
  // WAITING FOR EACH STEP BEFORE STARTING THE NEXT, WHICH MAKES IT
  // READABLE AND PREVENTS UI FREEZING

  // FETCHES ALL TRIPS BELONGING TO THE CURRENTLY LOGGED IN USER
  const GetMyTrips = async () => {
    setIsLoading(true);

    // RESET TRIPS LIST WHENEVER LOADING NEW DATA TO PREVENT STALE ENTRIES
    setUserTrips([]);

    // QUERY THE DATABASE FOR DOCUMENTS WHERE userEmail MATCHES THE CURRENT USER
    const q = query(
      collection(db, "NewUserTrips"),
      where("userEmail", "==", user?.email)
    );

    // PAUSE HERE UNTIL ALL MATCHING DOCUMENTS ARE RETRIEVED FROM FIRESTORE
    const querySnapshot = await getDocs(q);

    // LOOP THROUGH EACH DOCUMENT AND APPEND IT TO THE TRIPS STATE
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserTrips((prev) => [...prev, doc.data()]);
    });

    setIsLoading(false);
  };

  return (
    <ScrollView
      style={styles.containerScrollView}
      contentContainerStyle={{
        paddingBottom: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
      }}
    >
      <View>
        {/* PAGE TITLE */}
        <Text style={styles.myTripsText}>My Trips</Text>

        {/* PILL TOGGLE — SWITCHES BETWEEN ONGOING TRIPS AND LIKED TRIPS */}
        <View style={styles.tabContainer}>

          {/* ONGOING TRIPS TAB — ACTIVE BY DEFAULT */}
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "ongoing" && styles.tabActive,
            ]}
            onPress={() => setActiveTab("ongoing")}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "ongoing" && styles.tabTextActive,
              ]}
            >
              On Going Trips
            </Text>
          </TouchableOpacity>

          {/* LIKED TRIPS TAB — OPENS THE LIKEDTRIPS COMPONENT WHEN PRESSED */}
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "liked" && styles.tabActive,
            ]}
            onPress={() => setActiveTab("liked")}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "liked" && styles.tabTextActive,
              ]}
            >
              Liked Trips
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* CONDITIONALLY RENDER CONTENT BASED ON WHICH TAB IS SELECTED */}
      {activeTab === "ongoing" ? (
        <>
          {/* SHOW LOADING SPINNER WHILE TRIPS ARE BEING FETCHED */}
          {loading && (
            <ActivityIndicator size={"large"} color={Colors.PRIMARY} />
          )}

          {/* IF NO TRIPS EXIST SHOW THE EMPTY STATE CARD, OTHERWISE SHOW THE TRIP LIST */}
          {userTrips?.length === 0 ? (
            <StartNewTripsCard />
          ) : (
            <UserTripList userTrips={userTrips} />
          )}
        </>
      ) : (
        // RENDER THE LIKED TRIPS SCREEN WHEN THE LIKED TAB IS ACTIVE
        <LikedTrips />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
 
  containerScrollView: {
    flex: 1,
    backgroundColor: "#fff",
  },

  myTripsText: {
    textAlign: "center",
    paddingTop: 0,
    padding: 15,
    fontFamily: "outfit-bold",
    fontSize: 30,
  },

  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#EFEFEF",
    borderRadius: 50,
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 4,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  tabActive: {
    backgroundColor: Colors.BLUE,
  },

  tabText: {
    fontFamily: "outfit-bold",
    fontSize: 15,
    color: "#888",
  },

  tabTextActive: {
    color: "#fff",
  },
});