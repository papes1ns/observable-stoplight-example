import { BehaviorSubject, interval, Observable } from "rxjs";
import { map, startWith, takeWhile } from "rxjs/operators";

const colors = ["green", "yellow", "red"] as const;
type StoplightColor = typeof colors[number];

export class Stoplight {
  private color$: BehaviorSubject<StoplightColor>;

  constructor(initialColor: StoplightColor, iterations: number = 0) {
    this.color$ = new BehaviorSubject<StoplightColor>(initialColor);
    let colorCounter = colors.indexOf(initialColor);
    let iterationsCounter = 1;
    interval(3000)
      .pipe(
        startWith(colorCounter),
        map(() => {
          this.color$.next(colors[colorCounter++ % colors.length]);
        }),
        takeWhile(() => iterationsCounter++ !== iterations)
      )
      .subscribe();
  }

  public getColor$(): Observable<StoplightColor> {
    return this.color$.asObservable();
  }
}
