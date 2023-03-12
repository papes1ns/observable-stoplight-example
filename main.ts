import { Motorist } from "./motorist";
import { Stoplight } from "./stoplight";

let iteration = 0;

const light = new Stoplight("green", 4);
const motorists = [];

light.getColor$().subscribe((state) => {
  motorists.unshift(new Motorist(light));
  setTimeout(() => {
    console.log(
      `[${((iteration * 3000) / 1000)
        .toString()
        .padStart(3, "0")}s] color: ${state}, motorists: ${motorists.map(
        (m) => m.state
      )}`
    );
  }, 0);
  iteration++;
});
