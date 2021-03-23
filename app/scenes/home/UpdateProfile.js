import React, { useState } from 'react';
import {View, ScrollView, Text, Image, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as api from "../../services/auth";
import { useAuth } from "../../providers/auth";

import Form, { TYPES } from 'react-native-basic-form';
import {ErrorText} from "../../components/Shared";

export default function UpdateProfile (props) {
    const {navigation} = props;

    //1 - DECLARE VARIABLES
    const {navigate} = props.navigation;
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { state, updateUser } = useAuth();

    // console.log(state.user)

    const fields = [
        {name: 'username', label: 'Username', required: true},

        // *********** extra profile stuff
        {name: 'role', label: 'Occupation', required: true},
        {name: 'institute', label: 'Institution', required: true},
        {name: 'major', label: 'Major', required: true},
        {name: 'grade', label: 'Grade Level', required: true},
        [
            {  name: 'skills_1', label: 'Skill-1', required: true},
            {  name: 'rank_1', label: 'Rank-1', required: true},
        ],
        [
            {  name: 'skills_2', label: 'Skill-2', required: true},
            {  name: 'rank_2', label: 'Rank-2', required: true}, 
        ],
        [
            {  name: 'skills_3', label: 'Skill-3', required: true},
            {  name: 'rank_3', label: 'Rank-3', required: true}, 
        ]
    ];


    async function onSubmit(data) {
        console.log('@@@@', data)
        setLoading(true);

        try {
           let response = await api.updateProfile(state.user._id, data);
        //    let response = await api.updateProfile(state.user._id, {
        //     data);
            updateUser(response.user);
            // console.log("this is from upprof: ", data);
            setLoading(false);

            navigation.goBack();
        } catch (error) {
            console.log('***', error)
            setError(error.message);
            setLoading(false)
        }
    }
    
    // profile Image url
    let profileImage;

    // set defalut profile Image 
    if (!state.user.profileImage) {
        profileImage = require('../../../assets/alien.png')
    } else {
        profileImage = {uri: state.user.profileImage}
    }

    return (
      <ScrollView>
        <View style={{flex: 1, paddingHorizontal: 16, backgroundColor:'#000033'}}>
            <View style={{flex:1, padding:10}}>
                <ErrorText error={error}/>
                <Image source={profileImage} style={{width: 200, height: 200, borderRadius: 100, marginTop: -30, marginLeft:60}}></Image>
                <TouchableOpacity onPress={() => {navigate('AllowLocation')}}>
                    <View style={styles.button}>
                        <Text style={{fontWeight: 'bold'}} >Allow Location</Text>
                    </View>    
                </TouchableOpacity>
                <Form
                    fields={fields}
                    title={'Submit'}
                    loading={loading}
                    initialData={state.user}
                    error={error}
                    onSubmit={onSubmit}/>
            </View>
        </View>
        
       </ScrollView>
    );
};

const styles = StyleSheet.create({
    button: {
            
        fontWeight: 'bold', 
        padding:10, 
        backgroundColor:'#09ff00',
        borderRadius:10,
        marginHorizontal: 5
    }
})


UpdateProfile.navigationOptions = ({}) => {
    return {
        title: `Update Profile`
    }
};

