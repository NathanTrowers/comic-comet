import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { LoginComponent } from 'src/app/authentication/login/login.component';

describe('LoginComponet Smoke Test', () => {
    let activatedRouteStub: Partial<ActivatedRoute>;

    it('renders without crashing', () => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, LoginComponent],
            providers: [{ provide: ActivatedRoute, useValue: activatedRouteStub }]
        });
        const loginFixture = TestBed.createComponent(LoginComponent);
        const loginComponentInstance  = loginFixture.componentInstance;

        expect(loginComponentInstance).toBeDefined();
    });
});
