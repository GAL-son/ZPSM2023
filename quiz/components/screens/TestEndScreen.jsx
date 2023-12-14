import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";

import FlatButton from '../shared/button'
import Card from "../shared/card";
import { useEffect } from "react";

const TestEndScreen = ({route, navigation}) => {
    const parentStyle = route.params.style;
    const testData = route.params.test;
    const total = testData['tasks'].length;

    const sendResultToApi = async (info) => {
        const {nick, score, total, name} = info;
        console.debug(name)   
        try {
            fetch('https://tgryl.pl/quiz/result' , {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    nick: nick,
                    type: name,
                    total: total,
                    score: score
                  }),
            }).then(r => console.info(r.status))
        } catch(e) {
            console.error(e);
        }
    }

    useEffect(() => {
        const info = {
            nick: 'GAL_son',
            name: testData.name,
            total: total.toString(),
            score: route.params.score.toString(),
        }

             
        sendResultToApi(info);
    }, [])



    return(
        <View style = {parentStyle.screenBody}>
            <Card>
                <Text style={[style.title]}>{testData.name}</Text>
                <Text style={[style.score]}>{testData.description}</Text>
                <Text style={[style.score]}>SCORE: {route.params.score}/{total}</Text>
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
    }
})