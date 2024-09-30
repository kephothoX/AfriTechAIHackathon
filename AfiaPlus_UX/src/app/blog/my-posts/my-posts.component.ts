import { Component, OnInit } from '@angular/core';

import { Post } from '../post'
import { BlogService } from '../blog.service'

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.scss'
})
export class MyPostsComponent {
  Posts?: Post[];

  constructor (
    private _blogService: BlogService
  ) {}


  ngOnInit(): void {
    this._blogService.getPostsByUser({ createdBy: 'ksoldevtestacct@gmail.com'}).subscribe((response: any) => {


      this.Posts = response;
    })
  }
}
