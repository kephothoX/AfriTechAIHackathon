import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../user';
import { AppService } from 'src/app/app.service';
import { AuthnService } from '../authn.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent {
  User!: User;
  formData = new FormData();
  AIResponse?: string;
  profileImageURL?: string;
  profileImage: any;
  ImageFile: any;

  PreviewURL: any;
  ErrMsg: String= '';

  constructor(
    private _authnService: AuthnService,
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _appService: AppService,
    private _router: Router,
    private _matSnackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.params['id'];

    window.sessionStorage.setItem('UserID', id);

    this._authnService.getUser({
      id: id
    }).subscribe((response: any) => {
      this.User = response[0];
    });
  }

  updateUserForm = this._formBuilder.group({
    email: ['', Validators.required],
    name: ['', Validators.required ],
    phone: ['', Validators.required]
  });


  ngOnSubmit() {
    this._authnService.uploadFile(this.ImageFile).subscribe((imageRes: any) => {

      if (imageRes.fileURL) {
        const user = {
          id: `${ window.sessionStorage.getItem('UserID')}`,
          email: `${this.updateUserForm.value.email}`,
          phone: `${this.updateUserForm.value.phone}`,
          name: `${this.updateUserForm.value.name}`,
          image: `${imageRes.fileURL}`
        }

        this._authnService.updateUser(user).subscribe((response: any) => {
          this._matSnackBar.open(`${JSON.stringify(response)}`, 'Dismiss');
        });
      } else {
        this._matSnackBar.open('File Upload Error...', 'Dismiss');
      }

    });
  }

  removeAdImages(): void {
    this.formData.delete("profileImage");
  }

  resetForm() {
    this.updateUserForm.reset();
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.ImageFile = new Blob([file],  { type: `${ file.type }`})

      const blob = new Blob([file], { type: `${ file.type }`});
      this.profileImageURL = URL.createObjectURL(blob);
    }
  }







  async uploadDesign(url: String) {

    const getUrlExtension = (url: any) => {
      return url
        .split(/[#?]/)[0]
        .split(".")
        .pop()
        .trim();
    }

    const onImageEdit = async (imgUrl: any) => {
      var imgExt = getUrlExtension(imgUrl);

      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const file = new File([blob], "adImage." + imgExt, {
        type: blob.type,
      });

      this.profileImage = file;
    }
    onImageEdit(url);
  }

  continueEditingOnCanva(url: String): void {
    window.location.href = `${ url }`;

  }

  viewOnCanva(url: String): void {
    window.location.href = `${ url }`;
  }


}



