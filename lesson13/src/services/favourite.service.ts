import axios, { AxiosInstance } from 'axios';
import { FavouriteDto } from '../models/favourite.dto';

export class FavouriteService {
  private client: AxiosInstance;

  constructor(private xApiKey: string) {
    this.client = axios.create({
      baseURL: 'https://api.thecatapi.com/v1',
      headers: {
        'x-api-key': xApiKey
      }
    });
  }

  async addFavourite(imageId: string): Promise<FavouriteDto> {
    const { data } = await this.client.post('/favourites', {
      image_id: imageId
    });

    console.log('Favourite added:', data);
    return data;
  }

  async getFavourites(): Promise<FavouriteDto[]> {
    const { data } = await this.client.get('/favourites');
    return data;
  }

  async deleteFavourite(favouriteId: number): Promise<void> {
    await this.client.delete(`/favourites/${favouriteId}`);
    console.log(`Favourite ${favouriteId} deleted.`);
  }
}
