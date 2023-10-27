import { Injectable } from "@angular/core";
import LoginCredentials from "src/app/authentication/interfaces/LoginCredentials";

@Injectable({
    providedIn: 'root'
})
export class LoginValidator {

    constructor() {}

    validate(form: LoginCredentials): boolean {
        let emailFormat: RegExp = /^[a-z0-9.]{3,}?@[a-z0-9]{2,}?\.[a-z]{2,}?$/;
        let passwordFormat: RegExp = /^[0-9a-zA-Z-.!%$&*@#?]{8,16}?$/;

        if (!(emailFormat.test(form.email)
            && passwordFormat.test(form.password))
        ) {
            return false;
        }
        
        return true;
    }
}
