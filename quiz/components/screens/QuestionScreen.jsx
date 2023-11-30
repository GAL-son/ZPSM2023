import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";

import {useRef, useState} from 'react'

import FlatButton from '../shared/button'
import Card from "../shared/card";

const QuestionScreen = ({route, navigation}) => {
    const questionData = route.params.question;
    const [anwsered, setAnwsered] = useState(false)
    const [score, setScore] = useState(route.params.score)

    const questionButtons = useRef([])

    const checkAns = (index) => {

        if(anwsered) return;

        if(questionData.anwsers[index] === questionData.correct) setScore(score+1)
 
        for(let i = 0; i < questionButtons.current.length; i++) {
            if(questionData.anwsers[i] === questionData.correct) {
                questionButtons.current[i]?.setType('action');
            }
            else if(i == index) {
                console.log("DANGER")
                questionButtons.current[i]?.setType('danger');
            }
        }
        setAnwsered(true);
        
    }

    return(
        <View style = {route.params.style.screenBody}>
            <Card>
                <Text style={[style.title]}>{questionData.title}</Text>
                <Text style={[style.question]}>{questionData.content}</Text>
                <View style={[style.anwsersContainer]}>
                    {questionData.anwsers.map((ans, index) => (
                        <FlatButton ref={(el) => questionButtons.current[index] = el} style={{marginBottom: 10}} key={ans} text={ans} onPress={() => {checkAns(index)}}/>
                    ))}
                </View>
            </Card>
            <FlatButton type="action" text="NEXT QUESTION >" onPress={() => navigation.navigate(questionData.next, {test: route.params.test ,score: score})}/>
        </View>
    )
}

export default QuestionScreen;

const style = StyleSheet.create({
    title: {
        fontSize: 25,
        textAlign: "center",
        marginBottom: 10,
    },

    question: {
        textAlign: "justify",
        marginBottom: 20
    }, 
    anwsersContainer: {
        display: "flex",
    }
})