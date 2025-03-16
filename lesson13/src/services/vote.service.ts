import axios, { AxiosInstance } from 'axios';
import { VoteDto } from '../models/vote.dto';

export class VoteService {
  private client: AxiosInstance;

  constructor(private xApiKey: string) {
    this.client = axios.create({
      baseURL: 'https://api.thecatapi.com/v1',
      headers: {
        'x-api-key': xApiKey
      }
    });
  }

  async voteImage(imageId: string, value: number): Promise<VoteDto> {
    const { data } = await this.client.post('/votes', {
      image_id: imageId,
      value
    });

    console.log('Vote result:', data);
    return data;
  }

  async getVotes(): Promise<VoteDto[]> {
    const { data } = await this.client.get('/votes');
    return data;
  }

  async deleteVote(voteId: number): Promise<void> {
    await this.client.delete(`/votes/${voteId}`);
    console.log(`Vote ${voteId} deleted.`);
  }
}
