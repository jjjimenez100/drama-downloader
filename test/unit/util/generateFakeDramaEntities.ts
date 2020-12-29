import {DramaEntity} from "../../../src/Drama/DramaEntity";
import faker from 'faker';

export default (size: number = 1) : DramaEntity[] => {
    const dramaEntities : DramaEntity[] = [];
    for (let index = 0; index < size; index += 1) {
        const newDramaEntity : DramaEntity = new DramaEntity(
            faker.random.word(),
            faker.random.word(),
            faker.date.past().toDateString(),
            faker.internet.url(),
        );
        dramaEntities.push(newDramaEntity);
    }

    return dramaEntities;
};