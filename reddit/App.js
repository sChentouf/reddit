import * as React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {SignInScreen, HomeScreen, ProfilScreen, BottomBar } from './screens/Index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';


// function SplashScreen() {
//   return (
//     <View>
//       <Text>Loading...</Text>
//     </View>
//   );
// }

const Stack = createStackNavigator();
export default function App() {
  const [isSignedIn, setIsSignedIn]=useState(true);
  const Tab = createBottomTabNavigator();
  

  useEffect(() => {
     let items =  AsyncStorage.getItem("token");
      if(items){
       setIsSignedIn(true)
     }else {
       setIsSignedIn(false)
     }  
  }, [])


    if(isSignedIn == true) {
      return(
        <NavigationContainer>
           <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HomeScreen') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home-outline';
            } else if (route.name === 'ProfilScreen') {
              iconName = focused 
              ? 'ios-list' 
              : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'yellow',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="ProfilScreen" component={ProfilScreen} />
      </Tab.Navigator>
    </NavigationContainer>
      )
    } else {
       return (
      <NavigationContainer>
         <Stack.Navigator initialRouteName='SignInScreen'>
            <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign in'}} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ProfilScreen" component={ProfilScreen} />
        </Stack.Navigator> 
        </NavigationContainer>
        )
 
    }  
}