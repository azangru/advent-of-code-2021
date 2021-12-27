export const solve2 = (input: string) => {
  const graph = prepareGraph(input);
  const paths = graph.findAllPathsFromStartToEnd();

  return paths.size;
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
      visitedCaves: {},
      accummulatedPaths
    });

    return new Set(accummulatedPaths.map(path => path.join(',')));
  }

  private lookForEnd(
    state: {
      currentCave: string;
      path: string[];
      visitedCaves: Record<string, number>;
      accummulatedPaths: string[][];
    }
  ) {
    const { currentCave, path, visitedCaves, accummulatedPaths } = state;

    if (currentCave === 'end') {
      accummulatedPaths.push([...path, currentCave]);
      return;
    }

    visitedCaves[currentCave] = visitedCaves[currentCave] ? visitedCaves[currentCave] + 1 : 1;
    const connectedCaves = this.connections[currentCave];

    const hasVisitedASingleCaveTwice = Object.entries(visitedCaves)
      .filter(([cave]) => cave !== cave.toUpperCase())
      .map(([, value]) => value)
      .includes(2);

    if (!connectedCaves) {
      return null;
    }

    const caves = [...connectedCaves.values()]
      .filter(cave => {
        if (cave === 'start') {
          return false;
        } else if (cave === cave.toUpperCase()) {
          return true;
        } else {
          return hasVisitedASingleCaveTwice
            ? !visitedCaves[cave]
            : (!visitedCaves[cave] || visitedCaves[cave] === 1);
        }
      });

    for (const cave of caves) {
      this.lookForEnd({
        currentCave: cave,
        path: [...path, currentCave],
        visitedCaves: { ...visitedCaves },
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
