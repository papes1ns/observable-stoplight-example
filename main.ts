import { Motorist } from "./motorist";
import { Stoplight } from "./stoplight";

let iteration = 0;

const light = new Stoplight("green", 4);
const motorists = [];

light.getColor$().subscribe((state) => {
  motorists.unshift(new Motorist(light));
  // using setTimeout to push the console.log to the end of the event loop to ensure the motorists have received the new state
  setTimeout(() => {
    console.log(
      `[${((iteration * 3000) / 1000)
        .toString()
        .padStart(3, "0")}s] color: ${state}, motorists: ${motorists.map(
        (m) => m.state
      )}`
    );
    iteration++;
  }, 0);
});
