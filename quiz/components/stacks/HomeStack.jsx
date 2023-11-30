import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";


const Stack = createNativeStackNavigator()

const HomeStack = ({route}) => {
    return(
        <Stack.Navigator initialRouteName="HomeScreen" screenOptions={({ route, navigation }) => ({
            headerShown: false})}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} initialParams={route.params}/>
        </Stack.Navigator>
    )
}

export default HomeStack;