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
                        <Text>{x.description}</Text>
                        <Text>Length: {x.tasks.length}</Text>
                    </Card>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

const homeStyle = StyleSheet.create({
    testHead: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5
    },
})

export default HomeScreen;