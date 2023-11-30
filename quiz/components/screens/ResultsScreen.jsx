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

const TestScores = [
    {
        id: 0,
        nick: "GAL_son",
        test: "Test1",
        score: "23/24",
        date: "21-11-23"
    }, 
    {
        id: 1,
        nick: "Antonina",
        test: "Test1",
        score: "24/24",
        date: "29-10-23"
    },
]

const ResultScreen = ({route, navigation}) => {
    return(
        <ScrollView style = {route.params.style.screenBody}>
            <Card>
                <View style={[styles.row]}>
                    <Text style={[styles.top]}>Name</Text>
                    <Text style={[styles.top]}>Test</Text>
                    <Text style={[styles.top]}>Score</Text>
                    <Text style={[styles.top]}>Date</Text>
                </View>
            </Card>
            {TestScores.map(x => (
                <Card key={x.id}>
                    <View style={styles.row}>
                        <Text>{x.nick}</Text>
                        <Text>{x.test}</Text>
                        <Text>{x.score}</Text>
                        <Text>{x.date}</Text>
                    </View>
                </Card>
            ))}
        </ScrollView>
    )
}

export default ResultScreen;

const styles = StyleSheet.create({
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between'
    },

    top: {
        fontWeight: "bold",
    }
})