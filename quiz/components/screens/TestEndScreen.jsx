import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";

import { useEffect, useState } from "react";
import { fetch as niFetch } from "@react-native-community/netinfo";

import FlatButton from '../shared/button'
import Card from "../shared/card";

import APPSTYLE from '../../styles/appStyle'

const TestEndScreen = ({route, navigation}) => {
    const parentStyle = route.params.style;
    const testData = route.params.test;
    const API = route.params.api;
    const total = testData['tasks'].length;

    const [isConn, setConn] = useState(false);

    useEffect(() => {
        const apiInternetCheck = async () => {
            const state = await niFetch();
            if(state.isConnected) {
                API.sendResultToApi(info);
            } else  {
                setConn(false)
            }
        }
        const info = {
            nick: 'GAL_son',
            name: testData.name,
            total: total.toString(),
            score: route.params.score.toString(),
        }
        apiInternetCheck()
        
        
    }, [])



    return(
        <View style = {parentStyle.screenBody}>
            <Card>
                <Text style={[style.title]}>{testData.name}</Text>
                <Text style={[style.score]}>{testData.description}</Text>
                <Text style={[style.score]}>SCORE: {route.params.score}/{total}</Text>
                <Text style={[style.warning]}>
                    {(isConn) ? "You're OFFLINE - Test result will not be uploaded" : ""}
                </Text>
            </Card>
            <FlatButton type="action" text="Try Again" onPress={() => navigation.navigate("StartTestScreen")}/>
        </View>
    )
}

export default TestEndScreen;


const style = StyleSheet.create({
    title: {
        fontSize: 30,
        textAlign: "center",
        marginBottom: 10,
        fontFamily: 'Comfortaa-Bold',
    },

    score: {
        fontSize: 15,
        fontFamily: 'SignikaNegative-Regular',
        textAlign: "center",
        marginTop: 5,
    },

    warning: {
        textAlign: 'center',
        color: APPSTYLE.colors.danger
    }
})