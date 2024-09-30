import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-authn',
  templateUrl: './authn.component.html',
  styleUrls: ['./authn.component.scss'],
  providers: [ ]
})
export class AuthnComponent implements OnInit {
  User: any;
  isAuthenticated!: boolean;
  isAuthenticated$ = this._auth0Service.isAuthenticated$

  constructor (
    public  _auth0Service: AuthService,
    private _router: Router,
    public _matSnackBar: MatSnackBar
    ) {}

  ngOnInit(): void {
      this._auth0Service.isAuthenticated$.subscribe((response: any) => {

        window.sessionStorage.setItem('isAuthenticated', `${ response }`)
        this.isAuthenticated = response;
      });

      this._auth0Service.user$.subscribe((response: any) => {
      window.sessionStorage.setItem('user', `${ JSON.stringify(response) }`);

      if (response != null ) {

        window.sessionStorage.setItem('email', `${ response.email }`);
        window.sessionStorage.setItem('email_verified', `${ response.email_verified }`);
        window.sessionStorage.setItem('name', `${ response.given_name } ${ response.family_name }`);
        window.sessionStorage.setItem('username', `${ response.nickname }`);
        window.sessionStorage.setItem('avatar', `${ response.picture }`);

        window.sessionStorage.setItem('isLoggedIn', 'true');

        this._matSnackBar.open(`Welcome ${ response.name}`, 'Dismiss');
        this._router.navigate(['/chat']);
      } else {
        this._matSnackBar.open('Login to Continue.', 'Dismiss');
        this._router.navigate(['/authn/login']);
      }
    });

  }
}

@Component({
  selector: 'app-login',
  template: ``,
  providers: [ ]
})
export class LoginComponent implements OnInit{

  constructor(
    public _auth0Service: AuthService
  ) {}

  ngOnInit(): void {
    this._auth0Service.loginWithRedirect({
        appState: {
        target: '/ai',
      }
    });
  }
}

@Component({
  selector: 'app-signup',
  template: ``,
  providers: [ ]
})
export class SignUpComponent implements OnInit{

  constructor(
    public _auth0Service: AuthService
  ) {}

  ngOnInit(): void {
    this._auth0Service.loginWithRedirect ({
      appState: {
        target: '/profile/new',
      },
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  }
}

@Component({
  selector: 'app-signup',
  template: ``,
  providers: [ ]
})
export class LogOutComponent implements OnInit{

  constructor(
    public _auth0Service: AuthService
  ) {}

  ngOnInit(): void {
    this._auth0Service.logout({
      logoutParams: {
        returnTo: 'https://afiaplus.vercel.app/chat'
      },
    });
  }
}
