import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useState } from "react";
import { CreateTripContext } from '../context/CreateTripsContext';
import LikedTripsProvider from "../context/LikedTripsContext"; // NEW IMPORT

export default function RootLayout() {
  useFonts({
    outfit: require("../assets/fonts/Rubik-Regular.ttf"),
    "outfit-medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "outfit-bold": require("../assets/fonts/Rubik-Bold.ttf"),
  });

  const [tripData, setTripData] = useState([]);

  return (
    // LIKEDTRIPSPROVIDER WRAPS EVERYTHING SO THE LIKED TRIPS CONTEXT
    // IS AVAILABLE ON EVERY SCREEN INCLUDING DISCOVER AND MYTRIP
    <LikedTripsProvider>
      
      <CreateTripContext.Provider value={{ tripData, setTripData }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </CreateTripContext.Provider>

    </LikedTripsProvider>
  );
}