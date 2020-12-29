import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import sinon from 'sinon';

import 'mocha';

import cheerio from 'cheerio';
import CheerioAPI = cheerio.CheerioAPI;

import generateFakeDramaEntities from "../util/generateFakeDramaEntities";
import {DramaEntity} from "../../../src/Drama/DramaEntity";
import HttpClient from "../../../src/lib/HttpClient/HttpClient";
import DramaNiceSearchImpl from "../../../src/Drama/DramaNiceSearchImpl";

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('DramaSearch unit tests', () => {
   afterEach(() => {
      sinon.restore();
   });

   it(`
      Given mocked http client,
      mocked cheerio,
      and generated fake drama entities,
      When calling findDrama with search query of second generated entity's english title,
      Then return second generated entity
   `, async () => {
      const dramaEntities: DramaEntity[] = generateFakeDramaEntities(5);

      const httpClient = <HttpClient>{};
      httpClient.get = sinon.stub().returns({ data: '<h1>test html</h1>' });

      const cheerioStub = <CheerioAPI>{};
      const cheerioBuilderMethods = {
         find: () => {
            return {
               map: () => {
                  return {
                     get: () => dramaEntities,
                  }
               }
            }
         },
         children: () => {},
         eq: () => {},
         text: () => {},
      };
      cheerioStub.load = sinon.stub().returns(() => cheerioBuilderMethods);

      const dramaSearch: DramaNiceSearchImpl = new DramaNiceSearchImpl(httpClient, cheerioStub);
      const expectedDrama = dramaEntities[1];
      const foundDramas: DramaEntity[] = await dramaSearch.findDrama(expectedDrama.englishTitle);

      expect(expectedDrama).to.deep.equal(foundDramas[0]);
   });

   it(`
      Given mocked http client,
      mocked cheerio,
      and generated fake drama entities,
      When calling findDrama with no matching search query,
      Then return no dramas
   `, async () => {
      const dramaEntities: DramaEntity[] = generateFakeDramaEntities(5);

      const httpClient = <HttpClient>{};
      httpClient.get = sinon.stub().returns({ data: '<h1>test html</h1>' });

      const cheerioStub = <CheerioAPI>{};
      const cheerioBuilderMethods = {
         find: () => {
            return {
               map: () => {
                  return {
                     get: () => dramaEntities,
                  }
               }
            }
         },
         children: () => {},
         eq: () => {},
         text: () => {},
      };
      cheerioStub.load = sinon.stub().returns(() => cheerioBuilderMethods);

      const dramaSearch: DramaNiceSearchImpl = new DramaNiceSearchImpl(httpClient, cheerioStub);
      const foundDramas: DramaEntity[] = await dramaSearch.findDrama('asdaoko10099dokfk--_!!39sl');

      expect(foundDramas.length).to.equal(0);
   });

   it(`
      Given mocked http client,
      mocked cheerio,
      and generated fake drama entities,
      When calling findDrama,
      and response from HTTP GET request is not HTML
      Then throw an error
   `, async () => {
      const httpClient = <HttpClient>{};
      httpClient.get = sinon.stub().returns({ data: [1,2,3,4,5] });

      const cheerioStub = <CheerioAPI>{};

      const dramaSearch: DramaNiceSearchImpl = new DramaNiceSearchImpl(httpClient, cheerioStub);
      await expect(dramaSearch.findDrama('asdaoko10099dokfk--_!!39sl')).to.be.rejectedWith(Error);
   });
});