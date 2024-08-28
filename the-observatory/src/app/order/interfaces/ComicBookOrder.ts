interface ComicBookOrder {
    orderId:        string;
    orderDate:      string;
    returnStatus:   string;
    comicBook: {
        comicBookId:    string;
        name:           string;
        author:         string;
        price:          number;
        quantity:       number;
        coverArt:       string;
        carryStatus:    string;
    };
}

export default ComicBookOrder;
