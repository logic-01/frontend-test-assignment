import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, combineLatest, merge } from 'rxjs';
import { delay, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Post } from 'src/app/models/post.model';
import { getAllCommentsForPost } from 'src/app/store/post-details/actions';
import { getCommentsForPostWithId } from 'src/app/store/post-details/selectors';
import { selectPostById } from 'src/app/store/posts-list/selectors';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  destroy$: Subject<any> = new Subject();
  id!: number;
  getcomments = (id: number) =>this.store.select(getCommentsForPostWithId(id));
  getpost = (id:number) =>this.store.select(selectPostById(id));
  constructor(private router: ActivatedRoute, private store: Store) {}

  ngOnInit() {
  /**
   * subscribing to activated route,
   * getting the id of post from paramMap
   * dispatching the action to fetch comments for Post
   */
    this.router.paramMap
      .pipe(
        map((params) => params.get('id') as string),
        filter(id => !isNaN(parseInt(id))),
        tap(id => this.setId(parseInt(id))),
        tap((id) => this.store.dispatch(getAllCommentsForPost({ id: parseInt(id) }))),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
      this.destroy$.next(true);
  }

  setId(id: number) {
    this.id = id;
  }
}
