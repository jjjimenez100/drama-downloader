import DramaSearch from './DramaSearch';
import { DramaEntity } from './DramaEntity';
import HttpClient from '../lib/HttpClient/HttpClient';

class DramaNiceSearchImpl implements DramaSearch {
    private httpClient: HttpClient;
    private cheerioInstance: cheerio.CheerioAPI;
    private dramaNiceSearchURL = 'https://dramanice.video/?s=';

    constructor(httpClient: HttpClient, cheerioInstance: cheerio.CheerioAPI) {
        this.httpClient = httpClient;
        this.cheerioInstance = cheerioInstance;
    }

    private parseDramaDetailsToEntity(selector: cheerio.Root, dramaDetails: cheerio.Cheerio): DramaEntity {
        const englishTitle: string = selector(dramaDetails[1])
            .children()
            .eq(0)
            .text();
        const pageLink: string =
            selector(dramaDetails[1])
                .children()
                .eq(0)
                .attr('href') || '';
        const description: string = selector(dramaDetails[2]).text();
        const releaseYear: string = selector(dramaDetails[4]).text();

        return new DramaEntity(englishTitle, description, releaseYear, pageLink);
    }

    public async findDrama(searchQuery: string, limit?: number): Promise<DramaEntity[]> {
        const uriEncodedSearchQuery: string = encodeURI(searchQuery);
        const searchUrl = `${this.dramaNiceSearchURL}${uriEncodedSearchQuery}`;
        const { data } = await this.httpClient.get(searchUrl);

        if (typeof data !== 'string') {
            throw new Error(`Got an invalid response from ${searchUrl}, response should be html`);
        }

        const selector = this.cheerioInstance.load(data);
        const dramaEntities: DramaEntity[] = selector('body')
            .find('.list-thumb > li')
            .map((idx, el) => {
                const searchResult = selector(el).find('.post-details');
                return this.parseDramaDetailsToEntity(selector, searchResult.children());
            })
            .get();
        const matchingDramaEntities = dramaEntities
            .filter(dramaEntity => dramaEntity.englishTitle.includes(searchQuery))
            .slice(0, limit);

        return matchingDramaEntities;
    }
}

export default DramaNiceSearchImpl;
