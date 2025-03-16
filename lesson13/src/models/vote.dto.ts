export interface VoteDto {
    id: number;
    image_id: string;
    sub_id?: string;
    value: number; // 1 - upvote, 0 - downvote
    country_code?: string;
}
