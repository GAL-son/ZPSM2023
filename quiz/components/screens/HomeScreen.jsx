import { 
    View,
    Text,
    SafeAreaView,
    ScrollView,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from "react-native";

import { useEffect, useState } from "react";

import Card from "../shared/card";

const HomeScreen = ({navigation, route}) => {
    const getTestsFromApi = async (updateTests) => {
        try {
            const response = await fetch('https://tgryl.pl/quiz/tests');
            const json = await response.json();
            updateTests(json);
        } catch (e) {
            console.error(e)
        }        
    }

    const [tests, getTest] = useState([])
    useEffect(() => {getTestsFromApi(getTest)}, [])

    const selectTest = async (testName, testId) => {
        try {
            const response = await fetch('https://tgryl.pl/quiz/test/'+testId);
            const json = await response.json();
            const testInfo = json;

            // Iterate over all questions
            for(let i = 0; i < testInfo.tasks.length; i++) {
                testInfo.tasks[i]['title'] = "Question " + (i+1).toString();
                testInfo.tasks[i]["next"] = (i == testInfo.tasks.length-1) ? "END" : "Question " + (i+2).toString();;             
            }

            console.info("NAVIGATE" + testName)
            navigation.navigate(testName, {testData: testInfo});            
        } catch (e) {
            console.error(e)
        }
        

        
    }

    return(
        <ScrollView style = {route.params.style.screenBody}>
            {tests.map(x => (
                <TouchableOpacity key={x.name} onPress={() => selectTest(x.name, x.id)}>
                    <Card>
                        <Text style={homeStyle.testHead}>{x.name}</Text>
                        <Text style={homeStyle.smallText}>{x.description}</Text>
                        <Text style={homeStyle.smallText}>Length: {x.numberOfTasks}</Text>
                    </Card>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

const homeStyle = StyleSheet.create({
    testHead: {
        fontSize: 20,
        fontFamily: 'Comfortaa-Bold',
        marginBottom: 5
    },

    smallText: {
        fontFamily: 'SignikaNegative-Regular',
        fontSize: 15,
    }
})

export default HomeScreen;