import { Injectable } from "@angular/core";
import Address from "./interfaces/Address";


@Injectable({ providedIn: 'root' })
export class OrrderValidator {
    constructor() {}

    validateAddress(addresToUpdate: Address): boolean {
        let addressFormat: RegExp = /^[0-9a-zA-Z-/ ]{1,50}?$/;
        let cityFormat: RegExp = /^[a-zA-Z ]{1,50}?$/;
        let postalCodeFormat: RegExp = /^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$/;
        let countryFormat: RegExp = /^[0-9a-zA-Z-' ]{1,50}?$/;

        if (!(addressFormat.test(addresToUpdate.address)
            && cityFormat.test(addresToUpdate.city)
            && postalCodeFormat.test(addresToUpdate.postalCode.toUpperCase())
            && countryFormat.test(addresToUpdate.country))
        ) {
            return false;
        }
        
        return true;
    }
}
