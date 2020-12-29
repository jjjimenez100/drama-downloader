import { DramaEntity } from './DramaEntity';

interface DramaSearch {
    findDrama(searchQuery: string, limit?: number): Promise<DramaEntity[]>;
}

export default DramaSearch;
