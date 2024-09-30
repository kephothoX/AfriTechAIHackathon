import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { PostComponent } from './post/post.component';
import { UpdateComponent } from './update/update.component';
import { ViewComponent } from './view/view.component';
import { MyPostsComponent } from './my-posts/my-posts.component';

const routes: Routes = [
  { path: '', title: 'AfiaPlus Blog',  component: BlogComponent },
  { path: 'new', title: 'New Post', component: PostComponent },
  { path: 'edit/:id', title: 'Update Post', component: UpdateComponent },
  { path: 'view/:id', title: 'Open Post', component: ViewComponent },
  { path: 'my-posts', title: 'My Posts', component: MyPostsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
