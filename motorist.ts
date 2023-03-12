import { Stoplight } from "./stoplight";

type MotoristState = "driving" | "stopping" | "stopped";

export class Motorist {
  public state: MotoristState = "stopped";

  constructor(stoplight: Stoplight) {
    stoplight.color$.subscribe((color) => {
      switch (color) {
        case "green":
          this.state = "driving";
          break;
        case "yellow":
          this.state = "stopping";
          break;
        case "red":
          this.state = "stopped";
          break;
        default:
          this.state = "stopped";
          break;
      }
    });
  }
}
