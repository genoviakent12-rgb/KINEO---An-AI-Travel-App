import { Colors } from "@/app-example/constants/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation, useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { auth } from "../../../configs/FirebaseConfig";

export default function Sign() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const onSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim()
      );

      console.log("Signed in:", userCredential.user.uid);

      router.replace("/mytrip");
    } catch (error) {
      console.log("Firebase error:", error.code);

      if (error.code === "auth/invalid-email") {
        Alert.alert("Invalid Email", "Please enter a valid email.");
      } else if (error.code === "auth/user-not-found") {
        Alert.alert("User Not Found", "No account exists with this email.");
      } else if (error.code === "auth/wrong-password") {
        Alert.alert("Wrong Password", "Incorrect password.");
      } else if (error.code === "auth/invalid-credential") {
        Alert.alert("Invalid Credentials", "Email or password is incorrect.");
      } else {
        Alert.alert("Login Failed", "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerWrapper}>
        <View style={styles.headerBack} />
        <View style={styles.header} />
      </View>

      <Image
        source={require("../../../assets/images/login_page/Logo_Nature.png")}
        style={styles.largeLogo}
      />

      <View style={styles.content}>
        <Text style={styles.title}>KINEO</Text>
        <Text style={styles.subtitle}>Let&apos;s Sign You In</Text>

        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#0165bcff" />
        </TouchableOpacity>

        <Text style={styles.welcome}>Ready To Get Travellin&apos;?</Text>

        <View style={styles.inputContainer}>
          {/* EMAIL */}
          <Text style={styles.label}>Email</Text>

          <TextInput
            value={email}
            style={styles.input}
            onChangeText={setEmail}
            placeholder="Enter Email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* PASSWORD */}

          <Text style={styles.password}>Password</Text>

          <TextInput
            value={password}
            secureTextEntry
            style={styles.inputPassWord}
            onChangeText={setPassword}
            placeholder="Enter Password"
            placeholderTextColor="#aaa"
            autoCapitalize="none"
          />

          {/* SIGN IN */}
          <TouchableOpacity
            onPress={onSignIn}
            style={styles.signInButton}
            disabled={loading}
          >
            <Text style={styles.signIn}>
              {loading ? "Signing In..." : "Sign In"}
            </Text>
          </TouchableOpacity>

          {/* CREATE ACCOUNT */}

          <TouchableOpacity
            onPress={() => router.push("/auth/create-account")}
            style={styles.createAccountButton}
          >
            <Text style={styles.createAccount}>Create Account</Text>
          </TouchableOpacity>

          {/* CONTINUE AS GUEST */}

          <TouchableOpacity onPress={() => router.replace("/discover")}>
            <Text style={styles.withoutSignIn}>Continue as Guest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  headerWrapper: {
    position: "absolute",
    top: -260,
    left: -100,
    right: -100,
    height: 525,
    overflow: "hidden",
    zIndex: 1,
  },

  header: {
    width: "100%",
    height: "93%",
    backgroundColor: Colors.BLUE,
    borderBottomLeftRadius: 320,
    borderBottomRightRadius: 320,
    zIndex: 2,
  },

  headerBack: {
    position: "absolute",
    top: 50,
    width: "100%",
    height: "90%",
    backgroundColor: Colors.BLUE,
    opacity: 0.2,
    borderBottomLeftRadius: 320,
    borderBottomRightRadius: 320,
  },

  largeLogo: {
    position: "absolute",
    top: -90,
    right: -30,
    width: 380,
    height: 380,
    resizeMode: "contain",
    opacity: 0.9,
    zIndex: 3,
    transform: [{ rotate: "-20deg" }],
  },

  content: {
    paddingHorizontal: 28,
    paddingTop: 140,
  },

  title: {
    color: Colors.WHITE,
    fontFamily: "outfit-bold",
    fontSize: 96,
    top: -80,
    textAlign: "center",
  },

  subtitle: {
    color: Colors.WHITE,
    fontFamily: "outfit-medium",
    fontSize: 26,
    textAlign: "center",
    top: -72,
  },

  welcome: {
    color: Colors.BLUE,
    fontFamily: "outfit-medium",
    fontSize: 25,
    marginTop: 25,
  },

  inputContainer: {
    marginTop: 40,
  },

  label: {
    color: "#000",
    fontFamily: "outfit-medium",
    fontSize: 16,
    marginLeft: 5,
    marginBottom: 8,
  },

  password: {
    color: "#000",
    fontFamily: "outfit-medium",
    fontSize: 16,
    marginTop: 15,
    marginLeft: 5,
    marginBottom: 3,
  },

  input: {
    backgroundColor: Colors.WHITE,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    elevation: 3,
  },

  inputPassWord: {
    backgroundColor: Colors.WHITE,
    marginTop: 5,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    elevation: 3,
  },

  signInButton: {
    padding: 15,
    backgroundColor: Colors.BLUE,
    borderRadius: 99,
    marginTop: 50,
  },

  signIn: {
    color: Colors.WHITE,
    textAlign: "center",
    fontFamily: "outfit-medium",
    fontSize: 16,
  },

  createAccountButton: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 99,
    marginTop: 30,
    borderWidth: 1,
    borderColor: Colors.BLUE,
  },

  createAccount: {
    color: Colors.BLUE,
    textAlign: "center",
    fontFamily: "outfit-medium",
    fontSize: 16,
  },

  withoutSignIn: {
    color: Colors.BLUE,
    fontFamily: "outfit-medium",
    textAlign: "center",
    fontSize: 16,
    marginTop: 15,
  },
});