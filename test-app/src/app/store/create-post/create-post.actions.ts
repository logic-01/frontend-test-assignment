import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/models/post.model";

export const submitForm = createAction(
    '[Create Post] submit form',
    props<{post: Post}>()
)

export const submitFormSuccess = createAction(
    '[Create Post] form submitted successfully'
)

export const submitFormFailure = createAction(
    '[Create Post] form submission failed',
    props<{err: Error}>()
)