import { Injectable } from '@angular/core';
import * as jose from 'jose';

import { AuthenticationService } from "src/app/authentication/authentication.service";

@Injectable({ providedIn: 'root' })
export class JWTParser {
    constructor(private authenticationService: AuthenticationService) {}

    getCustomerId(): string {   
        const claims = jose.decodeJwt(this.authenticationService.httpOptions.headers.Authorization);
        
        return claims.jti ?? '';
    }
}
