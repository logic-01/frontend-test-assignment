import { Injectable } from "@angular/core";
import { PostsService } from "../service/posts.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map } from "rxjs/operators";
import { of } from "rxjs";
import { submitForm, submitFormFailure, submitFormSuccess } from "../store/create-post/create-post.actions";
import { Router } from "@angular/router";

@Injectable()

export class CreatePostEffects {

    constructor(private router: Router, private postService: PostsService, private action$: Actions) {}

    submitPost$ = createEffect(() => {
        return this.action$.pipe(
            ofType(submitForm),
            concatMap(({post}) => {
                return this.postService.createPost(post).pipe(
                    map(() => submitFormSuccess()),
                    catchError(err => of(submitFormFailure({err})))
                )
            })
        )
    })

    navigateOnSuccess$ = createEffect(() => {
        return this.action$.pipe(
            ofType(submitFormSuccess),
            map(() => this.router.navigate(['/post']))
        )
    }, {dispatch: false})
}