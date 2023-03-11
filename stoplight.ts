import { BehaviorSubject, interval, Observable } from "rxjs";
import { map } from "rxjs/operators";

type StoplightState = "green" | "yellow" | "red";

export class Stoplight {
  public states$: BehaviorSubject<StoplightState> = new BehaviorSubject(
    "green"
  );

  constructor() {
    interval(3000).pipe(
      map((i) => {
        switch (i % 3) {
          case 0:
            this.states$.next("green");
            break;
          case 1:
            this.states$.next("yellow");
            break;
          case 2:
            this.states$.next("red");
            break;
          default:
            this.states$.next("red");
            break;
        }
      })
    );
  }
}
