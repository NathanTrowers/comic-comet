import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { LoginComponent } from "src/app/authentication/login/login.component";

describe('LoginComponet Smoke Test', () => {
    it('renders without crashing', () => {
        TestBed.configureTestingModule({imports: [HttpClientModule, LoginComponent]});
        const loginFixture = TestBed.createComponent(LoginComponent);
        const loginComponentInstance  = loginFixture.componentInstance;

        expect(loginComponentInstance).toBeDefined();
    });
});
