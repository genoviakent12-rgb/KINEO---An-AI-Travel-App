import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "@/app-example/constants/theme";
import Feather from "@expo/vector-icons/Feather";

export default function Profile() {
  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=12" }}
          style={styles.profile}
        />

        <View style={styles.names}>
          <Text style={styles.firstName}>Kent</Text>
          <Text style={styles.surName}>Genovia</Text>
        </View>

        <TouchableOpacity style={styles.changeName}>
          <Text style={styles.changeNameText}>Change Name</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Trips</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Saved</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Countries</Text>
        </View>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionItem}>
          <Feather name="user" size={20} color={Colors.BLUE} />
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <Feather name="map" size={20} color={Colors.BLUE} />
          <Text style={styles.optionText}>My Trips</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <Feather name="heart" size={20} color={Colors.BLUE} />
          <Text style={styles.optionText}>Liked Trips</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <Feather name="settings" size={20} color={Colors.BLUE} />
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logout}>
        <Feather name="log-out" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 80,
    paddingHorizontal: 20,
  },

  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },

  profile: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },

  names: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  firstName: {
    fontFamily: "outfit-bold",
    fontSize: 25,
  },

  surName: {
    fontFamily: "outfit-bold",
    fontSize: 25,
  },

  changeName: {
    marginTop: 6,
  },

  changeNameText: {
    color: Colors.GREY,
    fontSize: 14,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },

  statBox: {
    alignItems: "center",
  },

  statNumber: {
    fontFamily: "outfit-bold",
    fontSize: 18,
    color: Colors.BLUE,
  },

  statLabel: {
    fontSize: 12,
    color: "#777",
  },

  optionsContainer: {
    marginBottom: 30,
  },

  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  optionText: {
    fontSize: 15,
    fontFamily: "outfit",
  },

  logout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },

  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "outfit-bold",
  },
});