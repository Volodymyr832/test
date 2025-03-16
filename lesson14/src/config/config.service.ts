import { config, ConfigDto } from './config';

export class ConfigService {
    private _config: ConfigDto;

    constructor() {
        this._config = config;
    }

    getConfig(): ConfigDto {
        return this._config;
    }
}
