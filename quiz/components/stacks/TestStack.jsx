import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackActions } from '@react-navigation/native';

import TestStartScreen from "../screens/TestStartScreen";
import TestEndScreen from "../screens/TestEndScreen";
import QuestionScreen from "../screens/QuestionScreen";
import { useEffect, useState } from "react";


const Stack = createNativeStackNavigator()

const TestStack = ({route, navigation}) => {
    const testData = route.params.testData;
    const style = route.params.style;
    const API = route.params.api

    useEffect(() => {console.log( testData.tasks);}, [])

    //const [testData, setTestData] = useState([])

    // const getTestQuestions = () => {
    //     console.log(testData)
    //     if(testData == []) return null;
        
    //     for(let i = 0; i < testData.tasks.length; i++) {
    //         testData.tasks[i]['title'] = "Question" + i.toString();
    //         testData.tasks[i]["next"] = (i == testData.tasks.length-1) ? "END" : testData.tasks[i+1].title;
    //         console.log( testData.tasks[i]);
    //     }

    //     return testData.tasks;
    // }

    const getFirstTaskTitle = () => {

    } 

    // navigation.dispatch(
    //     StackActions.replace("StartTestScreen")
    // );

    return(
        <Stack.Navigator initialRouteName="StartTestScreen" screenOptions={({ route, navigation }) => ({
            headerShown: false})}>
            <Stack.Screen name="StartTestScreen" component={TestStartScreen} 
            initialParams={{
                style: style, 
                test: testData, 
                firstQuestion: 
                testData.tasks[0].title}} />
            {testData.tasks.map(x => (
                <Stack.Screen key={x.title} name={x.title} component={QuestionScreen} initialParams={{style: style, question: x}}/>
            ))}
            <Stack.Screen name="END" component={TestEndScreen}  initialParams={{style: style, api: API}}/>
        </Stack.Navigator>
    )
}

export default TestStack;