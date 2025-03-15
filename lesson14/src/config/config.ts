export interface ConfigDto {
    api: {
        jokesApi: {
            baseUrl: string;
            apiKey?: string;
        };
    };
}

export const config: ConfigDto = {
    api: {
        jokesApi: {
            baseUrl: 'https://official-joke-api.appspot.com',
            apiKey: ''
        }
    }
};
