import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'

import { BlogService } from '../blog.service';
import { Post } from '../post';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent implements OnInit {
  formData = new FormData();
  FileStorageID: any;
  Post!: Post;
  PostID?: string;

  ImageFile: any;

  constructor (
    private _formBuilder: FormBuilder,
    private _blogService: BlogService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public _matSnackBar: MatSnackBar
  ) {}


  ngOnInit() {
    this._blogService.getPost({ id: this._activatedRoute.snapshot.params['id']}).subscribe((response: any) => {
      this.Post = response[0];

      this.PostID = response[0]._id;
      window.localStorage.setItem('FileID', `${ response[0]._id}`)
    });
  }


  updatePostForm = this._formBuilder.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    newFile: ['', Validators.required]
  });

  ngOnSubmitPost(): void {

    this._blogService.uploadFile(this.ImageFile).subscribe((response: any) => {
      this.FileStorageID = response.fileStorageID;

      if (response.fileStorageID != null || undefined) {
        const post = {
          id: window.localStorage.getItem('FileID'),
          title: this.updatePostForm.value.title,
          content: this.updatePostForm.value.content,
          postThumbnailID:  response.fileStorageID,
          postThumbnailURL: response.fileURL,
          createdBy: window.sessionStorage.getItem('email')
        }

        this._blogService.updatePost(post).subscribe((res: any) => {

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

