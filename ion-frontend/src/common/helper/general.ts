export const capitalizeString = (colName: string) =>
    colName
        .split(' ')
        .map((token: string) => token.charAt(0).toUpperCase() + token.slice(1))
        .join(' ');
