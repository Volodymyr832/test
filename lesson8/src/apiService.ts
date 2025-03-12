import fetch from 'node-fetch';
import { User } from './types';

export async function fetchUser(url: string): Promise<User> {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data: User = await response.json();
    return data;
}
