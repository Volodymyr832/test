import { Verifier } from '@pact-foundation/pact';
import * as path from 'path';

describe('Pact Provider Verification', () => {
  it('should validate the expectations of Pet Consumer', () => {
    return new Verifier({
      providerBaseUrl: 'https://petstore.swagger.io/v2', 
      pactUrls: [
        path.resolve(process.cwd(), './pacts/pet-consumer-petstore-provider.json'),
      ],
      stateHandlers: {
      }
    })
    .verifyProvider()
    .then(() => {
      console.log('Provider verification complete');
    });
  });
});
