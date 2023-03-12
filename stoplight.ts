import { BehaviorSubject, interval, Observable } from "rxjs";
import { map, startWith, takeWhile } from "rxjs/operators";

type StoplightColor = "green" | "yellow" | "red";

export class Stoplight {
  private color$: BehaviorSubject<StoplightColor>;
  private colors: StoplightColor[] = ["green", "yellow", "red"];

  constructor(initialColor: StoplightColor, iterations: number = -1) {
    this.color$ = new BehaviorSubject<StoplightColor>(initialColor);
    let counter = this.colors.indexOf(initialColor);
    interval(3000)
      .pipe(
        startWith(counter),
        map(() => {
          this.color$.next(this.colors[counter++ % this.colors.length]);
        }),
        takeWhile(() => counter !== iterations)
      )
      .subscribe();
  }

  public getColor$(): Observable<StoplightColor> {
    return this.color$.asObservable();
  }
}
