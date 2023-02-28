import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostDetailsState, featureKey } from './reducer';

const postDetailsFeatureState =
  createFeatureSelector<PostDetailsState>(featureKey);

  export const getAllComments = createSelector(
    postDetailsFeatureState,
    ({comments}) => comments ?? null
  )

export const getCommentsForPostWithId = (id: number) => {
  return createSelector(getAllComments, (comments) =>{
    return comments ? comments[id] : []
  }
  );
};
