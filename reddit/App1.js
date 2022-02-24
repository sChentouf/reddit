import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button, View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
WebBrowser.maybeCompleteAuthSession();


// Endpoint
const discovery = {
  authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize',
  tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
};


const Stack = createNativeStackNavigator();

export default function App() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: 'Z936vOTa5onZ304rPV_r4w',
      //elisaId: vYYiZjEL19AQHLarnjREXw
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        // For usage in bare and standalone
        native: 'exp://10.136.77.243:19000',
        //elisaurlexpo: exp://10.136.78.68:19000
      }),
    },
    discovery
  );


  function access_token() {  
    const tokenEndPoint = "https://www.reddit.com/api/v1/access_token"
  }

  React.useEffect(() => {
    if (response?.type === 'success') {
       const {code}  = response.params;
       console.log("le code est " + code);
       
       
// var myHeaders = new Headers();
// myHeaders.append("Authorization", "Basic WjkzNnZPVGE1b25aMzA0clBWX3I0dzo=");
// myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
// myHeaders.append("Cookie", "edgebucket=ejrrF8whXf8wB8ceIM");

// var urlencoded = new URLSearchParams();
// urlencoded.append("grant_type", "authorization_code");
// urlencoded.append("code", "H_LfwLgOUeKHp3x7CK3hxtRLaWe_PQ");
// urlencoded.append("redirect_uri", "exp://192.168.90.246:19000");


// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: urlencoded,
//   redirect: 'follow'
// };


var details = {
  'grant_type': 'authorization_code',
  'code': code,
  "redirect_uri": "exp://10.136.77.243:19000"
};
var formBody = [];
for (var property in details) {
var encodedKey = encodeURIComponent(property);
var encodedValue = encodeURIComponent(details[property]);
formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");
var requestOptions = {
  method: 'POST',
  headers: {
    "Authorization": "Basic WjkzNnZPVGE1b25aMzA0clBWX3I0dzo=",
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  body: formBody,
  
  redirect: 'follow'
};
fetch("https://www.reddit.com/api/v1/access_token", requestOptions)
  .then(response => response.text())
  .then(async (result) => console.log(result))
  .catch(error => console.log('error', error));

}


  }, [response]);


function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
    <Button
      title="Loohgin"
      onPress={() => {
        promptAsync();
      }}
      />
      <Button
        title="Go profil"
        onPress={() => navigation.navigate('Details')}
      />
       
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Redditech' }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Profil' }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});