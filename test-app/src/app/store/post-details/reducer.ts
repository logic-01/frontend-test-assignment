import { createReducer, on } from '@ngrx/store';
import { IncomingPost } from 'src/app/models/post.model';
import { Comment } from '../../models/comment.model';
import { getAllCommentsForPostSuccess } from './actions';

export const featureKey = 'details';

export interface PostDetailsState {
  comments: Record<number, Comment[]> | null
}

export const initialState: PostDetailsState = {
    comments: null
};

export const PostsListReducer = createReducer<PostDetailsState>(
  initialState,
  on(getAllCommentsForPostSuccess, (state, { id, comments }) => {
    return {...state, comments: {...state.comments, [id]: comments}}
  }),
);
