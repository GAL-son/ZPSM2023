import { Animated, View, Text, StyleSheet} from  'react-native'
import { useEffect, useRef, useState } from 'react';


import { useNetInfo } from "@react-native-community/netinfo";
import { addEventListener } from "@react-native-community/netinfo";


import APPSTYLE from '../../styles/appStyle';

const ConnectionIndicator = () => {
    const [connectionState, setConnectionState] = useState(true);
    const [visible, setVisible] = useState(true)
    const animState = new Animated.Value(0) // Initial value for opacity: 0

    const showAnim = (target) => {
        // setTimeout(() => {
        //     setVisible(false);
        // })
        Animated.timing(animState, {
            toValue: target,
            duration: 1500,
        }).start()        
    }

    // useEffect(() => {
    //     Animated.timing(fadeAnim, {
    //       toValue: 1,
    //       duration: 10000,
    //       useNativeDriver: true,
    //     }).start();
    //   }, [fadeAnim]);

    const toggleIndicator = (connectionState) => {
        if(connectionState) {
            showAnim(1)
        } else {
            showAnim(0)
        }
    }

    const unsubscribe = addEventListener(state => {
        if(connectionState !== state.isConnected) {
            setConnectionState(state.isConnected);
            toggleIndicator(connectionState)
        }       
      });
      
      // Unsubscribe
    //   unsubscribe();

    const translateYInterpolate = animState.interpolate({
        inputRange: [0,1],
        outputRange:[0,0.5]
    })

    return(
        <Animated.View 
            style={
                [styles.container,
                (connectionState) ? styles.connectionRestored : styles.noConnection, 
                {
                    // visible: (visible)? 'true': 'none',
                    // opacity: translateYInterpolate,
                    // // transform: [
                    //     {translateY: translateYInterpolate}
                    // ]
                }]}>
            <Text style={[styles.text]}>
                {(connectionState) ? "ONLINE" : "OFFLINE"}
            </Text>
            <Text>
                
            </Text>
        </Animated.View>
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