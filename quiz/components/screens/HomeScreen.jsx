import { 
    View,
    Text,
    SafeAreaView,
    ScrollView,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from "react-native";

import { useEffect, useState, useCallback } from "react";

import { CommonActions, NavigationAction, useFocusEffect } from '@react-navigation/native';

import Card from "../shared/card";

const HomeScreen = ({navigation, route}) => {
    const {API} = route.params;
    const {tests} = route.params;

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    useFocusEffect(useCallback(() => {
        setTimeout(() => {
            console.log("CALL UPDATE HOOK")
            forceUpdate();
        }, 1000);
    }, []));

    const selectTest = async (testName, testId) => {
        navigation.getParent().dispatch((state)=>{
            CommonActions.reset(
                {index: 1}
            );
            
        });

        console.debug("SELECT TEST", testId);
        console.log("NAVIGATION, ", navigation.getParent().getState().routeNames)

        const navigateWith = (data) => {
            console.log("NAV WITH", data);
            navigation.navigate(testName, {testData: data});
        }
        
        await API.getTestDataFromApi(testId, navigateWith);
    }

    return(
        <ScrollView style = {route.params.style.screenBody}>
            {API.tests.map(x => (
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