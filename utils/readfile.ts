export const readFile = async (pathToFile: string) => {
  const fileContent = await Deno.readTextFile(pathToFile);
  return fileContent.trim();
};

export const readFileAsLines = async (pathToFile: string) => {
  const fileContent = await readFile(pathToFile);
  return fileContent.split('\n');
};

export const readFileAsIntegers = async (pathToFile: string) => {
  const lines = await readFileAsLines(pathToFile);
  return lines.map(number => parseInt(number, 10));
};
