import { Verifier } from '@pact-foundation/pact';
import path from 'path';

describe('Pact Provider Verification', () => {
  it('should validate the expectations of Pet Consumer', async () => {
    await new Verifier({
      providerBaseUrl: 'https://petstore.swagger.io/v2', 
      pactUrls: [
        path.resolve(process.cwd(), './pacts/pet-consumer-petstore-provider.json')
      ],
      stateHandlers: {
        'Pet with ID 123 exists': async () => {
          console.log('State handler: Pet with ID 123 exists');
        }
      },
      providerVersion: '1.0.0'
    }).verifyProvider();

    console.log('Provider verification complete');
  });
});
