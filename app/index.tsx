import { Redirect } from "expo-router";
import { View } from "react-native";
import Login from './../components/Login.jsx';
import { auth } from './../configs/FirebaseConfig';

export default function Index() {

  const user = auth.currentUser;

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {user? 
      <Redirect href={'/(tabs)/mytrip'}/>:
      <Login/>
      }
  
    </View>
  );
}
