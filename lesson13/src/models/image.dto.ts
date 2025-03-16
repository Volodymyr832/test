export interface ImageDto {
    id: string;
    url: string;
    sub_id?: string;
    width?: number;
    height?: number;
    created_at?: string;
    original_filename?: string;
    breed_ids?: string;
    breeds?: unknown[]; 
  }
  