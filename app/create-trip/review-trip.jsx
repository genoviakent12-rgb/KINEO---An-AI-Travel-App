import { Colors } from "@/app-example/constants/theme";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { BlurView } from "expo-blur";
import { useNavigation, useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AI_PROMPT } from "../../app-example/constants/OptionsPeople";
import { chatSession } from "../../configs/AiModel";
import { CreateTripContext } from "../../context/CreateTripsContext";
import { auth, db } from "./../../configs/FirebaseConfig";

export default function ReviewTrip() {
  const navigation = useNavigation();
  const router = useRouter();
  const { tripData } = useContext(CreateTripContext);

  //state for the loading block
  const [isLoading, setIsLoading] = useState(false);

  //get the email and pass authentication from firebase auth
  const user = auth.currentUser;

  //cancel handle if taking too long to load
  const handleCancel = () => {
    setIsLoading(false);
  };

  //Handle continue button
  const handleContinue = () => {
    // Basic validation before showing loading
    if (!tripData?.locationInfo?.name) {
      Alert.alert("Missing Destination", "Please select a destination.");
      return;
    }
    if (!tripData?.travellers?.title) {
      Alert.alert("Missing Travellers", "Please select travellers first.");
      return;
    }
    if (!tripData?.startDate || !tripData?.endDate) {
      Alert.alert("Missing Date", "Please select travel dates first.");
      return;
    }
    if (!tripData?.budget?.title2) {
      Alert.alert("Missing Budget", "Please select a budget option.");
      return;
    }

    // loading animatio will show when continue to button is clicked
    setIsLoading(true);

    // now the method will activate
    GenerateAiTrip();
  };

  // the AI generating
  const GenerateAiTrip = async () => {
    try {
      console.log("STARTING AI TRIP GENERATION");
      // Create the final prompt by replacing placeholders with user's trip data
      const FINAL_PROMPT = AI_PROMPT.replace(
        "{location}",
        tripData?.locationInfo?.name,
      )
        .replace("{totalDays}", tripData?.totalNoOfDays)
        .replace("{totalNights}", tripData?.totalNoOfDays - 1)
        .replace("{travellers}", tripData?.travellers?.title)
        .replace("{budget}", tripData?.budget?.title2)
        .replace("{totalDays}", tripData?.totalNoOfDays)
        .replace("{totalNights}", tripData?.totalNoOfDays - 1);

      // sending the prompt to gemini ai by calling the chatsession in AiModel
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log("AI response sucessfully received");

      // Extract the text response from AI
      let responseText = result.response.text();

      // Remove any markdown code block formatting (```json and ```)
      responseText = responseText
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      console.log(
        "Cleaned response (first 100 chars):",
        responseText.substring(0, 100),
      );

      // parsing or converting the ai response into javascript object
      const tripResp = JSON.parse(responseText);
      console.log("Parsing from text to JSON success");

      // Generate a unique document ID using current timestamp
      const docId = Date.now().toString();
      console.log("Generated a document ID: ", docId);

      //saving the NewTripData into the firebase firestore database
      console.log("Saving to Firebase Database");
      await setDoc(doc(db, "NewUserTrips", docId), {
        userEmail: user?.email || "unknown",

        destination: {
          name: tripData?.locationInfo?.name,
          full: tripData?.locationInfo,
        },

        budget: tripData?.budget?.title2,
        travellers: tripData?.travellers?.title,
        dates: {
          start: tripData?.startDate ? tripData.startDate.toISOString() : null,

          end: tripData?.endDate ? tripData.endDate.toISOString() : null,

          days: tripData?.totalNoOfDays,
        },

        tripPlan: tripResp,
        tripData: JSON.stringify(tripData),
        createdAt: Date.now(),
        docId: docId,
      });

      console.log("Successfully saved to Firebase");
      console.log("AI TRIP GENERATION COMPLETE");

      // 3.5 seconds of loading screen and then pushing to the mytrip tab
      setTimeout(() => {
        setIsLoading(false);
        router.push("../(tabs)/mytrip");
      }, 3500);
    } catch (error) {
      //hiding it when done
      setIsLoading(false);

      // Handle specific error types with appropriate user messages
      if (error.status === 429) {
        // User exceeded their daily AI request quota
        Alert.alert(
          "Quota Exceeded",
          "You've used all your daily AI requests. Please try again tomorrow.",
        );
      } else if (error.message.includes("JSON Parse")) {
        // AI returned invalid JSON format
        Alert.alert(
          "AI Response Error",
          "The AI returned an invalid format. Please try again.",
        );
      } else {
        // Generic error handler for all other errors
        Alert.alert("Error", "Failed to generate trip: " + error.message);
      }
    }
  };

  // Set navigation header options
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTransparent: true,
      headerTitle: "",
    });
  }, [navigation]);

  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={styles.background}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={30} color="#000000ff" />
          </TouchableOpacity>

          <Text style={styles.tripReviewText}>Trip Review</Text>

          <Text style={styles.tripNameText}>Trip Name</Text>

          <TextInput
            style={styles.changeTripName}
            placeholder="Customize Name"
            placeholderTextColor="#aaaaaa7b"
            autoCapitalize="none"
          />

          <View style={styles.container}>
            <Text style={styles.destinationText}>Destination</Text>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.changeAllOptions}
            >
              <Octicons name="pencil" size={30} color="grey" style={{top:20}}/>
            </TouchableOpacity>
            <Text style={styles.destinationName}>
              {tripData?.locationInfo?.name || "Not selected"}
            </Text>

            <Octicons
              name="location"
              size={27}
              color="black"
              style={styles.locationIcon}
            />

            <View style={styles.travellerContainer}>
              <Text style={styles.travellersText}>Travellers</Text>
              <Text style={styles.travellerCount}>
                {tripData?.travellers?.title || "Not selected"}
              </Text>
              <Octicons
                name="people"
                size={27}
                color="#0B5ED7"
                style={styles.travellersIcon}
              />
            </View>

            <View style={styles.dateContainer}>
              <Text style={styles.datesText}>Dates</Text>
              <Text style={styles.dateCount}>
                {tripData?.startDate && tripData?.endDate
                  ? `${moment(tripData.startDate).format("DD MMM")} to ${moment(
                      tripData.endDate,
                    ).format("DD MMM")} (${tripData.totalNoOfDays || "?"} days)`
                  : "Not selected"}
              </Text>
              <Feather
                name="calendar"
                size={27}
                color="black"
                style={styles.datesIcon}
              />
            </View>

            <View style={styles.costContainer}>
              <Text style={styles.costText}>Cost</Text>
              <Text style={styles.costTotal}>
                {tripData?.budget?.title2 && tripData?.budget?.desc2
                  ? `${tripData.budget.title2}, ${tripData.budget.desc2}`
                  : "Not selected"}
              </Text>
              <FontAwesome
                name="money"
                size={27}
                color="#0B5ED7"
                style={styles.costIcon}
              />
            </View>
          </View>

          <View style={styles.continueButton}>
            <TouchableOpacity onPress={handleContinue}>
              <Text style={styles.continueText}>Continue to Trip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Loading Modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isLoading}
        statusBarTranslucent={true}
      >
        <BlurView
          intensity={10}
          tint="light"
          style={[StyleSheet.absoluteFill, { borderRadius: 24 }]}
        />
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingCard}>
            <TouchableOpacity style={styles.xButton} onPress={handleCancel}>
              <MaterialCommunityIcons
                name="exit-to-app"
                size={24}
                color="#0B5ED7"
              />
            </TouchableOpacity>

            <Image
              source={require("../../assets/images/TripReview/loadingScreen.gif")}
              style={styles.loadingGif}
              resizeMode="contain"
            />

            <Text style={styles.generatingText}>
              Generating the best trip for you...
            </Text>

            <ActivityIndicator
              size="large"
              color={Colors.BLUE}
              style={{ marginTop: 20 }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#fff",
    height: 1000,
  },
  container: {
    marginTop: -50,
  },
  map: {
    position: "absolute",
    width: 700,
    height: 700,
    zIndex: 1,
    opacity: 0.2,
    top: 150,
    left: -40,
    transform: [{ rotate: "20deg" }],
  },
  tripReviewText: {
    fontFamily: "outfit-bold",
    color: Colors.BLUE,
    fontSize: 35,
    marginTop: 100,
    top: -25,
    textAlign: "center",
    zIndex: 2,
  },
  tripNameText: {
    fontFamily: "outfit-medium",
    fontSize: 18,
    color: Colors.BLACK,
    paddingLeft: 20,
    paddingTop: 10,
    marginBottom: 10,
    zIndex: 2,
  },
  backButton: {
    position: "absolute",
    paddingLeft: 20,
    paddingTop: 80,
    zIndex: 3,
  },
  changeTripName: {
    fontFamily: "outfit-medium",
    backgroundColor: Colors.WHITE,
    marginTop: 6,
    borderColor: Colors.BLUE,
    borderWidth: 1.2,
    borderRadius: 30,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: Colors.BLUE,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 350,
    height: 60,
    left: 20,
    zIndex: 2,
  },
  destinationText: {
    fontFamily: "outfit-medium",
    color: Colors.GREY,
    fontSize: 20,
    top: 105,
    left: 80,
    zIndex: 2,
  },
  destinationName: {
    fontFamily: "outfit-bold",
    color: Colors.BLUE,
    fontSize: 20,
    top: 78,
    left: 80,
    zIndex: 2,
  },
  locationIcon: {
    paddingLeft: 35,
    paddingTop: 40,
    zIndex: 2,
  },
  travellerContainer: {
    marginTop: -70,
  },
  travellersText: {
    fontFamily: "outfit-medium",
    color: Colors.GREY,
    fontSize: 20,
    top: 115,
    left: 80,
    zIndex: 2,
  },
  travellerCount: {
    fontFamily: "outfit-bold",
    fontSize: 20,
    top: 115,
    left: 80,
    zIndex: 2,
  },
  travellersIcon: {
    paddingLeft: 35,
    paddingTop: 80,
    zIndex: 2,
  },
  dateContainer: {
    marginTop: -70,
  },
  datesText: {
    color: Colors.GREY,
    fontFamily: "outfit-medium",
    fontSize: 20,
    top: 115,
    left: 80,
    zIndex: 2,
  },
  dateCount: {
    fontFamily: "outfit-bold",
    color: Colors.BLUE,
    fontSize: 20,
    top: 115,
    left: 80,
    zIndex: 2,
  },
  datesIcon: {
    paddingLeft: 35,
    paddingTop: 80,
    zIndex: 2,
  },
  costContainer: {
    marginTop: -70,
    zIndex: 2,
  },
  costText: {
    color: Colors.GREY,
    fontFamily: "outfit-medium",
    fontSize: 20,
    top: 115,
    left: 80,
    zIndex: 2,
  },
  costTotal: {
    fontFamily: "outfit-bold",
    fontSize: 20,
    top: 115,
    left: 80,
    zIndex: 2,
  },
  costIcon: {
    paddingLeft: 35,
    paddingTop: 80,
    zIndex: 2,
  },
  changeAllOptions: {
    paddingLeft: 25,
    top: 440,
    zIndex: 2,
  },
  continueText: {
    fontFamily: "outfit-medium",
    fontSize: 25,
    color: Colors.WHITE,
    textAlign: "center",
    marginTop: 15,
    zIndex: 2,
  },
  continueButton: {
    marginTop: 70,
    marginLeft: 70,
    height: 60,
    width: 300,
    backgroundColor: Colors.BLUE,
    borderRadius: 40,
    zIndex: 2,
  },
  loadingOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 40,
    alignItems: "center",
    width: "85%",
    maxWidth: 360,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  xButton: {
    position: "absolute",
    top: 16,
    right: 16,
    padding: 8,
    zIndex: 10,
  },
  loadingGif: {
    width: 330,
    height: 200,
    marginBottom: 20,
  },
  generatingText: {
    fontFamily: "outfit-bold",
    fontSize: 22,
    color: Colors.BLUE,
    textAlign: "center",
    marginBottom: 16,
  },
});
