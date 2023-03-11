import { take } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { Stoplight } from "./stoplight";

describe("Stoplight", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it("should emit green, yellow, red states at the expected times", () => {
    scheduler.run((helpers) => {
      const { cold, hot, time, expectObservable, expectSubscriptions } =
        helpers;
      const stoplight = new Stoplight();
      // write the expected values, with 3 seconds between each value
      // note emitting a value advances time by 1 frame
      const expected = "3000ms g 2999ms y 2999ms r 2999ms (g|)";
      expectObservable(stoplight.states$.pipe(take(4))).toBe(expected, {
        g: "green",
        y: "yellow",
        r: "red",
      });
    });
  });
});
