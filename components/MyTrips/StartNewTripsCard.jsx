import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from "@/app-example/constants/theme";

export default function StartNewTripsCard() {
  return (
    <View style={{alignItems: "center", justifyContent: "center", height: "350%"}}>
      <Text style={styles.header}>Your trips will be added here.</Text>
      <Text style={styles.startNow}>Start travelling now!</Text>
    </View>
  )
}

const styles = StyleSheet.create({ 
  header: {
    fontFamily: "outfit-bold",
    color: Colors.BLUE,
    fontSize: 20, 
    
  },

  startNow: { 
  fontFamily: "outfit-medium",
  color: Colors.GREY,
  paddingTop: 5,
  }
})