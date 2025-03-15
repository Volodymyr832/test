export interface IApiService {
    get(endpoint: string): Promise<Response>;
    post(endpoint: string, body: any): Promise<Response>;
    postForm?(endpoint: string, body: FormData): Promise<Response>;
}
