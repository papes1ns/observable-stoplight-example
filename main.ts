import { take } from "rxjs";
import { Stoplight } from "./stoplight";

const light = new Stoplight();
light.states$.pipe(take(4)).subscribe(console.log);
