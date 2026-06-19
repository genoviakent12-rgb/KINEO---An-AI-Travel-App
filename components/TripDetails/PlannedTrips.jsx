import { Colors } from "@/app-example/constants/theme";
import { Image, StyleSheet, Text, View } from "react-native";

export default function PlannedTrips({ itineraryInfo }) {
  // ✅ SAFETY CHECK (IMPORTANT)
  if (!itineraryInfo || typeof itineraryInfo !== "object") {
    return (
      <View style={{ padding: 20 }}>
        <Text>No itinerary available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {Object.entries(itineraryInfo).map(([day, details], dayIndex) => (
        <View key={day} style={styles.daySection}>
          {/* DAY HEADER */}
          <View style={styles.dayHeaderRow}>
            <View style={styles.dayBadge}>
              <Text style={styles.dayBadgeNumber}>{dayIndex + 1}</Text>
            </View>
            <View style={styles.dayHeaderLine} />
            <View style={styles.dayHeaderLine} />
          </View>

          {/* PLACE CARDS */}
          {(details?.plan || []).map((place, index) => (
            <View key={index} style={styles.card}>
              {/* DESTINATION STOPS */}
              <View style={styles.indexPill}>
                <Text style={styles.indexPillText}>Stop {index + 1}</Text>
              </View>

              {/* IMAGE */}
              <Image
                style={styles.image}
                source={require("./../../assets/images/MyTripsImages/placeholder-1-e1533569576673.webp")}
              />

              {/* CARD BODY */}
              <View style={styles.cardBody}>
                {/* PLACE NAME */}
                <Text style={styles.placeNames}>
                  {place?.placeName || "Unknown place"}
                </Text>

                {/* DESCRIPTION */}
                <Text style={styles.description}>
                  {place?.placeDetails || "No details available"}
                </Text>

                {/* DIVIDER */}
                <View style={styles.divider} />

                {/* COST + DURATION ROW */}
                <View style={styles.metaRow}>
                  <View style={styles.metaChip}>
                    <Text style={styles.metaIcon}>🎫</Text>
                    <Text style={styles.metaLabel}>Cost</Text>
                    <Text style={styles.metaValue}>
                      {place?.ticketPricing || "-"}
                    </Text>
                  </View>

                  <View style={styles.metaChipDivider} />

                  <View style={styles.metaChip}>
                    <Text style={styles.metaIcon}>🕒</Text>
                    <Text style={styles.metaLabel}>Duration</Text>
                    <Text style={styles.metaValue}>
                      {place?.timeToTravel || "-"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
  },

  daySection: {
    marginTop: 30,
  },

  dayHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 4,
  },

  dayBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.BLUE,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  dayBadgeNumber: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "outfit-bold",
  },

  dayHeaderLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5EAF0",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    marginBottom: 18,
    overflow: "hidden",
    elevation: 5,
  },

  indexPill: {
    position: "absolute",
    top: 14,
    left: 14,
    zIndex: 10,
    backgroundColor: Colors.BLUE,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 99,
  },

  indexPillText: {
    color: "#fff",
    fontFamily: "outfit-medium",
    fontSize: 12,
  },

  image: {
    width: "100%",
    height: 180,
  },

  cardBody: {
    padding: 18,
  },

  placeNames: {
    fontFamily: "outfit-bold",
    fontSize: 20,
  },

  description: {
    fontFamily: "outfit-medium",
    fontSize: 14,
    color: "#6B7280",
  },

  divider: {
    height: 1,
    backgroundColor: "#F0F3F7",
    marginVertical: 14,
  },

  metaRow: {
    flexDirection: "row",
  },

  metaChip: {
    flex: 1,
    alignItems: "center",
  },

  metaIcon: {
    fontSize: 18,
  },

  metaLabel: {
    fontSize: 11,
    color: "#9CA3AF",
  },

  metaValue: {
    fontSize: 13,
    color: Colors.BLUE,
  },

  metaChipDivider: {
    width: 1,
    height: 36,
    backgroundColor: "#ddd",
  },
});