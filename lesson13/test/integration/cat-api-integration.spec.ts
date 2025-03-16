import { expect } from 'chai';
import { ImageService } from '../../src/services/image.service';
import { VoteService } from '../../src/services/vote.service';
import { FavouriteService } from '../../src/services/favourite.service';

import { ImageDto } from '../../src/models/image.dto';
import { VoteDto } from '../../src/models/vote.dto';
import { FavouriteDto } from '../../src/models/favourite.dto';

describe('Integration Test: Images, Votes, Favourites', function () {
  this.timeout(10000); 

  const xApiKey = 'live_jTV3e9Z30hMS9ZmSGHrfRbGTFCFQHl2jRk3aQj4LW889ohy6jwbGbUBEblfRTAqU';

  const imageService = new ImageService(xApiKey);
  const voteService = new VoteService(xApiKey);
  const favouriteService = new FavouriteService(xApiKey);

  let uploadedImage: ImageDto;
  let vote: VoteDto;
  let favourite: FavouriteDto;

  it('should upload image', async function () {
    this.timeout(10000); 
    uploadedImage = await imageService.uploadImage('cat.jpg');
    expect(uploadedImage).to.have.property('id');
    console.log('Uploaded Image ID:', uploadedImage.id);
  });

  it('should add image to favourites', async function () {
    favourite = await favouriteService.addFavourite(uploadedImage.id);
  
    expect(favourite).to.have.property('id');
    console.log('Favourite added:', favourite);
  
    const favourites = await favouriteService.getFavourites();
  
    const found = favourites.find((f) => f.id === favourite.id);
  
    expect(found).to.exist;
    expect(found!.image_id).to.equal(uploadedImage.id);
    //added
    try {
      await favouriteService.addFavourite('nonexistent-id');
    } catch (error: any) {
      expect(error.response.status).to.equal(400);
    }
  });
  

  it('should vote for the image', async function () {
    vote = await voteService.voteImage(uploadedImage.id, 1);
    expect(vote).to.have.property('id');
    expect(vote.image_id).to.equal(uploadedImage.id);
  });

  it('should fetch and validate favourites list', async function () {
    const favourites = await favouriteService.getFavourites();
    const found = favourites.find(f => f.id === favourite.id);
    expect(found).to.exist;
  });

  it('should fetch and validate votes list', async function () {
    const votes = await voteService.getVotes();
    const found = votes.find(v => v.id === vote.id);
    expect(found).to.exist;
  });

  it('should clean up: delete vote, favourite, image', async function () {
    await voteService.deleteVote(vote.id);
    await favouriteService.deleteFavourite(favourite.id);
    await imageService.deleteImage(uploadedImage.id);
    console.log('Clean up complete.');
  });
});
