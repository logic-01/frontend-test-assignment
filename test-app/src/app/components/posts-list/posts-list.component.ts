import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject, debounceTime, filter, fromEvent, map, switchMap, takeUntil, tap } from 'rxjs';
import {
  getAllFilteredPosts,
  getAllPosts,
} from 'src/app/store/posts-list/actions';
import {
  selectFilteredPosts,
  selectPosts,
} from 'src/app/store/posts-list/selectors';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('filter') filterInput!: ElementRef<HTMLInputElement>;

  destroy$: Subject<any> = new Subject();
  isFilterEmpty$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  normalPostsList$ = this.store.select(selectPosts);
  filteredPostsList$ = this.store.select(selectFilteredPosts);
  postsList$ = this.isFilterEmpty$.pipe(
    switchMap(isEmpty => isEmpty ? this.normalPostsList$ : this.filteredPostsList$),
    takeUntil(this.destroy$)
  )
    
    

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(getAllPosts());
  }

  ngAfterViewInit() {
    this.setFilterSubscription();
    this.trackFilterStateSubscription();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  setFilterSubscription(): void {
    fromEvent(this.filterInput.nativeElement, 'input')
      .pipe(
        map((event: any) => event.target.value),
        filter((searchString) => !!searchString),
        map((searchString) =>
          this.store.dispatch(getAllFilteredPosts({ searchString }))
        ),
        debounceTime(500),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  trackFilterStateSubscription() {
    fromEvent(this.filterInput.nativeElement, 'input')
      .pipe(
        map((event: any) => event.target.value),
        filter((searchString) => !!searchString),
        tap(() => this.isFilterEmpty$.next(false)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  onFilterClearedClick() {
    this.filterInput.nativeElement.value = '';
    this.isFilterEmpty$.next(true)
  }
}
