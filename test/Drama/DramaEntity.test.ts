import { expect } from 'chai';
import 'mocha';

import { DramaEntity } from '../../src/Drama/DramaEntity';

describe('DramaEntity test cases', () => {
   it('should initialize drama entity properties', () => {
       const properties = {
           englishTitle: 'True Beauty',
           koreanTitle: 'Yeoshingangrim',
           tvNetwork: 'tvN',
           episodes: 16,
           language: 'Korean',
       };

      const drama = new DramaEntity(
          properties.englishTitle,
          properties.koreanTitle,
          properties.tvNetwork,
          properties.episodes,
          properties.language,
      );

      expect(drama.englishTitle).to.equal(properties.englishTitle);
       expect(drama.koreanTitle).to.equal(properties.koreanTitle);
       expect(drama.tvNetwork).to.equal(properties.tvNetwork);
       expect(drama.episodes).to.equal(properties.episodes);
       expect(drama.language).to.equal(properties.language);
   });
});