import { Colors } from '@/app-example/constants/theme';
import { useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'; // Alert added
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { auth } from '../../../configs/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { BlurView } from 'expo-blur'; 

export default function Sign() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const OnCreateAccount = () => { 

    // Check if any of the fields are empty
    if (!email || !password || !fullName) { 
        Alert.alert('Error', 'Please Enter All Details'); 
        return;
    }

    console.log('Attempting signup with:', email, '| password length:', password.length);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log('User created:', user.uid);
        router.replace('/mytrip'); // navigate to MyTrip after successful signup
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Error signing up:', errorCode, errorMessage);
        // Show an alert for signup errors
        Alert.alert('Error', 'Failed to create account. ' + errorMessage);
      });
  };

  return (
    <View style={styles.mainContainer}>

      <View style={styles.headerWrapper}>
        <View style={styles.headerBack} />
        <View style={styles.header} />
      </View>

      <Image
        source={require('../../../assets/images/login_page/Logo_Nature.png')}
        style={styles.largeLogo}
      />

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>KINEO</Text>
        <Text style={styles.subtitle}>Create an Account</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#0165bcff"/>
        </TouchableOpacity>
        <Text style={styles.welcome}>Welcome!</Text>

        <View style={styles.inputContainer}>
          {/* FULL NAME */}
          <Text style={styles.fullName}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Full Name"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(value)=> setFullName(value)}
          />

          {/* EMAIL */}
          <Text style={styles.email}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(value)=> setEmail(value)}
          />

          {/* PASSWORD */}
          <Text style={styles.password}>Password</Text>
          <TextInput
            secureTextEntry
            value={password}
            onChangeText={(value)=> setPassword(value)}
            style={styles.inputPassWord}
            placeholder="Enter Password"
            placeholderTextColor="#aaa"
            autoCapitalize="none"
          />

          {/* SIGN IN */}
          <View style = {styles.glassWrapperSignIn}> 
          <TouchableOpacity
            onPress={() => router.replace('auth/sign-in')}
            style={styles.signInButton}
          >
            <Text style={styles.signIn}>Sign In</Text>
          </TouchableOpacity>
          </View>

            {/* CREATE ACCOUNT */}
            <View style = {styles.glassWrapperCreateAccount}> 
            <BlurView intensity={60} tint="light" style={styles.searchContainerGlass}>
            <TouchableOpacity
              onPress={OnCreateAccount}
              style={styles.createAccountButton}
            >
              <Text style={styles.createAccount}>Create Account</Text>
            </TouchableOpacity>
            </BlurView>
          </View>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light gray-white background
    height: '29%',
    zIndex: 1,
  },
  
  headerWrapper: {//HEADER 
    position: 'absolute',
    top: -260,
    left: -100,
    right: -100,
    height: 525,
    overflow: 'hidden',
    zIndex: 1
  },

  header: { //blue semi circle
    width: '100%',
    height: '93%',
    backgroundColor: Colors.BLUE,
    borderBottomLeftRadius: 320,
    borderBottomRightRadius: 320,
    zIndex: 2
  },

  headerBack: { //light blue semi circle
    position: 'absolute',
    top: 50,
    width: '100%',
    height: '90%',
    backgroundColor: Colors.BLUE,
    opacity: 0.2,
    borderBottomLeftRadius: 320,
    borderBottomRightRadius: 320,
    zIndex: 2,
  },

  /* ================= LOGO ================= */
  largeLogo: {
    position: 'absolute',
    top: -90,
    right: -30,
    width: 380,
    height: 380,
    resizeMode: 'contain',
    opacity: 0.9,
    zIndex: 3,
    transform: [{ rotate: '-20deg' }], // rotates clockwise
  },

  content: {
    paddingHorizontal: 28,
    paddingTop: 140,
  },

  title: { // KINEO
    color: Colors.WHITE,
    fontFamily: 'outfit-bold',
    fontSize: 96,
    top: -80,
    textAlign: 'center',
    zIndex: 3,
  },

  subtitle: { // CREATE A NEW ACCOUNT
    color: Colors.WHITE,
    fontFamily: 'outfit-medium',
    fontSize: 26,
    textAlign: 'center',
    top: -72,
    marginTop: -10,
    zIndex: 3,
  },

  welcome: { // WELCOME!
    color: Colors.BLUE,
    fontFamily: 'outfit-medium',
    fontSize: 25,
    marginTop: 20,
  },

  inputContainer: {
    marginTop: 30,
  },

  fullName: { // FULL NAME
    color: '#000',
    fontFamily: 'outfit-medium',
    fontSize: 16,
    marginLeft: 5,
    marginBottom: 8,
  },

  input: {
    backgroundColor:  Colors.WHITE,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    shadowColor: Colors.BLUE,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  email: { // EMAIL TEXT
    color: '#000',
    fontFamily: 'outfit-medium',
    paddingTop: 20,
    fontSize: 16,
    marginLeft: 5,
    marginBottom: 8,
  },

  password: { // PASSWORD TEXT
    color: '#000',
    fontFamily: 'outfit-medium',
    paddingTop: 20,
    fontSize: 16,
    marginLeft: 5,
    marginBottom: 6,
  },

  inputPassWord: {
    backgroundColor: Colors.WHITE,
    marginTop: 5,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    shadowColor: Colors.BLUE,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  /* ================= BUTTONS ================= */
  signInButton: {
    padding: 15,
    backgroundColor: Colors.BLUE,
    borderRadius: 99,
    borderColor: "rgba(213, 234, 255, 1)"
  },

  signIn: { // SIGN IN BUTTON
    color: Colors.WHITE,
    textAlign: 'center',
    fontFamily: 'outfit-medium',
    fontSize: 16,
  },

  createAccountButton: {
    padding: 15,
    backgroundColor: 'transparent', // CHANGED TO TRANSPARENT
    borderRadius: 99,
  },

  createAccount: { // CREATE ACCOUNT BUTTON
    color: Colors.BLUE,
    textAlign: 'center',
    fontFamily: 'outfit-medium',
    fontSize: 16,
  },

  glassWrapperSignIn: { 
    marginTop: 30,
    borderRadius: 99,
    overflow: 'hidden',
    borderWidth: 5,
    borderColor: 'rgba(35, 137, 255, 0.1)',
  },

  glassWrapperCreateAccount: {
    marginTop: 30,
    borderRadius: 99,
    overflow: 'hidden',
    borderWidth: 5,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },

  searchContainerGlass: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },

});
