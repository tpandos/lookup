import React, {useState, useContext} from 'react';
import {Text, View, Button, ActivityIndicator, Alert, StyleSheet, ScrollView, Image} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import { useAuth } from "../../providers/auth";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Home(props) {
    const {navigate} = props.navigation;
    
    const {state, handleLogout} = useAuth();
    const user = state.user;
    
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: '#000033'}}>
        <View style={{flex:1, flexDirection:'column', backgroundColor:'#000033'}}> 
        
        <View style={{ width: '100%', backgroundColor: '#000033', height: 70}}>
        </View>
        
        <View style={{alignItems: 'center', backgroundColor:'white',borderWidth: 3, borderColor:'#00ffff', borderRadius:20}}>
        <Image source={require('../../../assets/alien.png')} style={{width: 140, height: 140, borderRadius: 100, marginTop: -70}}></Image>
        <Text style={{fontSize: 25, fontWeight: 'bold', padding: 10}}>{user.firstName} {user.lastName}</Text>
        
        
        <View style={{flexDirection:'row'}}>
        
        <View style={{ padding:10, marginHorizontal:100, marginBottom:5}}>
        <FontAwesome5 name="network-wired" size={24} color="#FF00FF" />
        </View>
        
        <View style={{  padding:10, marginHorizontal:100}}>
        <FontAwesome5 name="user-friends" size={24} color="#6600FF" />
        </View>
        
        </View>
        
        </View>
        
        
        <View style={styles.fieldview}>
        <FontAwesome5 name="school" size={20} color="#00ffff" />
        <Text style={styles.fieldstext}> {user.institute}</Text>
        </View>
        <View style={styles.fieldview}>
        <FontAwesome name="id-card" size={20} color="#00ffff" />
        <Text style={styles.fieldstext}> {user.role}</Text>
        </View>
        <View style={styles.fieldview}>
        <FontAwesome5 name="book" size={20} color="#00ffff" />
        <Text style={styles.fieldstext}> {user.major}</Text>
        </View>
        <View style={styles.fieldview}>
        <Ionicons name="school-sharp" size={20} color="#00ffff" />
        <Text style={styles.fieldstext}> {user.grade}</Text>
        </View> 
        
        <View style={{backgroundColor:'#262626', marginTop:50, marginBottom:20}}>
        <Text style={{padding:10, color: 'white', fontWeight:'bold', fontSize:20}}>SKILLS</Text>
        </View>
        
        <View style={{flex:1,flexDirection:'row', backgroundColor:'red', padding:10}}>
        <Text>skill1</Text>
        <Text>skill2</Text>
        <Text>skill3</Text>
        
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
        );
    }
    
    const styles = StyleSheet.create({
        fieldview: {
            alignSelf: 'center', 
            flexDirection: 'row', 
            justifyContent: 'center',
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
        }
    })
    
    {/* <Text style={styles.userinfo}>{`Welcome ${user.firstName} ${user.lastName} (${user.username})`}</Text>
    <Text style={styles.userinfo}>{user.institute}</Text>
    <Text style={styles.userinfo}>{user.major}</Text>
    <Text style={styles.userinfo}>{user.grade}</Text> 
    
    <Button title={"Update Profile"} onPress={() => navigate('UpdateProfile')}/>
<Button title={"Log Out"} onPress={() => {handleLogout(); navigate('Auth');}}/> */}