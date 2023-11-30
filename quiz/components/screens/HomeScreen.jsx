import { 
    View,
    Text,
    SafeAreaView,
    ScrollView,
    FlatList,
    TouchableOpacity
} from "react-native";

import Card from "../shared/card";

const HomeScreen = ({navigation, route}) => {
    const tests = route.params.tests;

    return(
        <ScrollView style = {route.params.style.screenBody}>
            {tests.map(x => (
                <TouchableOpacity key={x.id} onPress={() => navigation.navigate(x.name)}>
                    <Card>
                        <Text>{x.name}</Text>
                        <Text>{x.description}</Text>
                    </Card>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

export default HomeScreen;