import {useState, useEffect, useCallback} from 'react';

import { 
    View, 
    Text ,
    StyleSheet
} from 'react-native';

import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator , DrawerItem} from "@react-navigation/drawer";

import HomeStack from './HomeStack';
import TestStack from './TestStack';

import ResultScreen from '../screens/ResultsScreen';

import TESTS from "../../testData/tests"
import FlatButton from '../shared/button';



const testList = TESTS;

const Drawer = createDrawerNavigator();

const MainDrawer = ({route, navigation}) => {
    const {API} = route.params
    const [tests, setTests] = useState(API.tests)
    const [, updateState] = useState();

    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(()=>{console.log("MainDrawer.Start API: " + API.tests)},[])

    const CustomDrawerContent = (props) => {
        const {state, navigation, descriptors} = {...props}        

        return(
            <DrawerContentScrollView {...props}>
                {state.routes.map(route => (
                    <DrawerItem
                        key={route.key}
                        label={route.name}
                        onPress={async () => {
                            const routeOptions = descriptors[route.key].options
                            switch(routeOptions.type) {
                                case "screen":
                                    navigation.navigate(route.name)
                                    break;
                                case "test":
                                    await API.getTestDataFromApi(descriptors[route.key].options.id, (data) => {
                                        navigation.navigate(route.name, {testData: data})
                                    });
                                    break;
                            }
                        }} 
                    />
                ))}
                <FlatButton
                    text="Random Test"
                    // type="action"
                    style={{padding:5}}
                    onPress={async () => {
                        const numOfTest = Object.values(state.routeNames).length -2 ;
                        const randomTestIdx = Math.floor(Math.random() * numOfTest) + 2;

                        const testKey = state.routes[randomTestIdx].key
                        const testName = state.routeNames[randomTestIdx]
                        console.log(testKey)

                        await API.getTestDataFromApi(descriptors[testKey].options.id, (data) => {
                            navigation.navigate(testName, {testData: data})
                        });

                    }}

                />
                <FlatButton
                    text="Refresh Tests"
                    type="action"
                    style={{padding:5}}
                    onPress={() => {
                        console.log("REFRESH TESTS");
                        API.getTestsFromApi(false);
                    }}

                />
            </DrawerContentScrollView>
        )
    }

    const getTestData = async (id) => {
        await API.getTestDataFromApi(id).then(res => {console.log(res); return res});
    }
    
    return(
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen 
                name="Home" component={HomeStack} initialParams={{style: globalstyle, API: API, tests: tests}} options={{type: "screen"}}/>
            <Drawer.Screen 
                name='Scores' component={ResultScreen} initialParams={{style: globalstyle}} options={{type: "screen"}}/>
            <Drawer.Group screenOptions={{presentation: 'modal'}}>
            {tests.map(test => (
                <Drawer.Screen 
                    key={test.name} 
                    name={test.name} 
                    component={TestStack} 
                    initialParams={{test: test, id: test.id, style: globalstyle, API: API}} 
                    options={{test: test, id: test.id, type: "test"}}
                    />
            ))}
            </Drawer.Group>            
        </Drawer.Navigator>
    )
}

const globalstyle = StyleSheet.create({
    screenBody: {
      padding: 10,
    }
})

export default MainDrawer;