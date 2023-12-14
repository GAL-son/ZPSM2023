import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";

import FlatButton from '../shared/button'
import Card from "../shared/card";

const TestStartScreen = ({route, navigation}) => {
    const testData = route.params.test;
    const style = route.params.style;

    return(
        <View style = {style.screenBody}>
            <Card>
                <Text style={[testStartStyle.title]}>{testData.name}</Text>
                <Text style={[testStartStyle.smallText]}>{testData.description}</Text>
            </Card>
            <FlatButton type="action" text="Try solving the test" onPress={() => navigation.navigate(route.params.firstQuestion, {test: testData, score: 0})}/>
        </View>
    )
}

const testStartStyle = StyleSheet.create({
    title: {
        fontSize: 30,
        textAlign: "center",
        marginBottom: 10,
        fontFamily: 'Comfortaa-Bold',
    },

    smallText: {
        fontFamily: 'SignikaNegative-Regular',
        fontSize: 15,
    }
})

export default TestStartScreen;