export const readFile = async (pathToFile: string) => {
  return await Deno.readTextFile(pathToFile);
};

export const readFileAsLines = async (pathToFile: string) => {
  const fileContent = await readFile(pathToFile);
  return fileContent.split('\n').filter(line => line !== '');
};

export const readFileAsIntegers = async (pathToFile: string) => {
  const lines = await readFileAsLines(pathToFile);
  return lines.map(number => parseInt(number, 10));
};
