import { Colors } from "@/app-example/constants/theme";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function OptionCard({ option, selectedOption, onPress }) {
  const baseStyleById = {
    1: styles.cardBaseAlone,
    2: styles.cardBaseCouple,
    3: styles.cardBaseFamily,
    4: styles.cardBaseFriends,
  };

  const variantStyleById = {
    1: styles.cardAlone,
    2: styles.cardCouple,
    3: styles.cardFamily,
    4: styles.cardFriends,
  };

  const baseBudgetStyleById = {
    1.1: styles.cardBaseComfort,
    2.1: styles.cardBaseEconomy,
    3.1: styles.cardBaseClassy,
    4.1: styles.cardBaseLavish,
  };

  const variantBudgetStyleById = {
    1.1: styles.cardComfort,
    2.1: styles.cardEconomy,
    3.1: styles.cardClassy,
    4.1: styles.cardLavish,
  };

  const baseStyle = baseStyleById[option.id] || baseBudgetStyleById[option.id];
  const variantStyle =
    variantStyleById[option.id] || variantBudgetStyleById[option.id];

  const isSelected = selectedOption?.id === option?.id;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={[
        baseStyle,
        variantStyle,
        {
          borderColor: isSelected
            ? Colors.TRANSPARENTBLUE
            : variantStyle?.borderColor,
          overflow: "hidden",
        },
      ]}
    >
      <View style={styles.cardContent}>
        <View style={styles.iconContainer}>
          <Image
            source={option.icon || option.icon2}
            style={option.icon ? styles.icon : styles.icon2}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.titleBase}>{option.title}</Text>
          <Text style={styles.titleBase2}>{option.title2}</Text>
          <Text style={styles.desc}>{option.desc}</Text>
          <Text style={styles.desc2}>{option.desc2}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // START PEOPLE CARDS

  cardBaseAlone: {
    height: 90,
    width: 170,
    borderRadius: 20,
    marginTop: 20,
    margin: 5,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  cardBaseCouple: {
    height: 90,
    width: 170,
    borderRadius: 20,
    marginTop: 20,
    margin: 5,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  cardBaseFamily: {
    height: 90,
    width: 170,
    borderRadius: 20,
    marginTop: 20,
    margin: 5,
    marginBottom: 0,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  cardBaseFriends: {
    height: 90,
    width: 170,
    borderRadius: 20,
    marginTop: 20,
    margin: 5,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderColor: "#f9fafcff",
  },

  cardAlone: {
    backgroundColor: "#a5a5a51d",
    borderColor: "transparent",
  },

  cardCouple: {
    backgroundColor: "#a5a5a51d",
    borderColor: "transparent",
  },

  cardFamily: {
    backgroundColor: "#a5a5a51d",
    borderColor: "transparent",
  },

  cardFriends: {
    backgroundColor: "#a5a5a51d",
    borderColor: "transparent",
  },

  icon: {
    top: 30,
    left: -25,
    width: 100,
    height: 100,
    opacity: 0.7
  },

  iconContainer: {
    marginRight: 12,
    alignItems: "center",
    marginBottom: 12,
  },

  //END PEOPLE CARDS

  //START BUDGET CARDS

  cardBaseComfort: {
    height: 90,
    width: 170,
    borderRadius: 20,
    marginTop: 20,
    margin: 5,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  cardBaseEconomy: {
    height: 90,
    width: 170,
    borderRadius: 20,
    marginTop: 20,
    margin: 5,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  cardBaseClassy: {
    height: 90,
    width: 170,
    borderRadius: 20,
    padding: 16,
    marginTop: 20,
    margin: 5,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  cardBaseLavish: {
    height: 90,
    width: 170,
    borderRadius: 20,
    padding: 16,
    marginTop: 20,
    margin: 5,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  cardComfort: {
    backgroundColor: "#a5a5a51d",
    borderColor: "transparent",
  },

  cardEconomy: {
    backgroundColor: "#a5a5a51d",
    borderColor: "transparent",
  },

  cardClassy: {
    backgroundColor: "#a5a5a51d",
    borderColor: "transparent",
  },

  cardLavish: {
    backgroundColor: "#a5a5a51d",
    borderColor: "transparent",
  },

  icon2: {
    top: 10,
    left: -45,
    width: 100,
    height: 100,
    opacity: 0.7
  },
  // END BUDGET CARDS

  cardContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  textContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: -50,
  },

  titleBase: {
    fontFamily: "outfit-bold",
    color: Colors.BLUE,
    fontSize: 17,
    marginBottom: 5,
    fontWeight: "700",
    top: 30,
  },

  titleBase2: {
    fontFamily: "outfit-bold",
    color: Colors.BLUE,
    fontSize: 17,
    marginBottom: 10,
    fontWeight: "700",
    top: 5,
    left: -15,
  },

  desc: {
    fontFamily: "outfit-medium",
    fontSize: 13,
    color: "#02b3ffff",
    left: -10,
    top: 0,
  },

  desc2: {
    fontFamily: "outfit-medium",
    fontSize: 13,
    color: "#02b3ffff",
    left: -30,
    top: -15,
  },

  people: {
    fontFamily: "outfit-medium",
    fontSize: 13,
    color: "#02b3ffff",
    left: -25,
  },
});
