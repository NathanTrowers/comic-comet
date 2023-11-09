import ComicBook from "./ComicBook";

interface ComicBookCatalogue {
    _embedded: {
        comicBookList: ComicBook[];
    },
    _links: {
        self: {
            href: string;
        }
    }
}

export default ComicBookCatalogue;
