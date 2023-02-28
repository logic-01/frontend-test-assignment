import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './components/container/container.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';

const routes: Routes = [
  {
    path:'',
    component: ContainerComponent,
    children: [
      {
        path: 'post/:id',
        component: PostDetailsComponent,
      },
      {
        path: '',
        redirectTo: 'post',
        pathMatch: 'full'
      },
      {
        path: 'post',
        component: PostsListComponent,
      },
      {
        path: 'create',
        component: CreatePostComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
