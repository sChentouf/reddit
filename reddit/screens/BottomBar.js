// import * as React from 'react';
// import { Text, View } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';


// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', headers: 'false'}}>
//       <Text>Faut relier au composant home ms jarrive pas</Text>
//     </View>
//   );
// }

// function ProfilScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Faut relier au composant profil ms jarrive pas nn plus!</Text>
//     </View>
//   );
// }


// const Tab = createBottomTabNavigator();

// export  function BottomBar() {
//   return (
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;

//             if (route.name === 'Home') {
//               iconName = focused
//                 ? 'ios-information-circle'
//                 : 'ios-information-circle-outline';
//             } else if (route.name === 'Settings') {
//               iconName = focused ? 'ios-list-box' : 'ios-list';
//             }

//             // You can return any component that you like here!
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: 'tomato',
//           tabBarInactiveTintColor: 'gray',
//         })}
//       >
//         <Tab.Screen name="HomeScreen" component={HomeScreen} />
//         <Tab.Screen name="ProfilScreen" component={ProfilScreen} />
//       </Tab.Navigator>
    
//   );
// }