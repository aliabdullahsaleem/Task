import { StyleSheet, Text, TextInput, View, Dimensions,Alert, TouchableOpacity, } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
const { height, width } = Dimensions.get('window')
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native'
const Signup = () => {
    const navigation = useNavigation()
    const [showIcon, setshowIcon] = useState(true)
    const [showIcon2, setshowIcon2] = useState(true)
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    clickToShowIcon = () => {
        setshowIcon(!showIcon)
    }
    clickToShowIcon2 = () => {
        setshowIcon2(!showIcon2)
    }
    const createNewUsers = async () => {
        try {
            if (
                email.length > 0 &&
                password.length > 0 &&
                confirmPassword.length > 0
            ) {
                if (password == confirmPassword) {
                    // const methods = await auth().fetchSignInMethodsForEmail(email);
                    // if (methods.length > 0) {
                    //     // If the email exists, inform the user and return
                    //     // Toast.show({ type: 'error', text1: 'Email already exists' });
                    //     setIfEmailExist('Email is already existed');
                    //     setloading(false)
                    //     return null;
                    // }
                    //   const usernameDoc = await firestore()
                    //     .collection('Travel Advisor')
                    //     .where('username', '==', username)
                    //     .get();
                    //   if (usernameDoc.size > 0) {
                    //     // If the username exists, inform the user and return
                    //     setifUsernameExist('Username already existed');
                    //     setloading(false)
                    //     return null;
                    //   }
                    const responce = await auth().createUserWithEmailAndPassword(
                        email,
                        password,
                    );
                    console.log(responce);
                    const userID = auth().currentUser.uid;
                    userDATA = {
                        uid: userID,
                        email: email,
                        password: password,
                    };

                    const userInformation = await firestore()
                        .collection('user')
                        .doc(userID)
                        .set(userDATA);
                    console.log(userInformation);

                    setemail('');
                    setpassword('');
                    setconfirmPassword('');
                    Alert.alert('You Signup Successfully!') 
                } else {
                    Alert.alert('Passwords do not match')                }
            } else {
                Alert.alert('unvalid Cridentials')  
            }
        } catch (error) {
            console.log(error);
        }
    };
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
                    onChangeText={(value) => setemail(value)}
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder='Password'
                        secureTextEntry={showIcon}
                        placeholderTextColor={'#57280A'}
                        style={styles.inputTextWithIcon}
                        value={password}
                        onChangeText={(value) => setpassword(value)}
                    />
                    <TouchableOpacity onPress={() => clickToShowIcon()}>
                        <Icon name={showIcon ? 'eye-off-sharp' : 'eye-sharp'} color={'#57280A'} size={20} />
                    </TouchableOpacity>
                </View>
                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder='Confirm Password'
                        secureTextEntry={showIcon}
                        placeholderTextColor={'#57280A'}
                        style={styles.inputTextWithIcon}
                        value={confirmPassword}
                        onChangeText={(value) => setconfirmPassword(value)}
                    />
                    <TouchableOpacity onPress={() => clickToShowIcon2()}>
                        <Icon name={showIcon2 ? 'eye-off-sharp' : 'eye-sharp'} color={'#57280A'} size={20} />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={() => createNewUsers()} activeOpacity={0.9} style={styles.btnOpacity}>
                <Text style={styles.btnText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Signup

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: height * 0.06
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
    btnOpacity: {
        height: height * 0.075,
        width: width * 0.7,
        backgroundColor: '#57280A',
        alignSelf: 'center',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.07
    },
    btnText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#ffffff",
    }
})