import { expect } from 'chai';
import 'mocha';
import AxiosHttpClient from "../../../src/lib/HttpClient/AxiosHttpClient";
import HttpClient from "../../../src/lib/HttpClient/HttpClient";

describe('HttpClient integration test cases', () => {
   it('should be able to send HTTP GET request to jsonplaceholder dummy API', async () => {
        const httpClient : HttpClient = new AxiosHttpClient();
        const {data: actualData} = await httpClient.get('https://jsonplaceholder.typicode.com/todos/1');
        const expectedData = {
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": false,
        };
        expect(actualData).to.deep.equal(expectedData);
   });
});