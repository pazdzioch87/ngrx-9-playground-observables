import { Component } from '@angular/core';
import { interval, Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { count, randomAdd, substract, counterTick } from './counter/store';
import { map, tap, mergeMap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styles: [
    `
      h1 {
        color: white;
        font-family: Lato;
        text-align: center;
        margin: 0;
      }

      h2 {
        color: white;
        font-family: Lato;
        font-weight: 400;
        text-align: center;
        margin: 0;
        padding-top: 8px;
      }
    `
  ]
})
export class AppComponent {
  engine: Observable<number>;

  constructor(private store:Store){
    this.engine = interval(1000).pipe(tap(a => this.store.dispatch(counterTick())));
  }
}
