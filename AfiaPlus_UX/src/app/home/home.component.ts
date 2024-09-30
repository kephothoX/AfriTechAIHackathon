import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  formData = new FormData();
  PromptResponse: any;


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
