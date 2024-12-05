import { readFileSync } from "fs";
import path from "path";

const part1 = false;
const input = readFileSync(path.join(import.meta.dirname, "input.txt"), {
  encoding: "utf-8",
});

const [orderingRulesRaw, reportsRaw] = input.split("\n\n");

const orderingRules = orderingRulesRaw
  .split("\n")
  .map((line) => line.split("|").map((e) => parseInt(e.trim())));

const reports = reportsRaw.split("\n").map((line) =>
  line
    .trim()
    .split(",")
    .map((e) => parseInt(e.trim()))
);

const isValid = (report: number[]): boolean => {
  const indexlookup = report.reduce((acc, e, i) => {
    acc[e] = i;
    return acc;
  }, {});

  return orderingRules.every(([left, right]) => {
    const leftIndex = indexlookup[left];
    const rightIndex = indexlookup[right];

    if (leftIndex !== undefined && rightIndex !== undefined) {
      return leftIndex < rightIndex;
    }
    return true;
  });
};

const sumMiddleNumbers = (reports: number[][]): number => reports.map((report) => {
  return report[(report.length - 1) / 2];
})
.reduce((acc, e) => acc + e, 0);

const orderReport = (report: number[], orderingRules: number[][]): number[] => {
  report = [...report];
  while(!isValid(report)) {
    const indexlookup = report.reduce((acc, e, i) => {
      acc[e] = i;
      return acc;
    }, {});
  
    for (const [left, right] of orderingRules) {
      const leftIndex = indexlookup[left];
      const rightIndex = indexlookup[right];
  
      if (leftIndex !== undefined && rightIndex !== undefined && leftIndex > rightIndex) {
        report[leftIndex] = right;
        report[rightIndex] = left;
        indexlookup[left] = rightIndex;
        indexlookup[right] = leftIndex;
      }
    }
  }
  return report;
};

if (part1) {
  console.log(sumMiddleNumbers(reports
    .filter(isValid)))
} else {
  console.log(sumMiddleNumbers(reports.filter(r => !isValid(r)).map(r => orderReport(r, orderingRules))));
}
  
  

