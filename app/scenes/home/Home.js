import React, {useState, useContext} from 'react';
import {Text, View, Button, ActivityIndicator, Alert, StyleSheet} from 'react-native';

import { useAuth } from "../../providers/auth";

export default function Home(props) {
    const {navigate} = props.navigation;

    const {state, handleLogout} = useAuth();
    const user = state.user;

    return (
        <View style={styles.container}> 
            <View style={styles.topview}>
                <Text>This is the top</Text>
            </View>
            <Text style={{color: '#fff'}}>{`Welcome ${user.firstName} ${user.lastName} (${user.username})`}</Text>

            <Button title={"Update Profile"} onPress={() => navigate('UpdateProfile')}/>

            <Button title={"Log Out"} onPress={() => {
                handleLogout();
                navigate('Auth');
            }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'column', 
        backgroundColor: '#000033', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    topview: {
        flexDirection: 'row', 
        backgroundColor: 'red'
    }
})