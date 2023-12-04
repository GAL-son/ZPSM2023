import * as React from 'react';

import { 
    View, 
    Text ,
    StyleSheet
} from 'react-native';

import { createDrawerNavigator } from "@react-navigation/drawer";
import { CommonActions } from '@react-navigation/native';

import HomeStack from './HomeStack';
import TestStack from './TestStack';

import ResultScreen from '../screens/ResultsScreen';

import TESTS from "../../testData/tests"

const testList = TESTS;

const Drawer = createDrawerNavigator();

const MainDrawer = ({route, navigation}) => {

    return(
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={HomeStack} initialParams={{tests: testList, style: globalstyle}}/>
            <Drawer.Screen name='Scores' component={ResultScreen} initialParams={{style: globalstyle}}/>
            <Drawer.Group>
            {testList.map(test => (
                <Drawer.Screen key={test.id} name={test.name} component={TestStack} initialParams={{test: test, style: globalstyle}} />
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