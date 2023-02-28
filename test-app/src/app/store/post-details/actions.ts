import { createAction, props } from "@ngrx/store";
import { Comment } from "src/app/models/comment.model";
import { IncomingPost } from "src/app/models/post.model";

export const getAllCommentsForPost = createAction(
    '[Posts Details] get post\'s comments',
    props<{id: number}>()
)

export const getAllCommentsForPostSuccess = createAction(
    '[Posts Details] get post\'s comments success',
    props<{id: number, comments: Comment[]}>()
)

export const getAllCommentsForPostFailure = createAction(
    '[Posts Details] get post\'s comments failure',
    props<{err: Error}>()
)
// export const getAllPostsSuccess = createAction(
//     '[Posts] get all the posts success',
//     props<{posts: IncomingPost[]}>()
// )

// export const getAllPostsFailure = createAction(
//     '[Posts] get all the posts failed',
//     props<{err: Error}>()
// )

// export const getAllFilteredPosts = createAction(
//     '[Posts] get all filtered posts',
//     props<{searchString: string}>()
// )

// export const getAllFilteredPostsSuccess = createAction(
//     '[Posts] get all filtered posts success',
//     props<{filteredPosts: IncomingPost[]}>()
// )

// export const getAllFilteredPostsFailure = createAction(
//     '[Posts] get all filtered posts',
//     props<{err: Error}>()
// )

// export const removeFilter = createAction(
//     '[Posts] remove filter',
// )