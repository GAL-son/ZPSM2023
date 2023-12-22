import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";

import HomeScreen from "../screens/HomeScreen";
import { CommonActions } from '@react-navigation/native';


const Stack = createNativeStackNavigator()

const HomeStack = ({route, navigation}) => {
    // useEffect(()=>{
    //     setTimeout(() => {
    //         console.log(navigation.getState());
    //         navigation.dispatch(CommonActions.reset());
    //     }, 1000);
    // },[])
    return(
        <Stack.Navigator initialRouteName="HomeScreen" screenOptions={({ route, navigation }) => ({
            headerShown: false})}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} initialParams={route.params}/>
        </Stack.Navigator>
    )
}

export default HomeStack;