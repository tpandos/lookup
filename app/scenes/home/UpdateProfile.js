import React, { useState } from 'react';
import {View, ScrollView, Text, Image} from 'react-native';

import * as api from "../../services/auth";
import { useAuth } from "../../providers/auth";

import Form, { TYPES } from 'react-native-basic-form';
import {ErrorText} from "../../components/Shared";

export default function UpdateProfile (props) {
    const {navigation} = props;

    //1 - DECLARE VARIABLES
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
        
        {  name: 'skills_1', label: 'Skills-1'},
        {  name: 'skills_2', label: 'Skills-2'},
        // {  name: 'skills-3', label: 'Skills-3'},
        {  name: 'rank_1', label: 'Rank-1'},
        {  name: 'rank_2', label: 'Rank-2'},

     
  
        // {  name: 'rank-3', label: 'Rank-3'},
    /*req.body =  { 
          skills: ['PYTHON', 'JAVA']
          rank: [5, 6]

          */
     
    ];

    /*

        ..
        skills: [{
            name: '',
            rank: '',
        }]


    */



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


UpdateProfile.navigationOptions = ({}) => {
    return {
        title: `Update Profile`
    }
};

