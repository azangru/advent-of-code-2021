import { parseInput } from './parseInput.ts';

export const solve2 = (input: string) => {
  const chain = new Chain(input);
  chain.runSteps(40);

  const leastCommonElementCount = chain.getLeastCommonElementCount();
  const mostCommonElementCount = chain.getMostCommonElementCount();

  return mostCommonElementCount - leastCommonElementCount;
};

export class Chain {

  private dimers: Record<string, number> = {};
  private insertionMap: Map<string, string>;
  private elementCounts: Record<string, number> = {};

  constructor(input: string) {
    const { initialChain, insertionMap } = parseInput(input);
    this.insertionMap = insertionMap;
    this.initializeDimersCount(initialChain);
  }

  initializeDimersCount(chain: string) {
    for (let i = 0; i < chain.length - 1; i++) {
      const dimer = `${chain[i]}${chain[i+1]}`;
      this.addToDimers(dimer);
    }

    chain.split('').forEach((element) => this.addToCount(element));
  }

  addToDimers(dimer: string) {
    if (!this.dimers[dimer]) {
      this.dimers[dimer] = 1;
    } else {
      this.dimers[dimer] += 1;
    }
  }

  addToCount(element: string, count = 1) {
    if (!this.elementCounts[element]) {
      this.elementCounts[element] = count;
    } else {
      this.elementCounts[element] += count;
    }
  }

  removeFromDimers(dimer: string) {
    this.dimers[dimer] -= 1;
  }

  runSteps(count: number) {
    for (let i = 0; i < count; i++) {
      this.runStep();
    }
  }

  runStep() {
    const newDimersMap: Record<string, number> = {};

    const dimersWithCount = Object.entries(this.dimers);
    dimersWithCount.forEach(([dimer, count]) => {
      const insertionElement = this.insertionMap.get(dimer) as string;
      const [firstElement, secondElement] = dimer.split('');
      const newDimers = [`${firstElement}${insertionElement}`, `${insertionElement}${secondElement}`];

      newDimers.forEach(dimer => {
        if (!newDimersMap[dimer]) {
          newDimersMap[dimer] = count;
        } else {
          newDimersMap[dimer] += count;
        }
      });

      this.addToCount(insertionElement, count);      
    });

    this.dimers = newDimersMap;
  }

  getMostCommonElementCount() {
    const elementsCount = Object.entries(this.elementCounts);
    elementsCount.sort(([, count1], [, count2]) => count2 - count1);
    return elementsCount.shift()?.[1] as number;
  }

  getLeastCommonElementCount() {
    const elementsCount = Object.entries(this.elementCounts);
    elementsCount.sort(([, count1], [, count2]) => count1 - count2);
    return elementsCount.shift()?.[1] as number;
  }

  debug() {
    return {
      dimers: this.dimers,
      elementCounts: this.elementCounts
    };
  }
}
