import { StyleSheet } from 'react-native';
import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button, View, Text, ImageBackground, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './Utils'
WebBrowser.maybeCompleteAuthSession();

//Endpoint
const discovery = {
    authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize',
    tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
  };
  export function SignInScreen({navigation}) {
    //const { signIn } = React.useContext(AuthContext);
    const [request, response, signIn] = useAuthRequest(
      {
        clientId: 'Z936vOTa5onZ304rPV_r4w',
        //elisaId: vYYiZjEL19AQHLarnjREXw
        scopes: ['*'],
        redirectUri: makeRedirectUri({
          // For usage in bare and standalone
          native: 'exp://192.168.72.246:19000',
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
    "redirect_uri": "exp://192.168.72.246:19000"
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
    .then(
        async (result) => {
                try {     
                console.log(JSON.parse(result))
                const jsonValue = JSON.parse(result)
                const tokstring = jsonValue.access_token
                console.log("token : "+jsonValue.access_token)
                await AsyncStorage.setItem('token', jsonValue.access_token)
                const letok = await AsyncStorage.getItem('token')
                console.log("token stocké : "+letok)
               navigation.navigate('HomeScreen',{ params: {test: 'test_tokennnn'}})
              } 
              catch (e) {
                console.log("error")
              }
              } 
    )
    .catch(error => console.log('error', error));


  }
    }, [response]);
  return (
    <View style={styles.container}>
       <Image source={require('./Redditech.png')} />
      <Button title="Sign in" color="#000" width="50" onPress={() => signIn()} />
    {/* <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        signIn();
      }}
      /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    flex: 1,
    backgroundColor: '#fff',
  },
  
});