import { Colors } from "@/app-example/constants/theme";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRouter } from "expo-router";
import { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { defaultPlaces } from "../../app-example/constants/RandomPlaces";
import { chatSession } from "../../configs/RandomPlacesAi";
import { CreateTripContext } from "../../context/CreateTripsContext";
import { LikedTripsContext } from "../../context/LikedTripsContext";

// CARD WITH BUILT-IN LOADING STATE PER IMAGE
const DestinationCard = ({ card }) => {
  const [loaded, setLoaded] = useState(false);

  const Subscription = ({ card }) => { 
    const [subscribed, setSubscribed] = useState(false); 
    
  }
  return (
    <View style={styles.card}>
      {/* SHIMMER PLACEHOLDER SHOWN WHILE IMAGE LOADS */}
      {!loaded && (
        <View style={styles.placeholder}>
          <ActivityIndicator size="large" color="#0B5ED7" />
        </View>
      )}
      <Image
      source={card.placeImage ? card.placeImage : { uri: card.placeImageUrl }}
      style={[styles.cardImage, !loaded && { opacity: 0 }]}
      onLoad={() => setLoaded(true)}
      fadeDuration={300}
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.cardInfo}
      >
        <Text style={styles.cardTitle}>{card.placeName}</Text>
        <Text style={styles.cardLocation}>
          {card.capitalCity}, {card.country}
        </Text>
      </LinearGradient>
    </View>
  );
};

export default function Discover() {
  const navigation = useNavigation();
  const router = useRouter();
  const swiperRef = useRef(null);

  const { setTripData } = useContext(CreateTripContext);
  const { addLikedTrip } = useContext(LikedTripsContext);

  const [places, setPlaces] = useState(defaultPlaces);
  const [swiperKey, setSwiperKey] = useState(0);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTransparent: true,
    });
  }, []);

  const getRandomPlaces = async () => {
    try {
      const result = await chatSession.sendMessage(
        "Return ONLY valid JSON array of 10 RANDOM famous travel places. Make sure results are different each time. Include placeName, placeImageUrl, description, capitalCity, country.",
      );

      const text = await result.response.text();
      const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsedData = JSON.parse(cleaned);

      if (Array.isArray(parsedData)) {
        setPlaces(parsedData);
        setSwiperKey((prev) => prev + 1);
        setTimeout(() => {
          swiperRef.current?.jumpToCardIndex(0);
        }, 100);
        console.log("Destinations Refreshed");
      } else {
        console.error("AI response is not array:", parsedData);
      }
    } catch (error) {
      console.error("Gemini error:", error);
    }
  };

  const handleLike = async (index) => {
    if (!places[index]) return;
    await addLikedTrip(places[index]);
    console.log("Liked:", places[index].placeName);
  };

  const handleDislike = (index) => {
    if (!places[index]) return;
    console.log("Passed:", places[index].placeName);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* HEADER IMAGE + SEARCH */}
      <ImageBackground
        source={require("./../../assets/images/login_page/Explore-top-picture.png")}
        style={styles.imageContainer}
        imageStyle={{
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
        }}
      >
        <View style={{ top: 80 }}>
          <View style={styles.searchContainer}>
            <FontAwesome name="search" size={20} color="#fff" />
            <GooglePlacesAutocomplete
              placeholder="Search"
              placeholderTextColor="#fff"
              fetchDetails={true}
              keyboardShouldPersistTaps="handled"
              onPress={(data, details = null) => {
                setTripData({
                  locationInfo: {
                    name: data.description,
                    coordinates: details?.geometry.location || null,
                    photoRef: details?.photos?.[0]?.photo_reference || null,
                    url: details?.url || null,
                  },
                });
                router.push("../create-trip/travelInformation");
              }}
              query={{
                key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
                language: "en",
              }}
              listViewDisplayed="auto"
              debounce={400}
              enablePoweredByContainer={false}
              minLength={2}
              styles={{
                container: { flex: 1, zIndex: 9999 },
                textInputContainer: {
                  flex: 1,
                  backgroundColor: "transparent",
                  height: 50,
                },
                textInput: {
                  fontSize: 18,
                  fontFamily: "outfit",
                  color: "#fff",
                  paddingLeft: 10,
                  backgroundColor: "transparent",
                },
                listView: {
                  position: "absolute",
                  backgroundColor: "#fff",
                  borderRadius: 12,
                  marginTop: 10,
                  borderWidth: 1,
                  borderColor: "#e0e0e0",
                  maxHeight: 360,
                  top: 45,
                  left: -35,
                  right: -15,
                  zIndex: 999,
                  elevation: 8,
                },
                row: { padding: 13, backgroundColor: "#fff" },
                separator: { backgroundColor: "#e0e0e0" },
              }}
            />
          </View>
        </View>
      </ImageBackground>

      {/* TITLE + REFRESH */}
      <View style={styles.title}>
        <Text style={styles.popular}>Popular Destinations</Text>
        <TouchableOpacity onPress={getRandomPlaces}>
          <EvilIcons
            name="refresh"
            size={40}
            color="#0B5ED7"
            style={styles.refresh}
          />
        </TouchableOpacity>
      </View>

      {/* SWIPER */}
      <View style={styles.swiperContainer}>
        <Swiper
          key={swiperKey}
          ref={swiperRef}
          cards={places}
          renderCard={(card) => {
            if (!card) return null;
            return <DestinationCard card={card} />;
          }}
          onSwipedLeft={handleDislike}
          onSwipedRight={handleLike}
          backgroundColor="transparent"
          stackSize={10}
          stackSeparation={5}
          stackScale={0.92}
          overlayLabels={{
            left: {
              title: "I'll Pass!",
              style: {
                label: {
                  fontFamily: "outfit-bold",
                  color: "#fff",
                  fontSize: 30,
                },
                wrapper: {
                  flex: 1,
                  backgroundColor: "rgba(249, 0, 0, 0.35)",
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                  height: 460,
                  left: -5,
                },
              },
            },
            right: {
              title: "I want to go here!",
              style: {
                label: {
                  fontFamily: "outfit-bold",
                  color: "#fff",
                  fontSize: 30,
                },
                wrapper: {
                  flex: 1,
                  backgroundColor: "rgba(41, 250, 4, 0.36)",
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                  height: 460,
                  right: -5
                },
              },
            },
          }}
          cardVerticalMargin={25}
          useViewOverflow
          showSecondCard={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "rgba(71, 71, 71, 0.15)",
    paddingHorizontal: 15,
    height: 50,
  },

  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 15,
  },

  popular: {
    fontSize: 25,
    color: Colors.BLUE,
    fontFamily: "outfit-bold",
    marginTop: 5,
  },

  refresh: {
    top: 10,
  },

  swiperContainer: {
    alignItems: "center",
    marginVertical: 20,
  },

  card: {
    width: 350,
    borderRadius: 20,
    overflow: "hidden",
    marginLeft: 5,
  },

  // GRAY PLACEHOLDER SHOWN WHILE IMAGE IS LOADING
  placeholder: {
    position: "absolute",
    width: "100%",
    height: 460,
    backgroundColor: "#d0d0d0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },

  cardImage: {
    width: "100%",
    height: 460,
  },

  cardInfo: {
    position: "absolute",
    bottom: 0,
    padding: 20,
    width: "100%",
  },

  cardTitle: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },

  cardLocation: {
    fontSize: 18,
    color: "#fff",
  },
});
