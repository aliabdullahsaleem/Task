import { Image, ImageBackground, StyleSheet, Text, View, Dimensions, TouchableOpacity, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import Signin from './Signin'
import Signup from './Signup'

const { height, width } = Dimensions.get('window')
const FirstScreens = ({ navigation }) => {
    const [activeButton1, setactiveButton1] = useState(true)
    const [activeButton2, setactiveButton2] = useState(false)
    const setButtonActivation1 = () => {
        setactiveButton2(false)
        setactiveButton1(true)
    }
    const setButtonActivation2 = () => {
        setactiveButton1(false)
        setactiveButton2(true)
    }



    return (
        <View style={{ flex: 1, backgroundColor: '#F8E3B6', }}>
            <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
            <View style={styles.ImageContainer}>
                <ImageBackground source={require('../assets/loginImage.png')} resizeMode='cover' style={styles.backgroImage}>
                    <Text style={styles.Heading}>Co / Choc</Text>
                    <Text style={styles.subtitle}>A way to enjoy better and sweet of life</Text>
                </ImageBackground>
            </View>
            {/* start of Input Container */}
            <View style={styles.InputContainer}>
                <View style={[styles.btnContainer]}>
                    <TouchableOpacity
                        style={[styles.btn, { backgroundColor: activeButton1 ? '#834D1E' : '#FCF2D9', borderLeftWidth: activeButton2 ? 0 : 2 }]}
                        onPress={() => setButtonActivation1()} activeOpacity={1}>
                        <Text style={[styles.btnText, { color: activeButton1 ? '#FCF2D9' : '#834D1E', }]}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btn, { backgroundColor: activeButton2 ? '#834D1E' : '#FCF2D9', borderRightWidth: activeButton2 ? 0 : 2 }]}
                        onPress={() => setButtonActivation2()}  activeOpacity={1} >
                        <Text style={[styles.btnText, { color: activeButton2 ? '#FCF2D9' : '#834D1E', }]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {activeButton1 ? <Signin/> : <Signup/>}
                </View>
            </View>
            {/* end of input Container */}
            <View style={styles.bottomImageContainer}>
                <View style={styles.innerbottomImageContainer}>
                    <Image style={styles.bottomImage} source={require('../assets/Rectangle.png')} resizeMode='contain' />
                    <Image style={styles.bottomImage} source={require('../assets/chocolate.png')} resizeMode='contain' />
                </View>
            </View>
        </View>
    )
}

export default FirstScreens

const styles = StyleSheet.create({
    ImageContainer: {
        width: width,
        height: height * 0.3,
        borderBottomLeftRadius: width * 0.2,
        borderBottomRightRadius: width * 0.2,
        overflow: 'hidden',
    },
    backgroImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    Heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#020202',
        textAlign: 'center',
    },
    subtitle: {
        marginTop: 10,
        fontSize: 16,
        color: '#000000',
        fontWeight: '800',
        textAlign: 'center',
    },
    InputContainer: {
        height: height * 0.6,
        width: width * 0.88,
        backgroundColor: '#FCF2D9',
        marginTop: -60,
        alignSelf: 'center',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#834D1E',
    },
    btnContainer: {
        flexDirection: 'row',
        borderRadius: 30,
        width: width * 0.7,
        alignSelf: 'center',
        marginTop: 10,
        borderWidth: 1.,
        borderColor: '#834D1E',
    },
    btn: {
        width: width * 0.35,
        height: height * 0.07,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 30,
        borderColor: '#834D1E'

    },
    btnText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    bottomImageContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    innerbottomImageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})