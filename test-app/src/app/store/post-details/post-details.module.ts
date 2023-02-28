import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { PostsListReducer, featureKey } from "./reducer";

@NgModule({
    imports: [StoreModule.forFeature(featureKey, PostsListReducer)]
})


export class PostsDetailsStoreModule {}