import { Injectable } from "@angular/core";

import Correspondence from "src/app/contact-us/interfaces/Correspondence";

@Injectable({ providedIn: 'root' })
export class ContactFormValidator {

    constructor() {}

    validate(correspondence: Correspondence): boolean {
        let subjectFormat: RegExp = /^[0-9A-Za-z'\/\-. #]{2,}?$/;
        let textFormat: RegExp = /^[0-9A-Za-z'\/\-. #_!?/()@$%+*\r]{2,}?$/;

        if (!(subjectFormat.test(correspondence.subject)
            && textFormat.test(correspondence.text))
        ) {
            return false;
        }
        
        return true;
    }
}
