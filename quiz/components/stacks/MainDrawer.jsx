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

    useEffect(()=>{console.log(navigation.getState())},[navigation])

    const CustomDrawerContent = (props) => {
        const { items } = props
        //console.log(props)

        return(
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props}/>
                <FlatButton
                    text="Refresh Tests"
                    type="action"
                    style={{padding:5}}
                    onPress={() => {
                        console.log("REFRESH TESTS");
                        API.getTestsFromApi().then(() => setTests(API.tests))
                        
                        //forceUpdate()
                    }}

                    // TO DO: replace all screen items with 
                />
            </DrawerContentScrollView>
        )
    }

    const getTestData = async (id) => {
        await API.getTestDataFromApi(id).then(res => {console.log(res); return res});
    }
    
    return(
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={HomeStack} initialParams={{style: globalstyle, API: API, tests: tests}}></Drawer.Screen>
            <Drawer.Screen name='Scores' component={ResultScreen} initialParams={{style: globalstyle}}/>
            <Drawer.Group screenOptions={{presentation: 'modal'}}>
            {tests.map(test => (
                <Drawer.Screen key={test.name} name={test.name} component={TestStack} initialParams={{test: test, id: test.id, style: globalstyle, API: API}} />
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