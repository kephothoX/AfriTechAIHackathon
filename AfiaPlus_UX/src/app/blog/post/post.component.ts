import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'

import { BlogService } from '../blog.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  FileStorageID: any;

  ImageFile: any;

  constructor (
    private _formBuilder: FormBuilder,
    private _blogService: BlogService,
    private _router: Router,
    public _matSnackBar: MatSnackBar
  ) {}


  newPostForm = this._formBuilder.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    newFile: ['', Validators.required]
  });

  ngOnSubmitPost(): void {

    this._blogService.uploadFile(this.ImageFile).subscribe((response: any) => {
      this.FileStorageID = response.fileStorageID;

      if (response.fileStorageID != null || undefined) {
        const post = {
          title: this.newPostForm.value.title,
          content: this.newPostForm.value.content,
          postThumbnailID:  response.fileStorageID,
          postThumbnailURL: response.fileURL,
          createdBy: window.sessionStorage.getItem('email')
        }

        this._blogService.newPost(post).subscribe((res: any) => {

          if (res) {
            this._router.navigate(['/blog'])
          } else {
            this._matSnackBar.open('Ooops an error occured while saving post.', 'Dismiss');
          }
        });
      }

    });

  }


  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];

      this.ImageFile = new Blob([file],  { type: `${ file.type }`})
    }
  }

}
