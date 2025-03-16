import { IApiService } from './interfaces/i-api.service';

interface FetchApiServiceOptions {
    apiKey?: string;
}

export class FetchApiService implements IApiService {
    constructor(
        private baseUrl: string,
        private options: FetchApiServiceOptions = {}
    ) {}

    async get(endpoint: string): Promise<Response> {
        const headers: HeadersInit = this.getHeaders();
        return fetch(`${this.baseUrl}${endpoint}`, { method: 'GET', headers });
    }

    async post(endpoint: string, body: any): Promise<Response> {
        const headers: HeadersInit = this.getHeaders({ 'Content-Type': 'application/json' });
        return fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        });
    }

    async postForm(endpoint: string, body: FormData): Promise<Response> {
        const headers: HeadersInit = this.getHeaders();
        return fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers,
            body
        });
    }

    private getHeaders(additional?: HeadersInit): HeadersInit {
        const headers: HeadersInit = additional || {};

        if (this.options.apiKey) {
            headers['x-api-key'] = this.options.apiKey;
        }

        return headers;
    }
}
