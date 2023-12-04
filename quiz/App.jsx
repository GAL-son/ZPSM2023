import 'react-native-gesture-handler';

import * as React from 'react';
import { 
  View, 
  Text ,
  StyleSheet
} from 'react-native';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';

import StartScreen from './components/screens/StartScreen';
import MainDrawer from './components/stacks/MainDrawer';


const Stack = createNativeStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Rules'>
        <Stack.Screen name='Rules' component={StartScreen}/>
        <Stack.Screen name='Drawer' component={MainDrawer}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;