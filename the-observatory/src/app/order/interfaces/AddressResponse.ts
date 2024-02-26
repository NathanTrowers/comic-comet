interface AddressResponse {
    address:     string;
    city:       string;
    postalCode: string;
    country:    string;
    _links: {
        self: {
            href: string;
        }
    }
}

export default AddressResponse;
