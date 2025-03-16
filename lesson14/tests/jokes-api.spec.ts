import { describe, test, expect, beforeAll } from 'vitest';
import { world } from '../src/hooks/vitest-hooks';

describe('Jokes API Tests', () => {
  let jokesApi = world.jokesApi;

  test('GET random jokes returns 200 and array of jokes', async () => {
    const [response, data] = await jokesApi.getRandomJokes(5);

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(5);

    data.forEach((joke) => {
      expect(joke).toHaveProperty('id');
      expect(joke).toHaveProperty('type');
      expect(joke).toHaveProperty('setup');
      expect(joke).toHaveProperty('punchline');

      expect(typeof joke.id).toBe('number');
      expect(typeof joke.setup).toBe('string');
      expect(typeof joke.punchline).toBe('string');
    });
  });

  test('GET single random joke returns 200 and joke object', async () => {
    const [response, data] = await jokesApi.getSingleRandomJoke();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('setup');
    expect(data).toHaveProperty('punchline');
  });

  test('GET ten random jokes returns 200 and 10 jokes', async () => {
    const [response, data] = await jokesApi.getTenRandomJokes();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(10);
  });

  test('GET jokes by type returns 200 and filtered jokes', async () => {
    const type = 'general';
    const [response, data] = await jokesApi.getJokesByType(type);

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    data.forEach((joke) => expect(joke.type.toLowerCase()).toBe(type));
  });

  test('GET joke by id returns 200 and joke object', async () => {
    const id = 1;
    const [response, data] = await jokesApi.getJokeById(id);

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('id');
    expect(data.id).toBe(id);
  });
});
