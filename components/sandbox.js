import React from 'react'
import {View,Button,TextInput,StyleSheet, Image, TouchableOpacity} from 'react-native'; 
import Logo from '../assets/icon1.png';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'; 

export default class SignUp extends React.Component {
  state = {
    username: '', password: '', email: '', phone_number: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  signUp = async () => {
    const { username, password, email, phone_number } = this.state
    try {



      // signup logic goes here



      console.log('user successfully signed up!: ', success)
    } catch (err) {
      console.log('error signing up: ', err)
    }
  }
 
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View>
          <Image source={Logo} style={styles.logo}/>
          </View>
          <View style={styles.iconsView}>
          <AntDesign style={styles.inputStyle}name="aliwangwang" size={24} color="white" />
            <TextInput
              style={styles.input}
              placeholder='Username'
              autoCapitalize="none"
              placeholderTextColor='#868b8e'
              onChangeText={val => this.onChangeText('username', val)}
            />
          </View>
          <View style={styles.iconsView}>
          <Entypo style={styles.inputStyle}name="key" size={24} color="white" />
            <TextInput
              style={styles.input}
              placeholder='Password'
              secureTextEntry={true}
              autoCapitalize="none"
              placeholderTextColor='#868b8e'
              onChangeText={val => this.onChangeText('password', val)}
            />
          </View>
          <View style={styles.iconsView}>
          <Ionicons style={styles.inputStyle}name="rocket" size={24} color="white" />
            <TextInput
              style={styles.input}
              placeholder='Email'
              autoCapitalize="none"
              placeholderTextColor='#868b8e'
              onChangeText={val => this.onChangeText('email', val)}
            />
            </View>
            <View style={styles.iconsView}>
            <Entypo style={styles.inputStyle} name="old-phone" size={24} color="white" />
            <TextInput
              style={styles.input}
              placeholder='Phone Number'
              autoCapitalize="none"
              placeholderTextColor='#868b8e'
              onChangeText={val => this.onChangeText('phone_number', val)}
            />
            </View>
            {/* <TouchableOpacity style={styles.signUp} onPress={this.signUp}>
              <Text style={styles.button}>Sign Up</Text>
            </TouchableOpacity> */}
            <Button
              title='Sign Up'
              onPress={this.signUp}
              color='white'
            />
        </View> 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a031d'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a031d'
  },
  iconsView: {
    flexDirection: 'row', 
    borderBottomColor: 1, 
    borderColor: 'white', 
    paddingBottom: 8,
    
  },
  inputStyle:{
    flex: 1,
    marginTop: 25,
    marginLeft: 18
  },
  
  input: {
    width: 320,
    height: 55,
    backgroundColor: 'cyan',
    marginTop: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  // input: {
  //   width: 320,
  //   height: 55,
  //   backgroundColor: 'cyan',
  //   margin: 10,
  //   padding: 8,
  //   color: 'white',
  //   borderRadius: 14,
  //   fontSize: 18,
  //   fontWeight: '500',
  // },
  signUp: {
    padding: 16, 
    marginTop: 16, 
    borderColor: '#bbb', 
    borderWidth: 1, 
    borderRadius: 10
  },
  logo: {
    width: 150, 
    height: 150,
    borderWidth: 1, 
    borderColor: 'cyan',
    borderRadius: 20,
    marginBottom: 100
  }
})


// import React from 'react'; 
// import {StyleSheet, Text, View} from 'react-native'

// export default function Sandbox(){

//     return(
//         <View style={styles.container}>
//             <Text style={styles.boxOne}>One</Text>
//             <Text style={styles.boxTwo}>Two</Text>
//             <Text style={styles.boxThree}>Three</Text>
//             <Text style={styles.boxFour}>Four</Text>

//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         //flex: 1,
//         flexDirection: 'row', // main axis
//         justifyContent: 'space-around', //how we display content in the main axis
//         paddingTop: 100, 
//         alignItems: 'flex-end', 
//         backgroundColor: '#ddd',
//     }, 
//     boxOne: {
//         flex: 2, 
//         backgroundColor: 'violet', 
//         padding: 10,
//     },
//     boxTwo: {
//         flex: 1,
//         backgroundColor: 'gold', 
//         padding: 20,
//     },
//     boxThree: {
//         flex: 1,
//         backgroundColor: 'coral', 
//         padding: 30,
//     },
//     boxFour: {
//         flex: 1, 
//         backgroundColor: 'cyan', 
//         padding: 40,
//     },
// });