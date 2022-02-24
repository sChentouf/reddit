
import { StyleSheet } from 'react-native';
import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
//import Auth from './Auth'
import LoginScreen from './screens/SignInScreen';


export default function App() {
  return (
    <View style={styles.container}>
      <LoginScreen/>
    </View>
  );
}

// const AppNavigator = createStackNavigator(
//   {
//     Home: HomeScreen,
//     Login: LoginScreen,
//   },
//   {
//     initialRouteName: 'Login',
//   },
// );
// export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});