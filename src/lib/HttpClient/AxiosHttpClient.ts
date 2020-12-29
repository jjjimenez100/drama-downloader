import axios from 'axios';
import HttpClient from './HttpClient';
import HttpResponse from './HttpResponse';

class AxiosHttpClient implements HttpClient {
    get(url: string): Promise<HttpResponse> {
        return axios.get(url);
    }
}

export default AxiosHttpClient;
