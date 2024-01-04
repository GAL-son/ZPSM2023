import { useState } from "react";
import _ from "lodash";

import AsyncStorage from '@react-native-async-storage/async-storage'
import { fetch as niFetch } from "@react-native-community/netinfo";

class Api {
    tests = [];

    setTests(tests) {
        this.tests = tests;
    } 

    shuffleTests() {
        this.tests=_.shuffle(this.tests);
    }

    async initAsyncStorage() {
        const state = await niFetch();
        await this.getTestsFromApi(false);
        console.debug("API - initAsyncStorage() - tests"+ JSON.stringify(this.tests))
        this.tests.forEach(test => {
            this.getTestDataFromApi(test.id, (x) => {}, true);
        });
    }

    async sendResultToApi(info) {
        const {nick, score, total, name} = info;
        console.debug(name)   
        try {
            fetch('https://tgryl.pl/quiz/result' , {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    nick: nick,
                    type: name,
                    total: total,
                    score: score
                  }),
            }).then(r => console.info(r.status))
        } catch(e) {
            console.error(e);
        }
    }

    async getTestsFromApi(update=false) {
        if(update) {
            console.debug("START API REQUEST")
            try {
                const response = await fetch('https://tgryl.pl/quiz/tests');
                // await AsyncStorage.setItem("tests", response)
                console.debug("API.getTestsFromAPI() -> response: " + JSON.stringify(response));
                const json = await response.json();
                console.debug("API.getTestsFromAPI() -> JSON: " + JSON.stringify(json));
                this.setTests(_.shuffle(json));
                console.debug("API.getTestsFromAPI() -> API.tests: " + this.tests)
                await AsyncStorage.setItem('tests', JSON.stringify(this.tests))
            } catch (e) {
                console.error(e)
            }
        } else {
            console.debug("API - READ LOCAL TESTS")
            let readTests = await AsyncStorage.getItem('tests');
            
            if(readTests!==null) {
                console.debug("API - LOCAL TESTS" + readTests)
                this.setTests(_.shuffle(JSON.parse(readTests)))
            } else {
                console.error("FAILET TO READ ASYNC STORAGE")
            }
        }
    }

    async getTestDataFromApi(testId, callback, update=false) {
        if(update) {
            console.debug("GET TEST DATA FROM API")
            console.log(callback)
            try {
                const response = await fetch('https://tgryl.pl/quiz/test/'+testId);
                const json = await response.json();
                const testInfo = json;

                // Iterate over all questions
                for(let i = 0; i < testInfo.tasks.length; i++) {
                    testInfo.tasks[i]['title'] = "Question " + (i+1).toString();
                    testInfo.tasks[i]["next"] = (i == testInfo.tasks.length-1) ? "END" : "Question " + (i+2).toString();;             
                }       
                
                //console.debug("TEST INFO: ", testInfo)
                await AsyncStorage.setItem(testId, JSON.stringify(testInfo));
                callback(testInfo);
                return testInfo;
            } catch (e) {
                console.error(e)
            }
        } else {
            console.debug("API.getTestDataFromApi - READ LOCAL TESTS DATA")
            let localTestData = await AsyncStorage.getItem(testId)
            if(localTestData) {
                const testInfo = JSON.parse(localTestData);
                console.debug("API - LOCAL TESTS" + localTestData)
                for(let i = 0; i < testInfo.tasks.length; i++) {
                    testInfo.tasks[i]['title'] = "Question " + (i+1).toString();
                    testInfo.tasks[i]["next"] = (i == testInfo.tasks.length-1) ? "END" : "Question " + (i+2).toString();;             
                }       
                
                callback(testInfo)
                return(testInfo)
            } else {
                console.error("FAILET TO READ ASYNC STORAGE")
            }
        }
    }
}

export default Api;