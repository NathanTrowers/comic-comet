import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { JWTParser } from "src/app/order/order-confirmation/JWTParser";

describe('JWT Parser Test Suite', () => {
    let jwtParser: JWTParser;
    let token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJmb3VydGgtd2FsbCIsInJvbGUiOiJjdXN0b21lciIsImV4cCI6MTcwODE5ODQyNjM2MywianRpIjoiZTE1ZmFiNWUtY2VhOS00ZGRiLThhY2QtZmY1NGNiMTlmNWE4In0.eJfu6cYmRg6OGzTBwHDVUyy2DDuA2VPkDfVE2ZzWNYo';

    beforeEach(() => {
        const authenticationService = jasmine.createSpyObj('AuthenticationSerivce', {}, {httpOptions: {
            headers: {
                Authorization: token
            }
        }});

        TestBed.configureTestingModule({
          imports: [HttpClientModule],
          providers: [
            { provide: AuthenticationService, useValue: authenticationService }
          ]
        });
        jwtParser = TestBed.inject(JWTParser);
    });

    it('successfully extracts the customer ID from the token', () => {
        /** Data */
        const expectedResult: string = 'e15fab5e-cea9-4ddb-8acd-ff54cb19f5a8';
        
        /** Call to Test */
        const customerId: string = jwtParser.getCustomerId();
        
        /** Expectation */
        expect(customerId).toEqual(expectedResult);
    });
});
