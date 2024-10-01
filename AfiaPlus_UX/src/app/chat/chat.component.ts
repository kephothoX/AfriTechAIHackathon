import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  formData = new FormData()
  PromptQuery: any;
  PromptResponse: any;
  SummaryResponse: any;

  constructor (
    private _appService: AppService,
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


  ngOnSubmit(prompt: string): void {
    this.formData.append('prompt', prompt);
    this.PromptQuery = prompt;

    const chatBox = document.getElementById("ChatBox");
    if (chatBox) {
      const queryBox = document.createElement('div');
      queryBox.setAttribute('class', 'alert alert-info text-wrap align-left float-start queryBox p-1 m-1 mat-elevation-z2');
      queryBox.setAttribute('role', 'alert');

      const query = document.createElement("p");
      query.setAttribute('class', 'text-start font-monospace p-1');
      query.innerHTML = `${ prompt }`;

      const icon = document.createElement('mat-icon');
      icon.setAttribute('class', 'float-start m-1')
      const avatar = document.createElement('img');
      avatar.setAttribute('class', 'mat-card-img-sm reply-profile-pic mat-elevation-z2')
      avatar.src =`${ window.sessionStorage.getItem('avatar')}`;

      icon.append(avatar);
      queryBox.append(icon);
      queryBox.append(query);
      chatBox.append(queryBox);
    }



    this._appService.prompt(this.formData).subscribe((res: any) => {
      this.PromptResponse = res.response;
      this.PromptQuery = '';

      if (chatBox) {
        const resBox = document.createElement('div');
        resBox.setAttribute('class', 'alert alert-success text-wrap align-right float-end resBox p-1 m-1 mat-elevation-z2');
        resBox.setAttribute('role', 'alert');

        const resp = document.createElement("p");
        resp.setAttribute('class', 'text-end fw-medium');
        resp.innerHTML = `${ res.response}`;

        const transBtnGroup = document.createElement('div');
        transBtnGroup.setAttribute('class', 'btn-group mat-elevation-z4');
        transBtnGroup.setAttribute('role', 'group');
        transBtnGroup.setAttribute('ari-label', 'Translate To: ');


        const transBtnKsw = document.createElement('button');
        transBtnKsw.setAttribute('class', 'mat-mdc-button-ripple mdc-button mdc-button--raised mat-mdc-raised-button mat-mdc-button-base mat-primary');
        transBtnKsw.innerHTML = 'Kiswahili';
        transBtnKsw.addEventListener('click', (e) => {
          this.formData.append('query', `translate ${ resp.innerHTML } to kiswahili`);
          this._matSnackBar.open(`Wait as We Translate to kiswahili`, 'Dismiss');

          this._appService.translate(this.formData).subscribe((res: any) => {
            resp.innerHTML = res.response;
          });
        });

        const transBtnKky = document.createElement('button');
        transBtnKky.setAttribute('class', 'mat-mdc-button-ripple mdc-button mdc-button--raised mat-mdc-raised-button mat-mdc-button-base mat-primary');
        transBtnKky.innerHTML = 'Kikuyu';
        transBtnKky.addEventListener('click', (e) => {
          this.formData.append('query', `translate ${ resp.innerHTML } to kikuyu`);
          this._matSnackBar.open(`Wait as We Translate to kikuyu`, 'Dismiss');

          this._appService.translate(this.formData).subscribe((res: any) => {
            resp.innerHTML = res.response;
          });
        });

        const transBtnLuo = document.createElement('button');
        transBtnLuo.setAttribute('class', 'mat-mdc-button-ripple mdc-button mdc-button--raised mat-mdc-raised-button mat-mdc-button-base mat-primary');
        transBtnLuo.innerHTML = 'Dhuluo';
        transBtnLuo.addEventListener('click', (e) => {
          this.formData.append('query', `translate ${ resp.innerHTML } to dhuluo`);
          this._matSnackBar.open(`Wait as We Translate to dhuluo`, 'Dismiss');

          this._appService.translate(this.formData).subscribe((res: any) => {
            resp.innerHTML = res.response;
          });
        });

        const transBtnKkb = document.createElement('button');
        transBtnKkb.setAttribute('class', 'mat-mdc-button-ripple mdc-button mdc-button--raised mat-mdc-raised-button mat-mdc-button-base mat-primary');
        transBtnKkb.innerHTML = 'Kamba';
        transBtnKkb.addEventListener('click', (e) => {
          this.formData.append('query', `translate ${ resp.innerHTML } to kikamba`);
          this._matSnackBar.open(`Wait as We Translate to kikamba`, 'Dismiss');

          this._appService.translate(this.formData).subscribe((res: any) => {
            resp.innerHTML = res.response;
          });
        });

        const transBtnLya = document.createElement('button');
        transBtnLya.setAttribute('class', 'mat-mdc-button-ripple mdc-button mdc-button--raised mat-mdc-raised-button mat-mdc-button-base mat-primary');
        transBtnLya.innerHTML = 'Luhya';
        transBtnLya.addEventListener('click', (e) => {
          this.formData.append('query', `translate ${ resp.innerHTML } to kiluhya`);
          this._matSnackBar.open(`Wait as We Translate to kiluhya`, 'Dismiss');

          this._appService.translate(this.formData).subscribe((res: any) => {
            resp.innerHTML = res.response;
          });
        });

        transBtnGroup.append(transBtnKsw);
        transBtnGroup.append(transBtnKky);
        transBtnGroup.append(transBtnKkb);
        transBtnGroup.append(transBtnLuo);
        transBtnGroup.append(transBtnLya);



        const icon = document.createElement('mat-icon');
        icon.setAttribute('class', 'float-end m-1')
        const avatar = document.createElement('img');
        avatar.setAttribute('class', 'mat-card-img-sm reply-profile-pic mat-elevation-z2')
        avatar.src =`/assets/images/AfiaPlus.png`;

        icon.append(avatar);
        resBox.append(icon);
        resBox.append(resp);
        resBox.append(transBtnGroup);
        chatBox.append(resBox);

      }

    });
  }

}

