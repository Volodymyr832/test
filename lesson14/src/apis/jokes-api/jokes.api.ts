import { IApiService } from '../../services/interfaces/i-api.service';
import { JokeDto } from './dtos/joke.dto';

export class JokesApi {
    constructor(private apiService: IApiService) {}

    public async getRandomJokes(count: number = 5): Promise<[Response, JokeDto[]]> {
        const response = await this.apiService.get(`/jokes/random/${count}`);
        const data = (await response.json()) as JokeDto[];
        return [response, data];
    }

    public async getSingleRandomJoke(): Promise<[Response, JokeDto]> {
        const response = await this.apiService.get(`/jokes/random`);
        const data = (await response.json()) as JokeDto;
        return [response, data];
    }

    public async getTenRandomJokes(): Promise<[Response, JokeDto[]]> {
        const response = await this.apiService.get(`/jokes/ten`);
        const data = (await response.json()) as JokeDto[];
        return [response, data];
    }

    public async getJokesByType(type: string): Promise<[Response, JokeDto[]]> {
        const response = await this.apiService.get(`/jokes/${type}/ten`);
        const data = (await response.json()) as JokeDto[];
        return [response, data];
    }

    public async getJokeById(id: number): Promise<[Response, JokeDto]> {
        const response = await this.apiService.get(`/jokes/${id}`);
        const data = (await response.json()) as JokeDto;
        return [response, data];
    }
}
