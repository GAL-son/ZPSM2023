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

import Api from './components/api';
import ConnectionIndicator from './components/shared/ConnectionIndicator';

const Stack = createNativeStackNavigator()

const Empty = (props) => {
  const [isFirstRun, setIsFirstRun] = useState(true);
  const { navigation, route } = props
  const {API} = route.params

  useEffect(() => {
    const checkIfFirstRun = async () => {
      await API.getTestsFromApi();
      try {
        const value = await AsyncStorage.getItem('firstRun');
        route.params.hideSplash();
        if (value !== null) {
          console.log(value)
          setIsFirstRun(true);
          console.log("TO DRAWER")
          navigation.replace("Drawer"/*, {API: route.params.API}*/);
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
}

function App() {
  const API = new Api();

  //   useEffect(() => {
  //   console.debug("USE EFFECT")
  //   const useApi = async () => {
  //     console.debug("USE API")
  //     await API.getTestsFromApi();
  //     //console.debug("AFTER USE API")
  //   }

  //   useApi().then(() => {console.info(API.tests); SplashScreen.hide();})
  //   //SplashScreen.hide();
  // }, []);

  // useEffect(()=>{
    
  // }, [])

  return (
    <>
    <ConnectionIndicator></ConnectionIndicator>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='empty'>
        <Stack.Screen name='empty' component={Empty} initialParams={{API: API, hideSplash: () => {SplashScreen.hide()}}}/>
        <Stack.Screen name='Rules' component={StartScreen} />
        <Stack.Screen name='Drawer' component={MainDrawer} initialParams={{API: API}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}

export default App;