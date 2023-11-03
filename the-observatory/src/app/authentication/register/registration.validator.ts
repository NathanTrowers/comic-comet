import { Injectable } from "@angular/core";
import RegistrationCredentials from "../interfaces/request/RegistrationCredentials";

@Injectable({
    providedIn: 'root'
})
export class RegistrationValidator {

    constructor() {}

    validate(form: RegistrationCredentials, passwordConfirmation: string): boolean {
        let emailFormat: RegExp = /^[a-z0-9.]{3,}?@[a-z0-9]{2,}?\.[a-z]{2,}?$/;
        let nameFormat: RegExp = /^[0-9a-zA-Z-' ]{1,50}?$/;
        let passwordFormat: RegExp = /^[0-9a-zA-Z-.!%$&*@#?]{8,16}?$/;

        if (!(emailFormat.test(form.email)
            && nameFormat.test(form.name)
            && passwordFormat.test(form.password)
            && form.password === passwordConfirmation)
        ) {
            return false;
        }
        
        return true;
    }
}
