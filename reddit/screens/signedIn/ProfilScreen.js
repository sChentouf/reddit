import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableOpacity,
    FlatList,
  } from 'react-native';
  import * as React from 'react';
  import { useState, useEffect } from 'react';
  import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  
  export function ProfilScreen({route, navigation}) {

    
    // const signOut = (navigation) => {
    //   navigation.goBack();
    // }
    const [userData, setUserData] = useState({
    name: "",
    description: "",
    banner_img: "",
    friends: "",
    karma: "",
  });
   
  
    var PROFIL;
    const Item = ({ user }) => (
  <View>
    <Text style={styles.title}>{user}</Text>
  </View>
);
const renderItem = ({ PROFIL}) => <Item user={PROFIL.title} />;
    

useEffect(() => {
         
    const storage = async()=>{ 
     let items = await AsyncStorage.getItem("token");
      console.log("profile : " + items)
      var requestOptions = {
    method: 'GET',
    headers: {
      "Authorization": 'Bearer ' + items,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },

    redirect: 'follow'
  };
  
  
  fetch("https://oauth.reddit.com/api/v1/me", requestOptions)
   .then((response) => response.json())
  .then((json) => {
      console.log(JSON.stringify(json));
      PROFIL = json;
      setUserData(PROFIL);
      // setUserName(json.name);
      // setUserDescription(json.subreddit.public_description);
      // setUserBanner_img(json.subreddit.banner_img);
      // setUserFriends(json.num_friends);
      // setUserKarma(json.total_karma);
      console.log("name " + PROFIL.name);
      console.log("description " + PROFIL.subreddit.public_description);
      console.log("banner_img " + PROFIL.subreddit.banner_img);
      console.log("friends " + PROFIL.num_friends);
      console.log("karma " + PROFIL.total_karma);
    })
   
  .catch(error => console.log('error', error));
    }

    storage()
     
  }, []);
      return (
        
        <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                
                  <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar2.png'}}/>
                  <Text style={styles.name}></Text>
              </View>
            </View>
            <View style={styles.profileDetail}>
              <View style={styles.detailContent}>
                <Text style={styles.title}>Name</Text>
                <Text style={styles.count}>{userData.name}</Text>
                
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.title}>Friends</Text>
                <Text style={styles.count}>{userData.num_friends}</Text>
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.title}>Karma</Text>
                <Text style={styles.count}>{userData.total_karma}</Text>
              </View>
            </View>
            <View style={styles.body}>
              
              <View style={styles.bodyContent}>
                <TouchableOpacity  style={styles.buttonContainer}>
                  <Text>Se déconnecter</Text>  
                </TouchableOpacity> 

              </View>
                   {/* <View><Text>{userData.subreddit.public_description}</Text></View> */}

             
     {/* <View><Text>{userData.name}</Text></View>
     <View><Text>{userData.subreddit.public_description}</Text></View>
     <View><Text>{userData.num_friends}</Text></View>
     <View><Text>{userData.total_karma}</Text></View> */}
     {/* <View><Image  source={{uri: userData.subreddit.banner_img}}/></View> */}
          
  
      
          </View>
        </View>
      );
    }
  const styles = StyleSheet.create({
    header:{
      backgroundColor: "#00CED1",
    },
    headerContent:{
      padding:30,
      alignItems: 'center',
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
    },
    name:{
      fontSize:22,
      color:"#FFFFFF",
      fontWeight:'600',
    },
    profileDetail:{
      alignSelf: 'center',
      marginTop:200,
      alignItems: 'center',
      flexDirection: 'row',
      position:'absolute',
      backgroundColor: "#ffffff"
    },
    detailContent:{
      margin:10,
      alignItems: 'center'
    },
    title:{
      fontSize:20,
      color: "#00CED1"
    },
    count:{
      fontSize:18,
    },
    bodyContent: {
      flex: 1,
      alignItems: 'center',
      padding:30,
      marginTop:40
    },
    textInfo:{
      fontSize:18,
      marginTop:20,
      color: "#696969",
    },
    buttonContainer: {
      marginTop:10,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
      backgroundColor: "#00CED1",
    },
    description:{
      fontSize:20,
      color: "#00CED1",
      marginTop:10,
      textAlign: 'center'
    },
  });