
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Text, View, ActivityIndicator, FlatList } from 'react-native';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';




export  function HomeScreen({route, navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [postsData, setPostsData ] = useState({});
  
 
  useEffect(() => {
const storage = async()=>{
      let items = await AsyncStorage.getItem("token");
      console.log('jojo'+items)

      var requestOptions = {
    method: 'GET',
    headers: {
      "Authorization": 'Bearer ' + items,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },

    redirect: 'follow'
  };
 fetch('https://oauth.reddit.com/subreddits/popular', requestOptions)
    .then((response) => response.json())
    .then((json) => {
      console.log("AZERTY N " + JSON.stringify(json.data.children))
     
      setPostsData(json.data.children);
      //setPostsName(POSTS.display_name);
      //console.log("name " + POSTS.kind);
      //console.log("description " + POSTS.data.children.data.id);
      
    })
    .catch((error) => {
      console.error(error);
    }) .finally (() => setLoading(false));

    }
    storage()

  }, [])
  ;
    //const {toktok} = navigation.getParam('token', 'tokstring');
  return (
<View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={postsData}
          keyExtractor={( item ) => item.data.id}
          //keyExtractor={( item , index) => item.data.id}
          renderItem={({ item }) => (
            <Text>{item.data.title}</Text>
          )}
        />
      )}
      <View>
       {/* <Text>toktok: </Text>
       <Text>Signed in!</Text> */}
       {/* <Button  title="ProfilScreen"
       onPress={() => navigation.navigate({'name':'ProfilScreen'})} /> */}
       
       
    </View>
</View>

        
//     <View>
// <Text >xcxcf {postsData.kind}</Text>
//     </View>
//     
  );
}