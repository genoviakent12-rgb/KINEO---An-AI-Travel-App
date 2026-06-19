import { Colors } from '@/app-example/constants/theme';
import { useRouter } from "expo-router";
import React from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const router = useRouter(); //use router so when a button is clicked, it will redirect to another page

  // Create animated value for container slide-up
  const slideAnim = React.useRef(new Animated.Value(500)).current; // start off-screen (500px down)

  // Animate container when component mounts
  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0, // slide to original position
      duration: 600, // animation duration in ms
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("./../assets/images/login_page/bali_login.png")}
        style={{
          width: "105%",
          top: 0,
          height: 425,
        }}
      />

      <Text style={styles.slogan}>Always in Motion</Text>

      {/* Animated container */}
      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateY: slideAnim }], overflow: "hidden" },
        ]}
      >
        <Text style={styles.dontMissOut}>Don&apos;t Miss Out!</Text>

        {/* Benefits Container */}
        <View style={styles.benefitsContainer}>
          <Image
            source={require("./../assets/images/login_page/discount.png")} // Discount Picture
            style={{
              position: "absolute",
              top: 25,
              left: 35,
              width: 25,
              height: 33,
              resizeMode: "contain",
            }}
          />

          <Image
            source={require("./../assets/images/login_page/access.png")} // Access Picture
            style={{
              position: "absolute",
              top: 75,
              left: 35,
              width: 25,
              height: 35,
              resizeMode: "contain",
            }}
          />

          <Image
            source={require("./../assets/images/login_page/book.png")} // Booking Picture
            style={{
              position: "absolute",
              top: 129,
              left: 35,
              width: 27,
              height: 35,
              resizeMode: "contain",
            }}
          />

          <Image
            source={require("./../assets/images/login_page/check.png")} // Benefits Picture
            style={{
              position: "absolute",
              top: 178,
              left: 35,
              width: 25,
              height: 32,
              resizeMode: "contain",
            }}
          />

          <Text style={styles.benefitText}>Exclusive Discounts</Text>
          <Text style={styles.benefitText}>Instant Access</Text>
          <Text style={styles.benefitText}>Faster Bookings</Text>
          <Text style={styles.benefitText}>And More Benefits</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("auth/sign-in")}
        >
          <Text
            style={{
              color: Colors.BLUE, //SIGN IN BUTTON
              textAlign: "center",
              fontFamily: "outfit-bold",
              fontSize: 20,
            }}
          >
            Sign in to Unlock Benefits
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text
            style={styles.continue}
            onPress={() => router.push("/discover")}
          >
            Continue as Guest
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BLUE,
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    top: -25,
    height: "100%",
    padding: 15,
  },

  logo: {
    //KINEO TEXT
    position: "absolute",
    top: 75, // adjust for status bar
    left: 40,
    fontSize: 80,
    fontFamily: "outfit-bold",
    color: Colors.WHITE, // white looks best on images
  },

  slogan: {
    top: 130, // adjust for status bar
    left: 42,
    fontSize: 16.5,
    fontFamily: "outfit-medium",
    color: "#EAF2FF", // white looks best on images
  },

  button: {
    padding: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 99,
    marginTop: "3%",
  },

  dontMissOut: {
    fontFamily: "outfit-bold",
    fontSize: 30,
    textAlign: "center",
    margin: 4,
    marginBottom: "6%",
    color: Colors.WHITE,
  },

  benefitsContainer: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 20,
    paddingVertical: 15,
    paddingLeft: 80,
    marginTop: -3,
    marginHorizontal: 10,
    marginBottom: 10,
  },

  benefitText: {
    fontFamily: "outfit-medium",
    margin: 5,
    fontSize: 20,
    textAlign: "left",
    paddingVertical: 10,
    color: Colors.WHITE,
  },

  continue: {
    fontFamily: "outfit-bold",
    fontSize: 15,
    textAlign: "center",
    margin: 20,
    color: Colors.WHITE,
  },
});
