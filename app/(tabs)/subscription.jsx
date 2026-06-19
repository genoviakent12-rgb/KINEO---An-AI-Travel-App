import { View, Text, StyleSheet } from 'react-native'
import { Colors } from  "@/app-example/constants/theme";
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

export default function subscription() {
  return (
    <View style={[styles.container, {flex: 1}]}>
      <View style={styles.headerTexts}> 
        <Text style={styles.centerText}>KINEO</Text>
        <View style={styles.square}> 
          <Text style={styles.plusText}>PLUS⁺</Text>
        </View>
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({ 
  container: { 
    backgroundColor: Colors.BLUE, 
    alignItems: "center",    
    paddingTop: 160,         
  },

  headerTexts: { 
    flexDirection: "row",
    alignItems: "center",   
  },

  centerText: {
    textAlign: "center",
    fontSize: 60,            
    fontFamily: "outfit-bold",
    color: Colors.WHITE,
  },

  plusText: { 
    textAlign: "center",
    fontSize: 20,            
    fontFamily: "outfit-bold",
    color: Colors.WHITE,
  },

  square: { 
    textAlign: "center",
    justifyContent: "center", 
    backgroundColor: Colors.TRANSPARENTBLUE, 
    width: 80,
    height: 30, 
    borderRadius: 10,
  }
})