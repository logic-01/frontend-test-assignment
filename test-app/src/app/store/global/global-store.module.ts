import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { PostsListStoreModule } from '../posts-list/posts-list-store.module';
import { PostsDetailsStoreModule } from '../post-details/post-details.module';


@NgModule({
  imports: [
    StoreModule.forRoot({}),
    PostsListStoreModule,
    PostsDetailsStoreModule,
  ],
})
export class GlobalStoreModule {}
