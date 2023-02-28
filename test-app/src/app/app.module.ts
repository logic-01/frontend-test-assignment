import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { MenuComponent } from './components/menu/menu.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { ContainerComponent } from './components/container/container.component';
import { GlobalStoreModule } from './store/global/global-store.module';
import { GlobalEffectsModule } from './effects/effects.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PostDetailsComponent } from './components/post-details/post-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PostsListComponent,
    CreatePostComponent,
    ContainerComponent,
    PostDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GlobalStoreModule,
    GlobalEffectsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
