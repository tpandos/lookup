import React, {useState} from 'react';
import {Text, View, Alert, StyleSheet, ScrollView, Image, SafeAreaView} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as api from "../../services/auth";
import { useAuth } from "../../providers/auth";
import * as Animatable from 'react-native-animatable';
import {  TouchableOpacity } from 'react-native-gesture-handler';

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
        Alert.alert(response.message)
    }catch (error) {
        setErrorMsg(error.message);
        Alert.alert(error.message)
        }
    }

    async function onTutorReq(skillName){
        const request = skillName;
        try { 
        let response = await api.sendRequest(state.user._id, user._id, request);
        Alert.alert(response.message)
    }catch (error) {
        setErrorMsg(error.message);
        Alert.alert(error.message)
        }
    }

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
        <ScrollView showsVerticalScrollIndicator={false} >

<View style={{flex:1, flexDirection:'column', backgroundColor:'#000033'}}> 
<View style={{ flexDirection:'row'}}>
    <View style={{ width: '50%', height: 70}}></View>
        <View style={{ width: '50%', height: 70}}>
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


</View>
</ScrollView>
        <View style={styles.bottompane}>
         <View style={{flex:1, alignItems:'center', paddingBottom:10}}>
         <Animatable.View animation = "bounceInRight" duration= {1000}>
            <TouchableOpacity onPress={()=>{navigate('Home')}}>
            <Entypo name="home" size={35} color="#29e3dd" />
            </TouchableOpacity> 
            </Animatable.View>
          </View>

           <View style={{ flex:1,paddingBottom:15, alignItems:'center'}}>
           <Animatable.View animation = "bounceInRight" duration= {1000}>
          <TouchableOpacity onPress={() => {onConnect()}}>
          <FontAwesome5 name="people-arrows" size={35} color="orange" />
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
            shadowOpacity: 80,
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
    
    