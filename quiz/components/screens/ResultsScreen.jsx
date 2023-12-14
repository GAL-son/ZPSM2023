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

import { useCallback, useEffect, useState } from "react";

import Card from "../shared/card";

const ResultScreen = ({route, navigation}) => {
    const [refreshing, setRefreshing] = useState(false);
    const [results, setResults] = useState([])

    const getScoreFromApi = async () => {
        try {
            const response = await fetch('https://tgryl.pl/quiz/results?last=20');
            const json = await response.json();
            setResults(json);
        } catch (e) {
            console.error(e)
        }        
    }

    useEffect(() => {
        getScoreFromApi()
    }, [])

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            getScoreFromApi();
        } catch(e) {
            console.error(e)
        } finally {
            setRefreshing(false);
        }
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
                style={{height:'90%', shadowColor: '#000',shadowOpacity: 0.5,shadowRadius: 5,elevation: 2,}}
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
                            <View style={[styles.last]}><Text style={[styles.item]}>{item["createdOn"]}</Text></View>
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
        width: '25%',
        paddingEnd: 2
    },

    top: {
        fontFamily: 'Comfortaa-Bold',
        textAlign: 'center',
        fontSize: 17
    },

    item: {
        textAlign: 'center', 
        fontFamily: 'SignikaNegative-Regular', 
        margin: 5
    },
})