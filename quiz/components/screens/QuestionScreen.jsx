import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";

import {useEffect, useRef, useState} from 'react'

import FlatButton from '../shared/button'
import Card from "../shared/card";

const QuestionScreen = ({route, navigation}) => {
    const {params} = route;
    const questionData = route.params.question;
    const[answers, setAns] = useState([]) //questionData['answers']//.sort( () => .5 - Math.random()
    
    useEffect(() => {
        setAns(questionData['answers'].sort( () => .5 - Math.random()));
    }, [])

    const [anwsered, setAnwsered] = useState(false)
    const [score, setScore] = useState(route.params.score)
    const [time, setTime] = useState(params.duration);

    const questionButtons = useRef([])

    const checkAns = (index) => {
        //console.debug("PRESSED BUTON: " + index.toString() + answers[index].content + answers[index].isCorrect)
        //console.debug(route.params.test)

        if(anwsered) return;

        if(answers[index].isCorrect) setScore(score+1)
 
        for(let i = 0; i < questionButtons.current.length; i++) {
            //console.debug('IS' + i.toString() + 'COREECT' + answers[i].content + typeof(answers[i].isCorrect)+ (answers[i].isCorrect == "true") )
            if(answers[i].isCorrect) {
                questionButtons.current[i]?.setType('action');
            }
            else if(i == index) {
                //console.debug("DANGER")
                questionButtons.current[i]?.setType('danger');
            }
        }
        setAnwsered(true);
        
    }

    return(
        <View style = {route.params.style.screenBody}>
            <Card>
                <Text style={[style.title]}>{questionData.title}</Text>
                <Text style={[style.question]}>{questionData.question}</Text>
                <Text></Text>
                <View style={[style.answersContainer]}>
                    {answers.map((ans, index) => (
                        <FlatButton 
                            ref={(el) => questionButtons.current[index] = el} 
                            style={{marginBottom: 10}} 
                            key={ans.content} 
                            text={ans.content} 
                            onPress={() => {checkAns(index)}}/>
                    ))}
                </View>
            </Card>
            <FlatButton 
                type="action" 
                text="NEXT QUESTION >" 
                onPress={() => navigation.navigate(questionData.next, {test: route.params.test ,score: score})}/>
        </View>
    )
}

export default QuestionScreen;

const style = StyleSheet.create({
    title: {
        fontSize: 30,
        textAlign: "center",
        marginBottom: 10,
        fontFamily: 'Comfortaa-Bold',
    },

    question: {
        textAlign: "justify",
        marginBottom: 20, 
        fontFamily: 'SignikaNegative-Regular',
        fontSize: 20,
    }, 
    answersContainer: {
        display: "flex",
    }
})