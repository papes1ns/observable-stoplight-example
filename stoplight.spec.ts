import { TestScheduler } from "rxjs/testing";
import { Stoplight } from "./stoplight";

describe("Stoplight", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it("should cycle green -> yellow -> red -> green", () => {
    scheduler.run((helpers) => {
      const { expectObservable } = helpers;
      const stoplight = new Stoplight("green", 4);
      // write the expected color with 3 seconds between each value
      // note: emitting a value advances time by 1 frame, so subtract 1ms for each time progression marble
      const [expected1, sub1, expected2, sub2] = [
        "g 2999ms y 2999ms r 2999ms g",
        "^---------------------------",
        "3500ms   y 2499ms r 2999ms g",
        "3500ms   ^------------------",
      ];

      expectObservable(stoplight.getColor$(), sub1).toBe(expected1, {
        g: "green",
        y: "yellow",
        r: "red",
      });

      expectObservable(stoplight.getColor$(), sub2).toBe(expected2, {
        g: "green",
        y: "yellow",
        r: "red",
      });
    });
  });
});
