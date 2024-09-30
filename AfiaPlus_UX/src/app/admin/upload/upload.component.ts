import { Component } from '@angular/core';

import { FormBuilder, Validators  } from '@angular/forms';
import { Router } from '@angular/router';

import { AdminService } from '../admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  formData = new FormData();
  Response: any;
  Topics: String[] = [
    'Allergies',
    'Diabetes',
    'Asthma',
    'HIV and AIDS',
    'Mental Health',
    'Maternal Health',
    'Cancer',
    'Tuberculosis',
    'STIs',
    'DentalCare',
    'Kidney Health',
    'Heart Health',
    'Stroke',
    'Hypertension',
    'First-Aid',
    'Arthritis',
    'Pneumonia',
    'Nutrition',
    'Malaria',
    'Obecity',
    'Immunization',
    'Vaccines',
    'Infectious Deseases'
  ]

  constructor (
    private _formBuilder: FormBuilder,
    private _adminService: AdminService,
    private _router: Router,
    public _matSnackBar: MatSnackBar
  ) {}


  newKnowledgeBaseForm = this._formBuilder.group({
    topic: ['', Validators.required]
  });


  ngSubmit(): void {
    this.formData.append('topic', `${ this.newKnowledgeBaseForm.value.topic }`);
    this.formData.append('fileType', `${ window.localStorage.getItem('FileExt') }`);

    console.log(this.formData.get('file'));

    this._adminService.newKnowledgeBase(this.formData).subscribe((response: any) => {
      this.Response = response.response;

      this._matSnackBar.open(`${ response.response }`, 'Dismiss');
      if (response.response) {
        window.location.reload();
      }
    });
  }



  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];

        this.getFileExtension(`${ file.name }`);
        this.formData.append('file', file);

    }
  }

  getFileExtension(file: any) {
    const ext = file.substring(file.lastIndexOf('.') + 1, file.length);

    window.localStorage.setItem('FileExt', ext);
    return ext;
  }



}
