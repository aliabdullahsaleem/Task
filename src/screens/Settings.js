import { Image, StyleSheet, Text, View, TouchableOpacity, Dimensions, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
const { height, width } = Dimensions.get('window');
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/AntDesign'
import { StackActions, useNavigation } from '@react-navigation/native'

const Settings = () => {
    const [userData, setuserData] = useState('');
    const navigation = useNavigation()
    useEffect(() => {
        const getUserData = async () => {
            try {
                const userId = auth().currentUser.uid;//fetching the current user id 
                const querySnapshot = await firestore()
                    .collection('user')
                    .doc(userId)
                    .get();
                const getName = querySnapshot.data();//fetching and storing the data from firebase
                setuserData(getName)//set the value getName value in useState

            } catch (error) {
                console.log('This is the Error ', error);
            }
        };
        getUserData()
    }, []);
    const singOut = async () => {
        await auth().signOut()//logout functions
        navigation.dispatch(StackActions.replace('FirstScreen'))//replace this screen with firstScreen
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F8E3B6', }}>
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor='transparent' translucent={true} barStyle={'dark-content'} />
                {/* Top */}
                <View style={styles.topIconsView}>
                    <Icon name='arrowleft' size={30} color={'#834d1e'} />
                    <Text style={styles.editTxt}>Edit</Text>
                </View>
                {/* Image, Email and id part */}
                <View style={styles.imgView}>
                    <Image style={styles.Img} source={require('../assets/images.jpeg')} resizeMode='cover' />
                    <Text style={styles.emailTxt}>{userData.email}</Text>
                    <Text style={styles.idTxt}>{userData.uid}</Text>
                </View>
                {/* Remaining options parts */}
                <View style={styles.btnView}>
                    <TouchableOpacity style={styles.btnOp}>
                        <Icon name='creditcard' size={25} color={'#834d1e'} />
                        <Text style={styles.btnText}>Manange Payment Options</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnOp}>
                        <Icon name='addusergroup' size={25} color={'#834d1e'} />
                        <Text style={styles.btnText}>Find Friends</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnOp}>
                        <Icon name='setting' size={25} color={'#834d1e'} />
                        <Text style={styles.btnText}>More Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnOp}
                        onPress={() => {
                            singOut()
                        }}
                    >
                        <Icon name='poweroff' size={25} />
                        <Text style={styles.btnText}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Settings

const styles = StyleSheet.create({
    topIconsView: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    editTxt: {
        color: 'blue',
        fontSize: 17,
        fontWeight: 'bold',
        color: '#834d1e'
    },
    imgView: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    Img: {
        height: height * 0.15,
        width: width * 0.28,
        borderRadius: 100,
    },
    emailTxt: {
        fontSize: 17,
        color: '#834d1e',
        fontWeight: 'bold',
        marginTop: 10,
        lineHeight: 30,

    },
    idTxt: {
        fontSize: 15,
        color: '#834d1e',
        fontWeight: 'bold',
        lineHeight: 40,
    },
    btnView: {
        justifyContent: 'center',
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginTop: height * 0.1,
    },
    btnOp: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#834d1e',
        width: width * 0.9,
        marginTop: 7,
        backgroundColor: "#FCF2D9",
        paddingHorizontal: 10
    },
    btnText: {
        marginLeft: 20,
        fontSize: 17,
        lineHeight: 40,
        color: '#834d1e',
    }
})