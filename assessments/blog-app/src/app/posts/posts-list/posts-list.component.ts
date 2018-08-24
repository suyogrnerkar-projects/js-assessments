import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../_services/posts/posts.service';
import { AppGlobals } from '../../app.globals';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
  providers: [PostsService, AppGlobals]
})
export class PostsListComponent implements OnInit {

  pageTitle: string = "Posts Listing";
  posts: any = [];


  constructor(private _ps: PostsService, private _g: AppGlobals) { }

  ngOnInit() {
    this._ps.get(this._g.baseAPIUrl + 'posts').subscribe((data) => {
      this.posts = data;
    });
  }

}
