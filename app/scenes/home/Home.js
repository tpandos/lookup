import React, {useState, useContext, useEffect} from 'react';
import {Text, View, Button, ActivityIndicator, Alert, StyleSheet, ScrollView, Image} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as api from "../../services/auth";

import { useAuth } from "../../providers/auth";
import { FlatList, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

export default function Home(props) {
    const {navigate} = props.navigation;
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const {state, handleLogout} = useAuth();
    const user = state.user;

    // start loop

    // set friends to pass to friendlist__________________________________________________
    async function onSubmit(data) {
        console.log('@@@@ SUBMIT CLICKED')
       //on touching the friend list should get the data. like in update profile 
    }
    //_____________________________________________________________________________________

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    let latitude;
    let longitude;
    let lat_long = null;
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
        latitude = location.coords.latitude;
        longitude = location.coords.longitude;
        lat_long = [latitude,longitude];
    }
   // console.log(lat_long);

    try {
        api.updateLocation(state.user._id, lat_long);
    } catch (err) {
        console.warn(err);
    }
    
    var myloop = [];

    for (let i = 0; i < user.skills.length; i++) {
        myloop.push(
            <View key={i}>
            <View styles={{borderWidth:1}}>
             <Text style={styles.skillsStyle}>{user.skills[i].name}    </Text>   
            </View>

            <View>
             <Text style={styles.skillsRank}>{user.skills[i].rank}</Text>   
            </View>
        
        </View>
        // <View key={i}>
        // <Text style={{ textAlign: 'center', marginTop: 5 }} >{user.skills[i].name}: {user.skills[i].rank}</Text>
        // </View>
        );
    }
    // end loop

    // profile Image url
    let profileImage;
    // set defalut profile Image 
    
    if (!user.profileImage) {
        profileImage = require('../../../assets/alien.png')
    } else {
        profileImage = {uri: user.profileImage}
    }

    return (
        <View style={{flex:1, backgroundColor:'#000033'}}>
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: '#000033'}}>

            <View style={{flex:1, flexDirection:'column', backgroundColor:'#000033'}}> 
                <View style={{ width: '100%', backgroundColor: '#000033', height: 70}}>
                </View>
        
            <View style={{alignItems: 'center', backgroundColor:'white',borderWidth: 3, borderColor:'#00ffff', borderRadius:20}}>
           
                <Image source={profileImage} style={{width: 260, height: 260, borderRadius: 200, marginTop: -70,borderWidth:3,borderColor:'#00ffff'}}></Image>
                <Text style={{fontSize: 25, fontWeight: 'bold', padding: 10}}>{user.username}</Text>
        
                    <View style={{flexDirection:'row'}}>
                        <View style={{ padding:10, marginHorizontal:100, marginBottom:5}}>
                            <FontAwesome5 name="network-wired" size={30} color="#FF00FF" />
                        </View>
        
                        <TouchableHighlight activeOpacity={0.5} underlayColor='lightgrey' onPress={() => {navigate('FriendList')}}>
                            <View style={{  padding:10, marginHorizontal:100}}>
                                <FontAwesome5 name="user-friends" size={30} color="#6600FF" />
                            </View>
                        </TouchableHighlight>
                    </View>
            </View>
        
    
            <View style={styles.fieldview}>
                <FontAwesome5 name="school" size={20} color="#00ffff" />
                <Text style={styles.fieldstext}>    {user.institute}</Text>
            </View>

            <View style={styles.fieldview}>
                <FontAwesome name="id-card" size={20} color="#00ffff" />
                <Text style={styles.fieldstext}>    {user.role}</Text>
            </View>

            <View style={styles.fieldview}>
                <FontAwesome5 name="book" size={20} color="#00ffff" />
                <Text style={styles.fieldstext}>    {user.major}</Text>
            </View>

            <View style={styles.fieldview}>
                <Ionicons name="school-sharp" size={20} color="#00ffff" />
                <Text style={styles.fieldstext}>    {user.grade}</Text>
            </View> 
        
            <View style={styles.skillsSectionTop}>
                <View style={{ marginTop:10, marginLeft:90, alignContent: 'center'}}>
            <FontAwesome name="gears" size={30} color="#00ffff" />
            </View>
                <Text style={{padding:10, color: '#00ffff', fontWeight:'bold', fontSize:25, marginBottom:10}}>SKILLS</Text>
            </View>
            
            {/* call loop */}
            <View style={styles.skillsLoop}>
                <Text>{myloop}</Text>
            </View>
        
            <View style={{flex:1, flexDirection:'row', alignSelf:'center', backgroundColor:'#000033', padding:30}}>
                <TouchableOpacity onPress={() => {handleLogout(); navigate('Auth');}}>

                    <View style={styles.button}>
                        <Text style={{fontWeight:'bold'}}>Log Out</Text>
                    </View>
                </TouchableOpacity>
        
                <TouchableOpacity onPress={() => {navigate('UpdateProfile')}}>
                    <View style={styles.button}>
                        <Text style={{fontWeight: 'bold'}}>Update Profile</Text>
                    </View>    
                </TouchableOpacity>
            </View>   
        
            </View>
        </ScrollView>
        <TouchableOpacity onPress={() => {navigate('Search')}}>
        <View style={styles.searchButton}>
        
        <Text style={{color:'black', fontSize:20, marginRight:30, fontWeight:'bold'}}>
            Explore
        </Text>
        <FontAwesome5 name="search-location" size={30} color="black" />
        
        </View>
        </TouchableOpacity>
        </View>
        );
    }

    
    const styles = StyleSheet.create({
        fieldview: {
            alignSelf: 'center', 
            flexDirection: 'row', 
            //justifyContent: 'center',
            backgroundColor: '#000033', 
            width: '90%',
            padding: 10, 
            paddingBottom: 20, 
            borderRadius: 10, 
            borderColor: 'cyan', 
            borderWidth: 2, 
            shadowOpacity: 80,
            shadowColor: 'white',  
            elevation: 15, 
            marginTop: 20,
            marginBottom: 1
        }, 
        button: {
            
            fontWeight: 'bold', 
            padding:10, 
            backgroundColor:'#09ff00',
            borderRadius:10,
            marginHorizontal: 5
        }, 
        fieldstext: {
            fontSize: 18, 
            fontWeight: 'bold', 
            padding: 1,
            color: 'white'
        },
        skillsStyle:{
            color: 'white',
            fontSize: 23, 
            textAlign: 'center',
            
        },
        skillsRank:{
            color: 'red',
            fontSize: 23, 
            textAlign: 'center',
            //borderWidth:1,
            //borderRadius:75
            
        },
        skillsSectionTop:{
            backgroundColor:'#1a1a1a', 
            marginTop:50, 
            flex:1, 
            flexDirection:'row',
             marginHorizontal:20,
             borderTopColor: 'yellow', 
             borderTopWidth:1,
             padding: 10, 
             
             
             
              //borderBottomEndRadius:50,
            //   alignItems:'center',
            //   alignContent:'center',
              //borderRadius:50
        },
        skillsLoop:{
            backgroundColor:'#1a1a1a',
            flex:1, 
            flexDirection:'row',
            marginHorizontal:20,
            justifyContent:'center',
            paddingBottom: 20,
            borderBottomColor:'yellow',
            borderWidth: 1,
            borderTopColor:'#1a1a1a'
        },
        searchButton:{
            flexDirection:'row', 
            padding:5,
            marginBottom:10,
            marginHorizontal:50, 
            paddingLeft:90,
            alignContent:'center',
            borderRadius:10, 
            backgroundColor:'#29e3dd'
        }
    })
    
    