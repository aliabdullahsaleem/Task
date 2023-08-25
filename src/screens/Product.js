import { FlatList, StatusBar, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/AntDesign'
const { height, width } = Dimensions.get('window');
const Product = () => {
    const [myUserData, setmyUserData] = useState()
    const fetchingTheData = async () => {
        try {
            const reponce = await fetch("https://fakestoreapi.com/products")//fetching data and is not immediately come so. therefore use await
            const data = await reponce.json()//to show the data in will formate
            setmyUserData(data)//setting the data from api in => setter function
            //   console.log(data);
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }
    }
    useEffect(() => {
        fetchingTheData()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F8E3B6' }}>
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor='transparent' translucent={true} barStyle={'dark-content'} />
                <FlatList
                    data={myUserData}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.flatListView}>
                                <Image resizeMode='cover' source={{ uri: item.image }} style={styles.img} />
                                <View style={styles.bottomView}>
                                    <View style={styles.pricedNameView}>
                                        <View style={styles.nameCategoryView}>
                                            <Text style={styles.nameTxt}>{item.title}</Text>
                                            <Text style={styles.categoryTxt}>{item.category}</Text>
                                        </View>
                                        <Text style={styles.priceTxt}>$ {item.price}</Text>
                                    </View>
                                    <Text style={styles.descriptionTXT}>{item.description}</Text>
                                </View>
                                {/* <View style> */}
                                <TouchableOpacity style={styles.btnPurchase}>
                                    <Text style={styles.btnTxt}>Purchase</Text>
                                </TouchableOpacity>
                                {/* </View> */}

                            </View>
                        )
                    }}

                />
            </View>
        </SafeAreaView>
    )
}

export default Product

const styles = StyleSheet.create({
    flatListView: {

    },
    img: {
        height: height * 0.55,
        width: width,
        // borderBottomLeftRadius: 30,
        // borderBottomRightRadius: 30,
        borderRadius:30
    },
    bottomView: {
        width: width * 0.8,
        alignSelf: 'center',
        marginTop: height * 0.05
    },
    pricedNameView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    nameCategoryView: {
        marginTop: 5,
    },
    nameTxt: {
        fontSize: 16,
        color: '#834d1e',
        fontWeight: 'bold',
        width: width * 0.7,
    },
    categoryTxt: {
        fontSize: 14,
        color: '#834d1e',
        fontWeight: '600',
        marginTop: 10,
    },
    priceTxt: {
        fontSize: 15,
        color: '#834d1e',
        fontWeight: 'bold',
    },
    descriptionTXT: {
        fontSize: 14,
        color: '#a7672f',
        fontWeight: '500',
        lineHeight: 20,
        marginTop: 20,
        textAlign: 'justify'
    },
    btnPurchase: {
        height: 50,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FCF2D9",
        borderRadius: 20,
        alignSelf: 'flex-end',
        marginRight: 20,
        marginTop: height * 0.03,
        marginBottom:10,
    },
    btnTxt: {
        color: '#A7672F',
        fontSize: 16,
        fontWeight: 'bold',
    },




})