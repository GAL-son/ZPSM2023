import { 
    View,
    Text,
    SafeAreaView,
    ScrollView,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from "react-native";

import Card from "../shared/card";

const HomeScreen = ({navigation, route}) => {
    const tests = route.params.tests;

    return(
        <ScrollView style = {route.params.style.screenBody}>
            {tests.map(x => (
                <TouchableOpacity key={x.name} onPress={() => navigation.navigate(x.name)}>
                    <Card>
                        <Text style={homeStyle.testHead}>{x.name}</Text>
                        <Text style={homeStyle.smallText}>{x.description}</Text>
                        <Text style={homeStyle.smallText}>Length: {x.tasks.length}</Text>
                    </Card>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

const homeStyle = StyleSheet.create({
    testHead: {
        fontSize: 20,
        fontFamily: 'Comfortaa-Bold',
        marginBottom: 5
    },

    smallText: {
        fontFamily: 'SignikaNegative-Regular',
        fontSize: 15,
    }
})

export default HomeScreen;