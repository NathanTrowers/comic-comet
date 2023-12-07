interface ComicBook {
    comicBookId: string;
    name: string;
    author: string;
    price: number;
    quantity: number;
    coverArt: string;
    carryStatus: string;
    _links: {
        self: {
            href: string;
        },
        comicBooks: {
            "href": string;
        }
    }
}

export default ComicBook;
