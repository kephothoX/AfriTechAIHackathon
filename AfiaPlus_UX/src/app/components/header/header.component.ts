import { Component, OnInit } from '@angular/core';

import { AppService } from '../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title?: String;
  profileId?: String;
  Avatar!: String;
  Email?: string | null | undefined = window.sessionStorage.getItem('email');

  formData = new FormData();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _appService: AppService,
    public _snackBar: MatSnackBar,
    public _matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.Avatar = `${ window.sessionStorage.getItem('avatar')}`;
    this.Email = `${ window.sessionStorage.getItem('email')}`;

  }



}
