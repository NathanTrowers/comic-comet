interface EditedComicBook {
    comicBookId:    string;
    name:           string;
    author:         string;
    price:          number;
    quantity:       number;
    coverArt:       string | null;
    carryStatus:    string;
}

export default EditedComicBook;
