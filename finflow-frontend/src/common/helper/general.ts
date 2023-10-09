export const capitalise = (str: string) =>
  str
    .split(" ")
    .map((token: string) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(" ");
