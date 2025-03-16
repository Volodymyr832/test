import axios, { AxiosInstance } from 'axios';
import { PetDto } from '../models/pet.dto';

export class PetService {
  private client: AxiosInstance;

  constructor(baseUrl: string) {
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async getPetById(petId: number): Promise<PetDto> {
    const response = await this.client.get<PetDto>(`/pet/${petId}`);
    return response.data;
  }

  async addPet(pet: PetDto): Promise<PetDto> {
    const response = await this.client.post('/pet', pet);
    return response.data;
  }
}
