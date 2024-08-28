import ComicBookOrder from "src/app/order/interfaces/ComicBookOrder";

interface SavedComicBookOrdersListResponse {
    _embedded: {
        savedComicBookOrderList: ComicBookOrder[]
    }
    _links: {
        self: {
            href: string;
        }
    }
}

export default SavedComicBookOrdersListResponse;
