import { expect } from 'chai';
import 'mocha';

import { DramaEntity } from '../../../src/Drama/DramaEntity';

describe('DramaEntity unit tests', () => {
   it('should initialize drama entity properties', () => {
       const properties = {
           englishTitle: 'True Beauty',
           description: 'helol oewoewo',
           releaseYear: '2018',
           pageLink: 'www.google.com',
       };

      const drama = new DramaEntity(
          properties.englishTitle,
          properties.description,
          properties.releaseYear,
          properties.pageLink,
      );

      expect(drama.englishTitle).to.equal(properties.englishTitle);
       expect(drama.description).to.equal(properties.description);
       expect(drama.releaseYear).to.equal(properties.releaseYear);
       expect(drama.pageLink).to.equal(properties.pageLink);
   });
});