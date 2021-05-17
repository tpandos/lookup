import React, {useState} from 'react';
import {Text, View, Alert, StyleSheet, ScrollView, Image, SafeAreaView} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as api from "../../services/auth";
import { useAuth } from "../../providers/auth";
import { FlatList, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

export default function SearchedUserProfile (props) {
    const {navigation} = props;
    const {navigate} = props.navigation;
    const [errorMsg, setErrorMsg] = useState(null);
    const {state, updateUser } = useAuth();
    
    const user = props.navigation.getParam('userProfile', "No ID") // the user whose profile is searched
    // state.user is the user who is making the search

    async function onConnect(){
        const request = 'friend';
        try { 
        let response = await api.sendRequest(state.user._id, user._id, request);
        console.log("the onConnect response is ")
        console.log(response)
        Alert.alert(response.message)
    }catch (error) {
        setErrorMsg(error.message);
        console.log("error.message is ")
        console.log(error.message)
        Alert.alert(error.message)
        }
    }

    async function onTutorReq(skillName){
        const request = skillName;
        try { 
        let response = await api.sendRequest(state.user._id, user._id, request);
        console.log("the onTutorReq response is ")
        console.log(response)
        Alert.alert(response.message)
    }catch (error) {
        setErrorMsg(error.message);
        console.log("error.message is ")
        console.log(error.message)
        Alert.alert(error.message)
        }
    }

    //const user = props.navigation.getParam('userProfile', "No ID")

    console.log('SEARCHED USER id')
    console.log(user._id)

    console.log('my user id')
    console.log(state.user._id)
    
    var myloop = [];

    for (let i = 0; i < user.skills.length; i++) {
        myloop.push(
            <View key={i}>
            <TouchableOpacity onPress={() => {onTutorReq(user.skills[i].name)}}>
            <View styles={{borderWidth:1}}>
             <Text style={styles.skillsStyle}>{user.skills[i].name} </Text>   
            </View>

            <View>
             <Text style={styles.skillsRank}>{user.skills[i].rank}</Text>   
            </View>
         </TouchableOpacity>
        
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
            <Text> {myloop} </Text>
           </View>
        
            <View style={{flex:1, flexDirection:'row', alignSelf:'center', backgroundColor:'#000033', padding:30}}>
            <TouchableOpacity onPress={() => {onConnect()}}>
                    <View style={styles.button}>
                        <Text style={{fontWeight: 'bold', fontSize: 25}}>Connect</Text>
                    </View>    
                </TouchableOpacity>   
            </View>   
        
            </View>
        </ScrollView>
        <TouchableOpacity onPress={() => {navigate('Search_')}}>
        <View style={styles.searchButton}>
        
        <Text style={{color:'black', fontSize:20, marginRight:30, fontWeight:'bold'}}>
            Back to Search
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
            padding:20, 
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