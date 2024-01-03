import { useState } from "react";
import _ from "lodash";

class Api {
    tests = [];

    setTests(tests) {
        this.tests = tests;
    } 

    shuffleTests() {
        this.tests=_.shuffle(this.tests);
    }

    async getTestsFromApi() {
        console.debug("START API REQUEST")
        try {
            const response = await fetch('https://tgryl.pl/quiz/tests');
            const json = await response.json();
            //console.debug(json);
            this.setTests(json);
            // console.debug(this.tests)
        } catch (e) {
            console.error(e)
        } 
    }

    async getTestDataFromApi(testId, callback) {
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
            callback(testInfo);
            return testInfo;
        } catch (e) {
            console.error(e)
        }
    }
}

export default Api;