import { Component, OnInit } from '@angular/core';
import { interval, Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { count, randomAdd, substract, counterTick } from './store';
import { map, tap, mergeMap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { logInfo } from '../logger/store';

@Component({
  selector: 'app-counter',
  template: `
    <div class="counter">
      <div>Duplicated value:</div>
      <div>{{ localCount | async }}</div>
    </div>
  `,
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {
  localCount: Observable<number>;

  constructor(private store: Store) {
    this.localCount = this.store.pipe(
      select(count),
      map(v => v * 2)
    );
  }
}
