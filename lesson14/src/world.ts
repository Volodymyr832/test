import { JokesApi } from './apis/jokes-api/jokes.api';
import { FetchApiService } from './services/fetch-api.service';
import { ConfigService } from './config/config.service';

export class ApiWorld {
    private _configService: ConfigService;
    private _jokesApiService: FetchApiService;
    private _jokesApi: JokesApi;

    constructor() {
        this._configService = new ConfigService();
        const jokesApiConfig = this._configService.getConfig().api.jokesApi;

        this._jokesApiService = new FetchApiService(jokesApiConfig.baseUrl, {
            apiKey: jokesApiConfig.apiKey
        });

        this._jokesApi = new JokesApi(this._jokesApiService);
    }

    get jokesApi(): JokesApi {
        return this._jokesApi;
    }

    get configService(): ConfigService {
        return this._configService;
    }
}
