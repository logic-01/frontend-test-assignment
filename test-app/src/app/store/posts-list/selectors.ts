import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsListState, featureKey } from './reducer';

export const selectListFeature =
  createFeatureSelector<PostsListState>(featureKey);

export const selectPosts = createSelector(
  selectListFeature,
  ({posts}) => posts.length ? posts : [] 
);

export const selectFilteredPosts = createSelector(
  selectListFeature,
  ({filteredPosts}) => filteredPosts.length ? filteredPosts : []
);

export const selectSearchString = createSelector(
    selectListFeature,
    ({searchString}) => searchString ?? null
)

export const selectPostById = (id: number) => {
  return createSelector(selectPosts, (state) => {
    return state.find((post) => post.id === id) ?? null
  }
    
  );
};
