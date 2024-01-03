import {View, Text, StyleSheet} from  'react-native'

import { useNetInfo } from "@react-native-community/netinfo";
import { addEventListener } from "@react-native-community/netinfo";


import APPSTYLE from '../../styles/appStyle';
import { useEffect } from 'react';


const ConnectionIndicator = () => {


    const unsubscribe = addEventListener(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
      });
      
      // Unsubscribe
    //   unsubscribe();

    return(
        <View style={[styles.container, styles.noConnection]}>
            <Text style={[styles.text]}>
                OFFLINE
            </Text>
        </View>
    )

}

export default ConnectionIndicator;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'center',
        width: '100%',
        borderBottomEndRadius: 6,
        borderBottomStartRadius: 6,
    },

    text: {
        fontFamily: APPSTYLE.fonts.special.bold, 
        color: APPSTYLE.colors.text.bright,
    },
    
    connectionRestored: {
        backgroundColor: APPSTYLE.colors.action,
               
    },

    noConnection: {
        backgroundColor: APPSTYLE.colors.danger,     

    }


})