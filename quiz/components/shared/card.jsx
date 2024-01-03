import React from 'react';
import { StyleSheet, View } from "react-native";

import APPSTYLE from "../../styles/appStyle"

const Card = (props) => {
    return(
        <View style={[styles.card, props.style]}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </View>
    )
}

export default Card;

const styles = StyleSheet.create({
    card: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: APPSTYLE.colors.bgPrimary,
        shadowOffset: { width: 1, height: 1},
        shadowColor: APPSTYLE.colors.text.dark,
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginVertical: 5
    },
    cardContent: {
        margin: 10,
        color: "#000"
    }
})