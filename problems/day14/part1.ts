import { parseInput } from './parseInput.ts';

export const solve1 = (input: string) => {
  const chain = new Chain(input);
  chain.runSteps(10);

  return chain.getMostCommonElement() - chain.getLeastCommonElement();
};

export class Chain {

  private chain: string;
  private insertionMap: Map<string, string>;
  
  elementCounts: Record<string, number> = {};

  constructor(input: string) {
    const {initialChain, insertionMap } = parseInput(input);
    this.insertionMap = insertionMap;
    this.chain = initialChain;
  }

  runSteps(count: number) {
    for (let i = 0; i < count; i++) {
      this.runStep()
    }
  }

  runStep() {
    this.elementCounts = {};

    const temp: string[] = [];
    for (let i = 0; i < this.chain.length - 1; i++) {
      this.pushAndCount(temp, this.chain[i]);
      const insertion = this.insertionMap.get(`${this.chain[i]}${this.chain[i+1]}`);
      this.pushAndCount(temp, insertion as string);

      if (i === this.chain.length - 2) {
        this.pushAndCount(temp, this.chain[i + 1]);
      }
    }

    this.chain = temp.join('');
  }

  pushAndCount(arr: string[], el: string) {
    if (!this.elementCounts[el]) {
      this.elementCounts[el] = 1;
    } else {
      this.elementCounts[el] += 1;
    }
    arr.push(el);
  }

  toString() {
    return this.chain;
  }

  getMostCommonElement() {
    const arr = Object.entries(this.elementCounts);
    arr.sort(([, countA], [,countB]) => countB - countA);
    return arr.shift()?.[1] as number;
  }

  getLeastCommonElement() {
    const arr = Object.entries(this.elementCounts);
    arr.sort(([, countA], [,countB]) => countA - countB);
    return arr.shift()?.[1] as number;
  }
}
