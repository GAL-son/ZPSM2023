import { 
    View,
    Text,
    SafeAreaView,
    ScrollView,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    RefreshControl
} from "react-native";

import { useCallback, useState } from "react";

import Card from "../shared/card";

results = [
    {
        "nick": "Marek",
        "score": 18,
        "total": 20,
        "type": "historia",
        "date": "2022-11-22"
    },
    {
        "nick": "GAL_son",
        "score": 19,
        "total": 20,
        "type": "historia",
        "date": "2022-11-18"
    }, 
    {
        "nick": "Antonina",
        "score": 20,
        "total": 20,
        "type": "historia",
        "date": "2022-11-10"
    },
]

const ResultScreen = ({route, navigation}) => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
        setRefreshing(false);
        }, 2000);
    }, []);

    return(
        <SafeAreaView style = {route.params.style.screenBody}> 
            <Card>
                <View style={[styles.row]}>
                    <View style={[styles.borderSep, styles.notLast]}><Text style={[styles.top]}>Name</Text></View>
                    <View style={[styles.borderSep, styles.notLast]}><Text style={[styles.top]}>Test</Text></View>
                    <View style={[styles.borderSep, styles.notLast]}><Text style={[styles.top]}>Score</Text></View>
                    <View style={[styles.last]}><Text style={[styles.top]}>Date</Text></View>
                </View>
            </Card>
            
            <FlatList 
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                data={results}
                renderItem={({item}) => 
                    <Card>
                        <View style={[styles.row]}>
                            <View style={[styles.borderSep, styles.notLast]}><Text style={[styles.item]}>{item["nick"]}</Text></View>
                            <View style={[styles.borderSep, styles.notLast]}><Text style={[styles.item]}>{item["type"]}</Text></View>
                            <View style={[styles.borderSep, styles.notLast]}><Text style={[styles.item]}>{item["score"]}/{item["total"]}</Text></View>
                            <View style={[ styles.last]}><Text style={[styles.item]}>{item["date"]}</Text></View>
                        </View>
                    </Card>
                }
            />
        </SafeAreaView>
    )
}

export default ResultScreen;

const styles = StyleSheet.create({
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between'
    },

    notLast: {
        width: '25%',
    },

    borderSep: {
        borderEndColor: 'gray',
        borderEndWidth: 1
    },

    last: {
        flexGrow: 1,
        textAlign: 'right',
        paddingEnd: 2
    },

    top: {
        fontWeight: "bold",
        textAlign: 'center'
    },

    item: {
        textAlign: 'center'  
    },
})