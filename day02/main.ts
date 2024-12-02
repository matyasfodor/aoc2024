import { readFileSync } from "fs";
import path from "path";

const part1 = true;
const lines = readFileSync(path.join(import.meta.dirname, "test.txt"), {
  encoding: "utf-8",
});

const reports = lines
  .split("\n")
  .filter((line) => !!line)
  .map((line: string) => line.split(/\s+/).map((e) => parseInt(e.trim())));

const enum State {
  Increasing,
  Decreasing,
  Error,
}

const resp = reports.filter(
  (report) =>
    report.reduce<{ prevElem: null | number; increasing: null | State }>(
      ({ prevElem, increasing }, elem) => {
        // First elem
        if (prevElem === null) {
          return { prevElem: elem, increasing: null };
        }
        // Second elem
        const diff = elem - prevElem;
        // if (increasing === null) {
        //   return {prevElem: elem, increasing: elem > prevElem}
        // }
        const absDiff = Math.abs(diff);
        const safe = 0 < absDiff && absDiff < 4;
        const currentState = diff < 0 ? State.Decreasing : State.Increasing;
        return {
          prevElem: elem,
          increasing: !safe
            ? State.Error
            : increasing === null
            ? currentState
            : increasing === currentState
            ? currentState
            : State.Error,
        };
      },
      { prevElem: null, increasing: null }
    ).increasing !== State.Error
).length;

console.log(`Number of safe reports ${resp}`);