export class DramaEntity {
    constructor(
        readonly englishTitle: string,
        readonly koreanTitle: string,
        readonly tvNetwork: string,
        readonly episodes: number,
        readonly language: string,
    ) {}
}
