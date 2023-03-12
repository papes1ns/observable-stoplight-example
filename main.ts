import { Motorist } from "./motorist";
import { Stoplight } from "./stoplight";

let iteration = 0;

const light = new Stoplight("green", 4);
const motorists = [
  new Motorist(light),
  new Motorist(light),
  new Motorist(light),
  new Motorist(light),
];

light.getColor$().subscribe((state) => {
  console.log(
    `[${((iteration * 3000) / 1000)
      .toString()
      .padStart(3, "0")}s] obs1: ${state}, motorists: ${motorists.map(
      (m) => m.state
    )}`
  );
  iteration++;
});
