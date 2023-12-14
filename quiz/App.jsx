import 'react-native-gesture-handler';

import {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

import SplashScreen from 'react-native-splash-screen';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';

import StartScreen from './components/screens/StartScreen';
import MainDrawer from './components/stacks/MainDrawer';


const Stack = createNativeStackNavigator()

const Empty = (props) => {
  const [isFirstRun, setIsFirstRun] = useState(true);
  const { navigation, route } = props

  useEffect(() => {
    const checkIfFirstRun = async () => {
      try {
        const value = await AsyncStorage.getItem('firstRun');
        if (value !== null) {
          console.log(value)
          setIsFirstRun(true);
          console.log("TO DRAWER")
          navigation.replace("Drawer");
        } else {
          console.log("TO RULES")
          navigation.replace("Rules");
        }
      } catch (error) {
        console.error('Error reading from AsyncStorage:', error);
      }
    };
    checkIfFirstRun();
  }, []);

  useEffect(() => {
  }, [isFirstRun, navigation]);
}

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='empty'>
        <Stack.Screen name='empty' component={Empty}/>
        <Stack.Screen name='Rules' component={StartScreen} />
        <Stack.Screen name='Drawer' component={MainDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;