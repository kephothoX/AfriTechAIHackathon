import { Component, OnInit } from '@angular/core';

import { Post } from './post'
import { BlogService } from './blog.service'


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {
  ImageURL?: string;
  Posts?: Post[];

  constructor (
    private _blogService: BlogService
  ) {}


  ngOnInit(): void {
    /*this._blogService.getPosts().subscribe((response: any) => {


      this.Posts = response;
      this._blogService.getImage({ id: response[0].postThumbnailID }).subscribe((res: any) => {

      })
    })*/
  }
}
