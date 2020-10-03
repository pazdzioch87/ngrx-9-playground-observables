import { Component, OnInit } from '@angular/core';
import { interval, Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { count, randomAdd, substract } from './store';
import { logInfo } from '../logger/store';
import { map, mergeMap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-counter',
  template: `
    <div class="counter">
      <div class="count">{{ result | async }}</div>
      <div class="counter-actions">
        <button (click)="add()">Add Random</button>
        <button (click)="substract(5)">Substract 5</button>
      </div>
    </div>`,
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {
  count: Observable<number>;

  letters = of('a', 'b');

  result = this.letters.pipe(
    mergeMap(x => 
      //interval(1000)
      of('1', '2')
      .pipe(map(i => {
        //if(number < 2)
        return x+i
        }))),
  );

  result2 = this.letters
    .pipe(
      switchMap(x => this.http.post("localhost:9000", "agatka")));


  //.subscribe(x => console.log(x));

  constructor(
    private store: Store,
    private http: HttpClient
    ) {
    this.count = this.store.pipe(select(count));
    this.result.subscribe(x => console.log(x));
    this.result2.subscribe(x => console.log(x));
  }

  add() {
    this.store.dispatch(randomAdd());
  }

  substract(value: number) {
    this.store.dispatch(substract(value));
  }
}