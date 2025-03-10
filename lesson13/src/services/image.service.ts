import axios, { AxiosInstance } from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import FormData from 'form-data';
import { ImageDto } from '../models/image.dto';

export class ImageService {
  private client: AxiosInstance;

  constructor(private xApiKey: string) {
    this.client = axios.create({
      baseURL: 'https://api.thecatapi.com/v1',
      headers: {
        'x-api-key': xApiKey
      }
    });
  }

  async uploadImage(fileName: string): Promise<ImageDto> {
    const filePath = path.resolve('uploads', fileName); 

    console.log('Uploading file from:', filePath);

    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    const headers = {
      ...formData.getHeaders(),
      'x-api-key': this.xApiKey
    };

    console.log('Uploading to TheCatAPI');
    try {
      const { data } = await axios.post('https://api.thecatapi.com/v1/images/upload', formData, { headers });
      console.log('Upload success:', data);
      return data;
    } catch (error: any) {
      console.error('Upload failed:', error.response?.data || error.message);
      throw error;
    }
  }

  async getImageById(imageId: string): Promise<ImageDto> {
    const { data } = await this.client.get(`/images/${imageId}`);
    return data;
  }

  async deleteImage(imageId: string): Promise<void> {
    await this.client.delete(`/images/${imageId}`);
  }
}
