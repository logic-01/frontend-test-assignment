import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { PostListEffects } from "./post-list.effects";
import { PostDetailsEffects } from "./post-details.effects";
import { CreatePostEffects } from "./create-post.effects";

@NgModule({
    imports: [EffectsModule.forRoot([PostListEffects, PostDetailsEffects, CreatePostEffects])],
    providers: []
})
export class GlobalEffectsModule {}