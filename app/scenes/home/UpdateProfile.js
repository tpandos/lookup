import React, { useState, useEffect } from 'react';
import {View, ScrollView, Text, Image, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as api from "../../services/auth";
import { useAuth } from "../../providers/auth";

import Form, { TYPES } from 'react-native-basic-form';
import {ErrorText} from "../../components/Shared";
import * as ImagePicker from 'expo-image-picker'; 

export default function UpdateProfile (props) {
    const {navigation} = props;

    //1 - DECLARE VARIABLES
    const {navigate} = props.navigation;
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { state, updateUser } = useAuth();
    
    let initialData = {}
    // // set initial data 
    if (state.user.skills.length === 0) {
        console.log("1111111111111111111111111111"); 

         initialData = {
            "username": state.user.username,
            "role":  "",
            "institute": "",
            "major":  "",
            "grade":  "",
            "skills_1": "",
            "rank_1":  "",
            "skills_2":  "",
            "rank_2":  "",
            "skills_3":  "",
            "rank_3":  "",
        };
    } else{
        console.log("*********************************"); 

        initialData = {
        "username": state.user.username,
        "role": state.user.role,
        "institute": state.user.institute,
        "major": state.user.major,
        "grade": state.user.grade,
        "skills_1":state.user.skills[0].name,
        "rank_1": state.user.skills[0].rank,
        "skills_2": state.user.skills[1].name,
        "rank_2": state.user.skills[1].rank,
        "skills_3": state.user.skills[2].name,
        "rank_3": state.user.skills[2].rank,
    };

        console.log(state.user.skills.length);
    }

        // profile Image url
        let profileImage;
        let filename; 
        let match;
        //let type;

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
            {  name: 'rank_1', label: 'Rank (1-10)', required: true, type: TYPES.Number},
        ],
        [
            {  name: 'skills_2', label: 'Skill-2', required: true},
            {  name: 'rank_2', label: 'Rank (1-10)', required: true, type: TYPES.Number}, 
        ],
        [
            {  name: 'skills_3', label: 'Skill-3', required: true},
            {  name: 'rank_3', label: 'Rank (1-10)', required: true, type: TYPES.Number},
             
        ]
       // {  name: 'rank_3', label: 'Rank', required: true, type: TYPES.Dropdown, options: options}, 
        
    ];


    async function onSubmit(data) {
        console.log('@@@@', data)
        setLoading(true);
        //console.log("profile---////////////////////////////-", profileImage); 

        if(profileImage[0] === "f"){
            console.log("profile if f---////////////////////////////-", profileImage); 
            data.profileImage = profileImage; 
            // data.filename = data.profileImage.split('/').pop();
            // match = /\.(\w+)$/.exec(filename);
            // data.type = match ? `image/${match[1]}` : `image`;
        }else{
            data.profileImage = state.user.profileImage; 
            console.log("profile if not changed---()()()()()()()()()()()())-", profileImage);
        }
        
        //console.log("data.profile----", data.profileImage);  
        //console.log("data.type----", data.type); 
        //console.log("filename-----", data.filename);  
         

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
    


    // profileImage for image view
    if (!state.user.profileImage) {
        profileImage = require('../../../assets/alien.png')
    } else {
        profileImage = {uri: state.user.profileImage}
    }

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);
    
      const pickImage = async () => {
    
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log("URI::----> ", result.uri);
        
        if (!result.cancelled) {
        profileImage = result.uri; 
        }
      };

    return (
      <ScrollView>
        <View style={{flex: 1, paddingHorizontal: 16, backgroundColor:'#000033'}}>
            <View style={{flex:1, padding:10}}>
                <ErrorText error={error}/>
            
                <Image source={profileImage} style={{width: 200, height: 200, borderRadius: 100, marginTop: -30, marginLeft:60}}></Image>
                <View style={{flex:1, flexDirection:'row', alignSelf:'center', backgroundColor:'#000033', padding:30}}>

                {/* <TouchableOpacity onPress={() => {navigate('AllowLocation')}}>
                    <View style={styles.button}>
                        <Text style={{fontWeight: 'bold'}} >Allow Location</Text>
                    </View>    
                </TouchableOpacity> */}

                <TouchableOpacity onPress={pickImage}>
                    <View style={styles.button}>
                        <Text style={{fontWeight: 'bold'}} >Profile Photo</Text>
                    </View>    
                </TouchableOpacity>

                </View>

               
                <Form
                    fields={fields}
                    title={'Submit'}
                    loading={loading}
                    initialData = {initialData}
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