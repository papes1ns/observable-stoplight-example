import { BehaviorSubject, interval } from "rxjs";
import { map, startWith, takeWhile } from "rxjs/operators";

type StoplightColor = "green" | "yellow" | "red";

export class Stoplight {
  public color$: BehaviorSubject<StoplightColor>;

  constructor(initialColor: StoplightColor, iterations: number = -1) {
    this.color$ = new BehaviorSubject<StoplightColor>(initialColor);
    let counter = ["green", "yellow", "red"].indexOf(initialColor);
    interval(3000)
      .pipe(
        startWith(counter),
        map(() => {
          switch (counter % 3) {
            case 0:
              this.color$.next("green");
              break;
            case 1:
              this.color$.next("yellow");
              break;
            case 2:
              this.color$.next("red");
              break;
            default:
              this.color$.next("red");
              break;
          }
          counter++;
        }),
        takeWhile(() => counter !== iterations)
      )
      .subscribe();
  }
}
