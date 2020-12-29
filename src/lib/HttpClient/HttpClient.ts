import HttpResponse from './HttpResponse';

interface HttpClient {
    get(url: string): Promise<HttpResponse>;
}

export default HttpClient;
