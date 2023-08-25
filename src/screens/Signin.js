import { StyleSheet, Text, TextInput, View, Dimensions, TouchableOpacity, Alert,} from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
const { height, width } = Dimensions.get('window');
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';
import { StackActions, useNavigation } from '@react-navigation/native'
const Signin = () => {
  const navigation=useNavigation()
  const [showIcon, setshowIcon] = useState(true)
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  clickToShowIcon=()=>{
    setshowIcon(!showIcon)
  }
  const userSigningIN = async () => {
    
    if (email.length > 0 && password.length > 0) {
    //   const snapshot = await firestore().collection('Travel Advisor').where('email', '==', email).limit(1).get()
    //   if (snapshot.empty) {
    //     setIfEmailExist(true)
    //     setloading(false)
    //   }
      await auth().signInWithEmailAndPassword(email, password)
      setemail('')
      setpassword('')
      navigation.dispatch(StackActions.replace('Product1'))
    }
    else {
        Alert.alert("Invalid Cridentials!")
    }
  }
  return (
    <View style={{}}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email'
          autoComplete='email'
          keyboardType='email-address'
          placeholderTextColor={'#57280A'}
          style={styles.inputText}
          value={email}
          onChangeText={(value)=>setemail(value)}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder='Password'
            secureTextEntry={showIcon}
            placeholderTextColor={'#57280A'}
            style={styles.inputTextWithIcon}
            value={password}
            onChangeText={(value)=>setpassword(value)}
          />
          <TouchableOpacity onPress={()=>clickToShowIcon()}>
            <Icon name={showIcon ? 'eye-off-sharp':'eye-sharp'} color={'#57280A'} size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.forGotBtn}>
        <Text style={styles.forGotText}>Forgot Password</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>{userSigningIN()}}  activeOpacity={0.9}  style={styles.btnOpacity}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Signin

const styles = StyleSheet.create({
  inputContainer: {
    marginTop:height*0.06
  },
  inputText: {
    width: width * 0.7,
    borderBottomWidth: 1.4,
    borderBottomColor: '#57280A',
    height: height * 0.06,
    alignSelf: 'center',
  },
  inputTextWithIcon: {
    width: width * 0.65,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: 'center',
    paddingHorizsontal: 20,
    borderBottomWidth: 1.4,
    borderBottomColor: '#57280A',
    width: width * 0.7,
    height: height * 0.06,
    alignSelf: 'center',
  },
  forGotBtn:{},
  forGotText:{
    fontSize:17,
    fontWeight:'600',
    color:'#57280A',
    alignSelf:'flex-end',
    marginRight:width*0.1,
    marginTop:10,
  },
  btnOpacity:{
    height:height*0.075,
    width:width*0.7,
    backgroundColor:'#57280A',
    alignSelf:'center',
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center',
    marginTop:height*0.07
  },
  btnText:{
    fontSize:18,
    fontWeight:'bold',
    color:"#ffffff",
  }
})