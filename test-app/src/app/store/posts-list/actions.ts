import { createAction, props } from "@ngrx/store";
import { IncomingPost } from "src/app/models/post.model";

export const getAllPosts = createAction(
    '[Posts] get all the posts',
)

export const getAllPostsSuccess = createAction(
    '[Posts] get all the posts success',
    props<{posts: IncomingPost[]}>()
)

export const getAllPostsFailure = createAction(
    '[Posts] get all the posts failed',
    props<{err: Error}>()
)

export const getAllFilteredPosts = createAction(
    '[Posts] get all filtered posts',
    props<{searchString: string}>()
)

export const getAllFilteredPostsSuccess = createAction(
    '[Posts] get all filtered posts success',
    props<{searchString: string, filteredPosts: IncomingPost[]}>()
)

export const getAllFilteredPostsFailure = createAction(
    '[Posts] get all filtered posts',
    props<{err: Error}>()
)

export const removeFilter = createAction(
    '[Posts] remove filter',
)