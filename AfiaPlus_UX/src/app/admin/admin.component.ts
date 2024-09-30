import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {

  constructor (
    private _router: Router,
    public _matSnackBar: MatSnackBar
  ) {}


  ngOnInit(): void {
    if (Boolean(window.sessionStorage.getItem('isAuthenticated'))) {
        this._matSnackBar.open('Logged In....', 'Dismiss');
    } else {
       this._router.navigate(['/authn/login']);
    }

  }

}
