export const solve1 = (input: string) => {
  const graph = prepareGraph(input);
  const paths = graph.findAllPathsFromStartToEnd();

  return paths.length;
};

class Graph {

  private connections: Record<string, Set<string>> = {};

  addConnection(caveName1: string, caveName2: string) {
    if (!this.connections[caveName1]) {
      this.connections[caveName1] = new Set();
    }
    if (!this.connections[caveName2]) {
      this.connections[caveName2] = new Set();
    }
    this.connections[caveName1].add(caveName2);
    this.connections[caveName2].add(caveName1);
  }

  findAllPathsFromStartToEnd() {
    const startNode = 'start';
    const accummulatedPaths: string[][] = [];
    this.lookForEnd({
      currentCave: startNode,
      path: [],
      visitedCaves: new Set([startNode]),
      accummulatedPaths
    });

    return accummulatedPaths;
  }

  private lookForEnd(
    state: {
      currentCave: string;
      path: string[];
      visitedCaves: Set<string>;
      accummulatedPaths: string[][];
    }
  ) {
    const { currentCave, path, visitedCaves, accummulatedPaths } = state;

    if (currentCave === 'end') {
      accummulatedPaths.push([...path, currentCave]);
      return;
    }

    visitedCaves.add(currentCave);
    const connectedCaves = this.connections[currentCave];

    if (!connectedCaves) {
      return null;
    }

    const caves = [...connectedCaves.values()]
      .filter(cave => {
        if (cave === cave.toUpperCase()) {
          return true;
        } else {
          return !visitedCaves.has(cave);
        }
      });

    for (const cave of caves) {
      this.lookForEnd({
        currentCave: cave,
        path: [...path, currentCave],
        visitedCaves: new Set([...visitedCaves.values()]),
        accummulatedPaths
      });
    }
  }
}


const prepareGraph = (input: string) => {
  const caves = parseInput(input);
  const graph = new Graph();

  for (const [cave1, cave2] of caves) {
    graph.addConnection(cave1, cave2);
  }

  return graph;
};

const parseInput = (input: string) => {
  return input.trim().split('\n').map(line => line.split('-'));
};
