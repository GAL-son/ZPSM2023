import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackActions } from '@react-navigation/native';

import TestStartScreen from "../screens/TestStartScreen";
import TestEndScreen from "../screens/TestEndScreen";
import QuestionScreen from "../screens/QuestionScreen";


const Stack = createNativeStackNavigator()

const TestStack = ({route, navigation}) => {
    const testData = route.params.test;
    const style = route.params.style;

    const getTestQuestions = () => {
        for(let i = 0; i < testData.questions.length; i++) {
            testData.questions[i]["next"] = (i == testData.questions.length-1) ? "END" : testData.questions[i+1].title;
        }

        return testData.questions;
    }

    // navigation.dispatch(
    //     StackActions.replace("StartTestScreen")
    // );

    return(
        <Stack.Navigator initialRouteName="StartTestScreen" screenOptions={({ route, navigation }) => ({
            headerShown: false})}>
            <Stack.Screen name="StartTestScreen" component={TestStartScreen} initialParams={{style: style, test: testData, firstQuestion: testData.questions[0].title}} />
            {getTestQuestions().map(x => (
                <Stack.Screen key={x} name={x.title} component={QuestionScreen} initialParams={{style: style, question: x}}/>
            ))}
            <Stack.Screen name="END" component={TestEndScreen}  initialParams={{style: style}}/>
        </Stack.Navigator>
    )
}

export default TestStack;