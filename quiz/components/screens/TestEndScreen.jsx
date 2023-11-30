import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";

import FlatButton from '../shared/button'
import Card from "../shared/card";

const TestEndScreen = ({route, navigation}) => {
    const parentStyle = route.params.style;
    const testData = route.params.test;

    return(
        <View style = {parentStyle.screenBody}>
            <Card>
                <Text style={[style.title]}>{testData.name}</Text>
                <Text style={[style.score]}>SCORE: {route.params.score}</Text>
            </Card>
            <FlatButton type="action" text="Try Again" onPress={() => navigation.navigate("StartTestScreen")}/>
        </View>
    )
}

export default TestEndScreen;


const style = StyleSheet.create({
    title: {
        fontSize: 25,
        textAlign: "center",
        marginBottom: 10,
    },

    score: {
        fontSize: 15,
        textAlign: "center",
    }
})