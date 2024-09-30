import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Post } from 'src/app/blog/post';

import { BlogService } from 'src/app/blog/blog.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  Posts?: Post[];
  Post?: Post;
  PostId?: String;

  constructor (
    private _blogService: BlogService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
  ) {}


  newCommentForm = this._formBuilder.group({
    comment: ['', Validators.required ]
  });

  /*
  onSubmitComment(): void {
    this._zorilleService.newPostComment({
      post_id: this.Post?._id,
      comment: this.newCommentForm.value.comment,
      created_by:  window.sessionStorage.getItem('userId')
    }).subscribe((response: any) => {

    });
  }

  resetCommentForm(): void {
    this.newCommentForm.reset();
  }
    */

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.params['id'];
    this.PostId = id;

    this._blogService.getPost({
      id: id
    }).subscribe((response: any) => {


      this.Post = response[0]
    })


   }

}
