export const capitalise = (str: string) =>
    str
        .toLowerCase()
        .split(' ')
        .map((token: string) => token.charAt(0).toUpperCase() + token.slice(1))
        .join(' ');
