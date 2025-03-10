import path from 'path';
import { PactV3, MatchersV3, Verifier } from '@pact-foundation/pact';
import { expect } from 'chai';
import axios from 'axios';

const { like } = MatchersV3;

describe('Pact Petstore Consumer-Provider Contract Tests', () => {

  const provider = new PactV3({
    consumer: 'pet-consumer',
    provider: 'petstore-provider',
    dir: path.resolve(process.cwd(), 'pacts'),
    spec: 3
  });

  describe('Consumer Pact test for getting pet by ID', () => {
    it('should return the pet data', async () => {

      provider
        .given('Pet with ID 123 exists')
        .uponReceiving('A request to get pet by ID')
        .withRequest({
          method: 'GET',
          path: '/pet/123',
          headers: {
            Accept: 'application/json'
          }
        })
        .willRespondWith({
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: like({
            id: 123,
            name: 'Garfield',
            status: 'available'
          })
        });

      await provider.executeTest(async (mockServer) => {

        const url = `${mockServer.url}/pet/123`;
        const response = await axios.get(url, {
          headers: { Accept: 'application/json' }
        });

        expect(response.status).to.equal(200);
        expect(response.data.id).to.equal(123);
        expect(response.data.name).to.equal('Garfield');
      });
    });
  });

});
