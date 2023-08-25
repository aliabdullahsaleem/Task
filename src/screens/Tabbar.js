import { StyleSheet, Dimensions } from 'react-native'
import React from 'react'
const { height, width } = Dimensions.get('window')
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Iconio from 'react-native-vector-icons/Ionicons'
import Product from './Product';
import Location from './Location';
import Settings from './Settings';
const tab=createBottomTabNavigator();
const Tabbar = () => {
  return (
    <tab.Navigator
        screenOptions={({route})=>({
            tabBarIcon:({focused,size,color})=>{
                let iconName;
                if(route.name==='Product'){
                    iconName=focused? 'bag':'bag-handle-outline'
                    size=focused?size+10:size+8
                }
                else if(route.name==='Location'){
                    iconName=focused?'location':'location-outline'
                    size=focused?size+10:size+8
                }
                else if(route.name==='Settings'){
                    iconName=focused?'settings':'settings-outline'
                    size=focused?size+10:size+8
                }
            return<Iconio name={iconName} size={size} color={color}/>   
        },
        headerShown:false,
        tabBarStyle:{
            height:height*0.1,
            backgroundColor:'#834D1E',
            justifyContent:'center',
            // position:'relative',
        },
        tabBarActiveTintColor:'#FCF2D9',
        tabBarInactiveTintColor:'#FFFBF2',
        tabBarShowLabel:true,
        tabBarLabelStyle:{
        position:'absolute',
        },
        
        tabBarItemStyle:{
            marginBottom:height*0.02,
        }
        })}
        >
       <tab.Screen name='Product' component={Product}/>
       <tab.Screen name='Location' component={Location}/>
       <tab.Screen name='Settings' component={Settings}/>
    </tab.Navigator>
  )
}

export default Tabbar

const styles = StyleSheet.create({})