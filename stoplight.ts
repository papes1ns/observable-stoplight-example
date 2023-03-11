import { interval, Observable } from "rxjs";
import { map } from "rxjs/operators";

type StoplightState = "green" | "yellow" | "red";

export class Stoplight {
  public states$: Observable<StoplightState>;

  constructor() {
    this.states$ = interval(3000).pipe(
      map((i) => {
        switch (i % 3) {
          case 0:
            return "green";
          case 1:
            return "yellow";
          case 2:
            return "red";
          default:
            return "red";
        }
      })
    );
  }
}
