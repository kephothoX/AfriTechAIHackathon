import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrl: './diagnosis.component.scss'
})
export class DiagnosisComponent implements OnInit {
  formData = new FormData()
  PromptResponse?: string;
  Gender: String[] = [ 'Male', 'Female'];

  constructor (
    private _appService: AppService,
    private _formBuilder: FormBuilder,
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

  newDiagnosisForm = this._formBuilder.group({
    name: ['', Validators.required],
    dob: ['', Validators.required],
    weight: ['', Validators.required],
    gender: ['', Validators.required ],
    pre_conditions: ['', Validators.required],
    medications: ['', Validators.required],
    symptoms: ['', Validators.required]

  });

  Translate(text: string, lang: string): void {
    this.formData.append('content', `${ text }`);
    this.formData.append('lang', `${ lang }`);
    this._matSnackBar.open(`Wait as We Translate to ${ lang }`, 'Dismiss');

    this._appService.translateHTMLContent(this.formData).subscribe((response: any) => {
      this.PromptResponse = response.response;
    });

  }

  ngOnSubmit(): void {
    const formValues = this.newDiagnosisForm.value;
    this.formData.append('name', `${ formValues.name }`);
    this.formData.append('dob', `${ formValues.dob }`);
    this.formData.append('gender', `${ formValues.gender }`);
    this.formData.append('weight', `${ formValues.weight }`);
    this.formData.append('pre_conditions', `${ formValues.pre_conditions }`);
    this.formData.append('medications', `${ formValues.medications }`);
    this.formData.append('symptoms', `${ formValues.symptoms }`);

    this._matSnackBar.open('Processing data.....', 'Dismiss')


    this._appService.selfDiagnosis(this.formData).subscribe((res: any) => {
      this.PromptResponse = res.response;
    });

  }
}
