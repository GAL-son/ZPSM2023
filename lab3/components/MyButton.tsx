import { TouchableOpacity } from 'react-native';
import { Text, View } from "react-native";
import React, { useState } from 'react';

type MyButtonProps = {
    value: string;
    styleButton: any;
    styleText: any;
    onPress: () => void;
}

const MyButton = (props: MyButtonProps) => {

    return(
        <TouchableOpacity style={props.styleButton} onPress={props.onPress}>
            <Text style={props.styleText}>{props.value}</Text>
        </TouchableOpacity>
    );
}

export default MyButton;

