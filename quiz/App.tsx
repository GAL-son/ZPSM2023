import 'react-native-gesture-handler';

import * as React from 'react';
import { 
  View, 
  Text ,
  StyleSheet
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeStack from './components/stacks/HomeStack';
import TestStack from './components/stacks/TestStack';
import ResultScreen from './components/screens/ResultsScreen';

import TESTS from "./testData/tests";

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const testList = TESTS;

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeStack} initialParams={{tests: testList, style: globalstyle}}/>
        <Drawer.Screen name='Scores' component={ResultScreen} initialParams={{style: globalstyle}}/>
        <Drawer.Group>
          {testList.map(test => (
            <Drawer.Screen key={test.id} name={test.name} component={TestStack} initialParams={{test: test, style: globalstyle}} />
          ))}
        </Drawer.Group>
        
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const globalstyle = StyleSheet.create({
  screenBody: {
    padding: 10,
  }
})

export default App;