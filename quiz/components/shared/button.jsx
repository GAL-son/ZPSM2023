import React from 'react';
import { 
    TouchableOpacity,
    StyleSheet,
    Text,
    View
} from "react-native";

import { useState, useImperativeHandle} from "react";
import APPCOLORS from '../../styles/appStyle';


const FlatButton = React.forwardRef(({text, onPress, type, style}, ref ) => {
    
    const [stype, setType] = useState(type);

   
    useImperativeHandle(ref, () => ({
        setType(type) {
            setType(type)
        }
    }))

    const getTypeStyle = (type) => {
        switch(type){
            case "danger":
                return styles.danger;
            case "action":
                return styles.action;
            case "warning":                 
                return styles.warning;
            default:
                return styles.default;
        }
    }

    const getTypeTextStyle = (type) => {
        switch(type){
            case "action":
                return styles.textLight;
            case "warning": 
                return styles.textLight;
            case "danger":
                return styles.textLight;
            default:
                return styles.text;
        }
    }


    return(
        <TouchableOpacity style={style} onPress={onPress}>
            <View style={[styles.button, getTypeStyle(stype)]}>
                <Text style={[styles.buttonText, getTypeTextStyle(stype)]}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
})

export default FlatButton;

const styles = StyleSheet.create({
    button: {
        borderRadius: 8, 
        padding: 10,
        shadowOffset: { width: 1, height: 1},
        shadowColor: '#333' ,
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    buttonText: {
        textAlign: "center",
        fontFamily: APPSTYLE.fonts.special.bold,
    }, 
    default: {
        backgroundColor: APPSTYLE.colors.bgSecondary
    },
    action: {
        backgroundColor: APPSTYLE.colors.action
    },
    danger: {
        backgroundColor: APPSTYLE.colors.danger
    },
    textLight: {
        color: APPSTYLE.colors.text.bright
    },
    text: {
        color: APPSTYLE.colors.text.regular
    }
    
    
})