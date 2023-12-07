import { Injectable } from "@angular/core";

import NewComicBookForm from "src/app/comic-book/interfaces/NewComicBookForm";

@Injectable({ providedIn: 'root' })
export class ComicBookValidator {
    constructor() {}

    validate(form: NewComicBookForm): boolean {
        let nameFormat: RegExp = /^[0-9a-zA-Z-' ]{1,50}?$/;
        let authorFormat: RegExp = /^[0-9a-zA-Z-' ]{1,50}?$/;
        let priceFormat: RegExp = /^[0-9]{1,3}\.[0-9]{2}?$/;
        let quantityFormat: RegExp = /^[0-9]{1,3}?$/;
        let carryStatusFormat: RegExp = /^(carrying|discontinued)$/;

        if (!(nameFormat.test(form.name)
            && authorFormat.test(form.author)
            && priceFormat.test(form.price.toString())
            && quantityFormat.test(form.quantity.toString())
            && carryStatusFormat.test(form.carryStatus))
        ) {
            return false;
        }
        
        return true;
    }
}
