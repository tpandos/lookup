import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Image, Platform, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Location from 'expo-location';

import * as api from "../../services/auth";
import { useAuth } from "../../providers/auth";


export default function AllowLocation(props) {
    const { navigate } = props.navigation;
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const { state, updateUser } = useAuth();

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
    console.log(lat_long);

    try {
        api.updateLocation(state.user._id, lat_long);
    } catch (err) {
        console.warn(err);
    }
    
    return (

        <View>
            <TouchableOpacity onPress={() => { navigate('UpdateProfile'); }}>
                <Text >
                    Touch to go back to profile
            </Text>
            </TouchableOpacity>
            <View >
                <Text > Latiude {latitude}</Text>
                <Text > Longitude {longitude}</Text>
            </View>
        </View>

    );
}



