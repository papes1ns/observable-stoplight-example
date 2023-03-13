import { BehaviorSubject, interval, Observable } from "rxjs";
import { map, startWith, takeWhile } from "rxjs/operators";

const colors = ["green", "yellow", "red"] as const;
type StoplightColor = typeof colors[number];

export class Stoplight {
  private color$: BehaviorSubject<StoplightColor>;

  constructor(initialColor: StoplightColor, iterations: number = -1) {
    this.color$ = new BehaviorSubject<StoplightColor>(initialColor);
    let counter = colors.indexOf(initialColor);
    interval(3000)
      .pipe(
        startWith(counter),
        map(() => {
          this.color$.next(colors[counter++ % colors.length]);
        }),
        takeWhile(() => counter !== iterations)
      )
      .subscribe();
  }

  public getColor$(): Observable<StoplightColor> {
    return this.color$.asObservable();
  }
}
