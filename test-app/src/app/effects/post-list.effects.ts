import { Injectable } from "@angular/core";
import { PostsService } from "../service/posts.service";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { getAllFilteredPosts, getAllFilteredPostsFailure, getAllFilteredPostsSuccess, getAllPosts, getAllPostsFailure, getAllPostsSuccess } from "../store/posts-list/actions";
import { Store } from "@ngrx/store";
import { selectPosts, selectSearchString } from "../store/posts-list/selectors";
import { EMPTY, catchError, concatMap, map, of, withLatestFrom } from "rxjs";

@Injectable()

export class PostListEffects {
    constructor(private postsService: PostsService, private action$: Actions, private store: Store) {}

    getAllPosts$ = createEffect(() => {
        return this.action$.pipe(
            ofType(getAllPosts),
            concatLatestFrom(() => this.store.select(selectPosts)),
            concatMap(([_, postsList]) => {
                if(!postsList.length) {
                    return this.postsService.getAllPosts().pipe(
                        map(posts => getAllPostsSuccess({posts})),
                        catchError(err => of(getAllPostsFailure({err})))
                    )
                }else {
                    return of()
                }
            })
        )
    })

    getFilteredPosts$ = createEffect(() => {
        return this.action$.pipe(
            ofType(getAllFilteredPosts),
            concatLatestFrom(() => this.store.select(selectSearchString)),
            concatMap(([{searchString}, storedSearchString]) => {
                if(!storedSearchString || storedSearchString!==searchString ) {
                    return this.postsService.searchPostsByTitle(searchString).pipe(
                        map(filteredPosts => getAllFilteredPostsSuccess({searchString,filteredPosts})),
                        catchError(err => of(getAllFilteredPostsFailure({err})))
                    )
                } else {
                    return of();
                } 
            })
        )
    })

}