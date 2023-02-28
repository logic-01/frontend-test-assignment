import { createReducer, on } from '@ngrx/store';
import { IncomingPost } from 'src/app/models/post.model';
import { getAllFilteredPostsSuccess, getAllPostsSuccess } from './actions';

export const featureKey = 'list';

export interface PostsListState {
  posts: IncomingPost[];
  searchString: string | null;
  filteredPosts: IncomingPost[];
}

export const initialState: PostsListState = {
  posts: [],
  searchString: null,
  filteredPosts: [],
};

export const PostsListReducer = createReducer<PostsListState>(
  initialState,
  on(getAllPostsSuccess, (state, { posts }) => ({ ...state, posts })),
  on(getAllFilteredPostsSuccess, (state, { searchString, filteredPosts }) => ({
    ...state,
    searchString,
    filteredPosts,
  })),
);
