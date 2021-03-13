import React, {useState, useContext} from 'react';
import {Text, View, Button, ActivityIndicator, Alert, StyleSheet, ScrollView, Image} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import { useAuth } from "../../providers/auth";

export default function Home(props) {
    const {navigate} = props.navigation;

    const {state, handleLogout} = useAuth();
    const user = state.user;

    return (
        <View> 
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{padding:10, width: '100%', backgroundColor: '#000033', height: 100}}>
            



            {/* <Text style={styles.userinfo}>{`Welcome ${user.firstName} ${user.lastName} (${user.username})`}</Text>
            <Text style={styles.userinfo}>{user.institute}</Text>
            <Text style={styles.userinfo}>{user.major}</Text>
            <Text style={styles.userinfo}>{user.grade}</Text> 

            <Button title={"Update Profile"} onPress={() => navigate('UpdateProfile')}/>
            <Button title={"Log Out"} onPress={() => {handleLogout(); navigate('Auth');}}/> */}
                </View>
                <View style={{alignItems: 'center'}}>
                    <Image source={require('../../../assets/alien.png')} style={{width: 140, height: 140, borderRadius: 100, marginTop: -70}}></Image>
                    <Text style={{fontSize: 25, fontWeight: 'bold', padding: 10}}>{user.firstName} {user.lastName}</Text>
                </View>
                <View style={styles.fieldview}>
                <FontAwesome5 name="school" size={20} color="black" />
                <Text style={{fontSize: 18, fontWeight: 'bold', padding: 3}}> {user.institute}</Text>
                </View>
                <View style={styles.fieldview}>
                <FontAwesome name="id-card" size={24} color="black" />
                <Text style={{fontSize: 18, fontWeight: 'bold', padding: 3}}> {user.role}</Text>
                </View>
                <View style={styles.fieldview}>
               <FontAwesome5 name="book" size={24} color="black" />
                <Text style={{fontSize: 18, fontWeight: 'bold', padding: 3}}> {user.major}</Text>
                </View>
                <View style={styles.fieldview}>
                <Ionicons name="school-sharp" size={24} color="black" />
                <Text style={{fontSize: 18, fontWeight: 'bold', padding: 3}}> {user.grade}</Text>
                </View> 
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    fieldview: {
        alignSelf: 'center', 
        flexDirection: 'row', 
        justifyContent: 'center',
        backgroundColor: 'white', 
        width: '90%',
        padding: 12, 
        paddingBottom: 22, 
        borderRadius: 50, 
        shadowOpacity: 80, 
        elevation: 15, 
        marginTop: 20,
        marginBottom: 1}
})