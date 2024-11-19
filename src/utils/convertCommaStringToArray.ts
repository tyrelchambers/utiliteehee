export const convertCommaStringToArray = (str: string | undefined) => {
  if (!str) return undefined;
  return str.split(",");
};
