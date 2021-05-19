import React, {useState,useEffect} from 'react';
import {Text, View, StyleSheet, ScrollView, Image} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as api from "../../services/auth";
import * as Animatable from 'react-native-animatable';
import { useAuth } from "../../providers/auth";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Home(props) {
    const {navigate} = props.navigation;
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const {state, handleLogout} = useAuth();
    const user = state.user;
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

        );
    }
    
    // end loop

    // profile Image url
    let profileImage;
    
    if (!user.profileImage) {
        profileImage = require('../../../assets/alien.png')
    } else {
        profileImage = {uri: user.profileImage}
    }

    return (
        <View style={{flex:1, backgroundColor:'#000033'}}>
        <ScrollView showsVerticalScrollIndicator={false} >

            <View style={{flex:1, flexDirection:'column', backgroundColor:'#000033'}}> 
            <View style={{ flexDirection:'row'}}>
                <View style={{ width: '50%', height: 70}}></View>
                    <View style={{ width: '50%', height: 70}}>
                        <View style={{marginLeft:100,padding:20}}>
                            <TouchableOpacity onPress={() => {navigate('Notifications')}}>
                                <FontAwesome name="spinner" size={30} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>     
                </View>
        
                {/* profile photo */}
                <Animatable.View animation = "fadeInUp" duration= {1000}>
                <View style={{alignItems: 'center', backgroundColor:'white',borderWidth: 3, borderColor:'#00ffff', borderRadius:10}}>
                    <Image source={profileImage} style={{width: 200, height: 200, borderRadius: 200, marginTop: -70,borderWidth:3,borderColor:'#00ffff'}}></Image>
                        <Text style={{fontSize: 25, fontWeight: 'bold', padding: 20}}>{user.username}</Text>
        
                </View>
        
                {/* Profile details  */}
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
                </Animatable.View>

                {/* skills and ranks */}
            <View style={styles.skillsandRankContainer}> 
                <View style={styles.skillsSectionTop}>
                    <Text style={{padding:10, color: '#00ffff', fontWeight:'bold', fontSize:25, marginBottom:10}}>SKILLS</Text>
                </View>
        
                <View style={styles.skillsLoop}>
                    <Text>{myloop}</Text>
                </View> 
            </View>


            {/* logout or profile settings */}
            <View style={{flex:1, flexDirection:'row', alignSelf:'center', marginTop:100, marginBottom:10}}>
               
                <TouchableOpacity onPress={() => {handleLogout(); navigate('Auth');}}>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center', backgroundColor:'#00ffff', padding:5, paddingLeft:15, marginLeft:20, borderWidth:2, borderBottomLeftRadius:10, borderColor:'white'}}>
                        <Entypo name="log-out" size={30} color="black" />
                    </View>
                </TouchableOpacity>

              
        
                <TouchableOpacity onPress={() => {navigate('UpdateProfile')}}>
                    <View style={{ flex: 1,backgroundColor:'#00ffff',padding:5,paddingBottom:6, alignItems:'center',marginRight:20,borderWidth:2, borderTopRightRadius:10, borderColor:'white'}}>
                        <FontAwesome5 name="user-cog" size={30} color="black" />
                    </View>    
                </TouchableOpacity>
               
            </View>   
        
        </View>
        </ScrollView>

        {/*-------------- bottom pane  */}
        <View style={styles.bottompane}>
         <View style={{ flex:1,padding:10, alignItems:'center'}}>
         <Animatable.View animation = "bounceInRight" duration= {1000}>
            <TouchableOpacity onPress={() => {navigate('ConversationList')}}>
            <FontAwesome name="commenting" size={30} color="white" />
            </TouchableOpacity> 
            </Animatable.View>
          </View>
          <View style={{ flex:1,padding:10, alignItems:'center'}}>
          <Animatable.View animation = "bounceInRight" duration= {1000}> 
          <TouchableOpacity onPress={() => {navigate('FriendList')}}>
            <FontAwesome5 name="user-friends" size={30} color="white" />
            </TouchableOpacity> 
            </Animatable.View>
          </View>
          <View style={{ flex:1,padding:10, alignItems:'center'}}>
          <Animatable.View animation = "bounceInRight" duration= {1000}>
            <TouchableOpacity onPress={()=>{navigate('Search')}}>
            <FontAwesome5 name="search-location" size={30} color="white" />
            </TouchableOpacity> 
            </Animatable.View>
          </View>
        </View>
        </View>
        );
    }
    
    const styles = StyleSheet.create({
        fieldview: {
            alignSelf: 'center', 
            flexDirection: 'row', 
            backgroundColor: '#000033', 
            width: '90%',
            padding: 10, 
            paddingBottom: 20, 
            borderRadius: 10, 
            borderColor: 'cyan', 
            borderWidth: 2, 
            shadowOffset: {width: 0, height: 10},
            shadowOpacity: 0.3,
            shadowColor: 'white',  
            elevation: 15, 
            marginTop: 20,
            marginBottom: 1
        }, 
        fieldstext: {
            fontSize: 18, 
            fontWeight: 'bold', 
            padding: 1,
            color: 'white'
        },
        skillsandRankContainer:{
                flex:1, 
                marginTop:50,
                backgroundColor: 'orange', 
                flexDirection: 'column'
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
        },
        skillsSectionTop:{
            flex:1, 
            backgroundColor:'#1a1a1a', 
            alignItems: 'center'
        },
        skillsLoop:{
            backgroundColor:'#1a1a1a',
            flex:1, 
            flexDirection:'row',
            justifyContent:'center',
            paddingBottom: 20,
            borderBottomColor:'yellow',
            borderWidth: 1,
            borderTopColor:'#1a1a1a'
        },
        bottompane:{
            flexDirection:'row',
            padding:10,
            paddingBottom:20,
          }
    })
    
    