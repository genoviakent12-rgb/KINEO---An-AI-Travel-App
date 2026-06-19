import { Colors } from "@/app-example/constants/theme";
import Feather from "@expo/vector-icons/Feather";
import { useRouter, useLocalSearchParams } from "expo-router";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { SelectBudgetList } from "../../app-example/constants/OptionsBudget";
import { SelectPeopleList } from "../../app-example/constants/OptionsPeople";
import OptionCard from "../../components/CreateTrip/OptionCard";
import { CreateTripContext } from "../../context/CreateTripsContext";

export default function TravelInformation() {
  const router = useRouter();

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [selectedBudget, setSelectedBudget] = useState();

  const { tripData, setTripData } = useContext(CreateTripContext);

  // receive destination from LikedTrips
  const { trip } = useLocalSearchParams();
  const place = trip ? JSON.parse(trip) : null;

  // properly store destination in context
  useEffect(() => {
    if (place) {
      setTripData((prev) => ({
        ...prev,
        locationInfo: {
          name: place.placeName,
          placeImageUrl: place.placeImageUrl,
          capitalCity: place.capitalCity,
          country: place.country,
        },
      }));
    }
  }, [place]);

  const onDateChange = (date, type) => {
    if (type === "START_DATE") {
      setStartDate(moment(date));
    } else {
      setEndDate(moment(date));
    }
  };

  const onDateSelectionContinue = () => {
    if (!startDate || !endDate) {
      Alert.alert("Missing Date", "Please select travel dates first.");
      return;
    }

    if (!selectedOption) {
      Alert.alert("Missing Travellers", "Please select travellers first.");
      return;
    }

    if (!selectedBudget) {
      Alert.alert("Missing Budget", "Please select a budget option.");
      return;
    }

    const totalNoOfDays = endDate.diff(startDate, "days");

    // SAFE MERGE (prevents losing destination + other data)
    setTripData((prev) => ({
      ...prev,
      startDate,
      endDate,
      totalNoOfDays: totalNoOfDays + 1,
      travellers: selectedOption,
      budget: selectedBudget,
    }));

    router.push("../create-trip/review-trip");
  };

  return (
    <ScrollView
      style={styles.containerScrollView}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View style={{ flex: 1 }}>
        
        {/* HEADER IMAGE */}
        <ImageBackground
          source={require("../../assets/images/TravelInformation/TravelDetails.png")}
          style={styles.travelDetailsContainer}
          resizeMode="cover"
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Feather
              name="arrow-left"
              size={30}
              color="#ffffffff"
              style={styles.backButton}
            />
          </TouchableOpacity>
        </ImageBackground>

        {/* CALENDAR TITLE */}
        <Text style={styles.date}>Calendar</Text>

        {/* CALENDAR */}
        <View style={styles.calendarPicker}>
          <CalendarPicker
            onDateChange={onDateChange}
            allowRangeSelection={true}
            minDate={new Date()}
            selectedRangeStyle={{ backgroundColor: Colors.BLUE }}
            selectedDayTextStyle={{ color: Colors.WHITE }}
            todayBackgroundColor={Colors.BLUE}
            selectedDayColor={Colors.BLUE}
            selectedDayTextColor="#FFFFFF"
            textStyle={styles.calendarText}
            todayTextStyle={styles.todayText}
            monthTitleStyle={styles.monthTitleStyle}
            yearTitleStyle={styles.yearTitleStyle}
            weekdays={["S", "M", "T", "W", "T", "F", "S"]}
            previousTitle="←"
            nextTitle="→"
          />
        </View>

        {/* VENTURE SECTION (UNCHANGED DESIGN) */}
        <View style={styles.greyVentureContainer}>
          <Text style={styles.ventureWithText}>Venture With</Text>

          <FlatList
            data={SelectPeopleList}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <OptionCard
                option={item}
                selectedOption={selectedOption}
                onPress={() => setSelectedOption(item)}
              />
            )}
          />

          <Text style={styles.ventureWithText}>Budget</Text>

          <FlatList
            data={SelectBudgetList}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <OptionCard
                option={item}
                selectedOption={selectedBudget}
                onPress={() => setSelectedBudget(item)}
              />
            )}
          />
        </View>

        {/* CONTINUE BUTTON (UNCHANGED DESIGN) */}
        <TouchableOpacity
          onPress={onDateSelectionContinue}
          style={styles.continueButton}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerScrollView: {
    flex: 1,
    backgroundColor: "#fff",
  },

  ventureWithText: {
    fontFamily: "outfit-bold",
    color: Colors.BLUE,
    fontSize: 25,
    paddingLeft: 25,
    marginTop: 30,
    marginBottom: 5,
  },

  greyVentureContainer: {
    marginTop: 0,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
  },

  calendarPicker: {
    backgroundColor: "#fff",
    borderColor: "rgba(81, 81, 81, 0.08)",
    borderWidth: 2,
    borderRadius: 20,
    padding: 20,
    justifyContent: "center",
    marginHorizontal: 16,
    marginTop: 20,
    height: 350,
  },

  travelDetailsContainer: {
    height: 235,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    right: 5,
  },

  backButton: {
    position: "absolute",
    right: 150,
    top: 0,
  },

  date: {
    fontFamily: "outfit-bold",
    color: Colors.BLUE,
    fontSize: 25,
    paddingLeft: 25,
    marginTop: 30,
  },

  continueButton: {
    backgroundColor: Colors.BLUE,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 250,
    alignSelf: "center",
    marginTop: 20,
  },

  continueText: {
    fontFamily: "outfit-medium",
    fontSize: 20,
    color: Colors.WHITE,
  },

  calendarText: {
    fontFamily: "outfit-regular",
    fontSize: 15,
  },

  todayText: {
    fontWeight: "bold",
  },

  monthTitleStyle: {
    fontFamily: "outfit-bold",
    fontSize: 18,
    color: Colors.BLUE,
  },

  yearTitleStyle: {
    fontFamily: "outfit-bold",
    fontSize: 18,
    color: Colors.BLUE,
  },
});