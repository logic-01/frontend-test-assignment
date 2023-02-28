import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { PostsService } from "../service/posts.service";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { getAllCommentsForPost, getAllCommentsForPostFailure, getAllCommentsForPostSuccess } from "../store/post-details/actions";
import { getAllComments } from "../store/post-details/selectors";
import { catchError, concatMap, map } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()

export class PostDetailsEffects {

    constructor(private store: Store, private postService: PostsService, private action$: Actions) {}

    getCommentsForPost$ = createEffect(() => {
        return this.action$.pipe(
            ofType(getAllCommentsForPost),
            concatLatestFrom(() => this.store.select(getAllComments)),
            concatMap(([{id}, comments]) => {
                const isCommentsObjectEmpty = comments ? true: false;
                const isNavigatedIdPresentInStore = Object.keys({...comments}).includes(id.toString())
                if(!isNavigatedIdPresentInStore||isCommentsObjectEmpty) {
                    return this.postService.getPostComments(id).pipe(
                        map(comments => getAllCommentsForPostSuccess({id, comments})),
                        catchError(err => of(getAllCommentsForPostFailure({err})))
                    )
                } else {
                    return of();
                }
            })
        )
    })
}