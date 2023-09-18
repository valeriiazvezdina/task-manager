import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  constructor(private auth: AuthService ) {}

  public onLoginButtonClick(email: string, password: string): void {
    this.auth.login(email, password).subscribe((res: HttpResponse<any>) => {
      console.log(res)
    });
  }
}
