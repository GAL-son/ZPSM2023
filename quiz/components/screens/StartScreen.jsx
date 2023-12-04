import { 
    View, 
    Text,
    StyleSheet,
    ScrollView
} from "react-native";

import { useState, useEffect } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage'

import FlatButton from "../shared/button";
import Card from "../shared/card";

const StartScreen = (props) => {

    const [isFirstRun, setIsFirstRun] = useState(true);
    const {navigation, route} = props

    useEffect(() => {
        const checkIfFirstRun = async () => {
            try {
                const value = await AsyncStorage.getItem('firstRun');
                if (value !== null) {
                    setIsFirstRun(false);
                }
            } catch (error) {
                console.error('Error reading from AsyncStorage:', error);
            }
        };
        checkIfFirstRun();
    }, []);

    useEffect(() => {
        if (!isFirstRun) {
            navigation.replace("Drawer");
        }
    }, [isFirstRun, navigation]);

    const handleAgree = async () => {
        try {
            await AsyncStorage.setItem('firstRun', 'true');
            navigation.replace("Drawer");
        } catch (error) {
            console.error('Error writing to AsyncStorage:', error);
        }
    };

    return(
        <View style={startStyle.screenBody}>
            <Card style={startStyle.card}>
                <View style={startStyle.padding}>
                    <Text style={startStyle.head} >REGULAMIN</Text>
                    <ScrollView style={startStyle.scroll}>
                    
                        <Text style={startStyle.scrollText}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore nemo nostrum, natus dolorem vitae fugit quam ullam temporibus dicta cupiditate necessitatibus, repudiandae ea deleniti. Quibusdam, facilis officia! Assumenda, aut ipsa!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore nemo nostrum, natus dolorem vitae fugit quam ullam temporibus dicta cupiditate necessitatibus, repudiandae ea deleniti. Quibusdam, facilis officia! Assumenda, aut ipsa!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore nemo nostrum, natus dolorem vitae fugit quam ullam temporibus dicta cupiditate necessitatibus, repudiandae ea deleniti. Quibusdam, facilis officia! Assumenda, aut ipsa!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore nemo nostrum, natus dolorem vitae fugit quam ullam temporibus dicta cupiditate necessitatibus, repudiandae ea deleniti. Quibusdam, facilis officia! Assumenda, aut ipsa!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore nemo nostrum, natus dolorem vitae fugit quam ullam temporibus dicta cupiditate necessitatibus, repudiandae ea deleniti. Quibusdam, facilis officia! Assumenda, aut ipsa!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore nemo nostrum, natus dolorem vitae fugit quam ullam temporibus dicta cupiditate necessitatibus, repudiandae ea deleniti. Quibusdam, facilis officia! Assumenda, aut ipsa!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore nemo nostrum, natus dolorem vitae fugit quam ullam temporibus dicta cupiditate necessitatibus, repudiandae ea deleniti. Quibusdam, facilis officia! Assumenda, aut ipsa!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore nemo nostrum, natus dolorem vitae fugit quam ullam temporibus dicta cupiditate necessitatibus, repudiandae ea deleniti. Quibusdam, facilis officia! Assumenda, aut ipsa!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore nemo nostrum, natus dolorem vitae fugit quam ullam temporibus dicta cupiditate necessitatibus, repudiandae ea deleniti. Quibusdam, facilis officia! Assumenda, aut ipsa!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore nemo nostrum, natus dolorem vitae fugit quam ullam temporibus dicta cupiditate necessitatibus, repudiandae ea deleniti. Quibusdam, facilis officia! Assumenda, aut ipsa!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore nemo nostrum, natus dolorem vitae fugit quam ullam temporibus dicta cupiditate necessitatibus, repudiandae ea deleniti. Quibusdam, facilis officia! Assumenda, aut ipsa!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore nemo nostrum, natus dolorem vitae fugit quam ullam temporibus dicta cupiditate necessitatibus, repudiandae ea deleniti. Quibusdam, facilis officia! Assumenda, aut ipsa!
                        </Text>
                        
                    </ScrollView>
                </View>
            </Card>
            <FlatButton type="action" text="Agree" onPress={() => handleAgree()}/>
        </View>
    )
}

const startStyle = StyleSheet.create({
    screenBody: {
      padding: 10,
    },
    
    scroll: {
        height: '90%',
    },

    scrollText: {
        textAlign: 'justify'
    },  

    card: {
        height: '90%',
        marginBottom: '3'
    },



    padding: {
        padding: 10
    },
    
    head: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10
    }
})

export default StartScreen;