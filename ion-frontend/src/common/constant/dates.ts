const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const formatDate = (date: Date): string => {
    var d = new Date(date),
        month = '' + monthNames[d.getMonth()].slice(0, 3),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        time = `${d.getHours()}:${d.getMinutes()}`;

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${day} ${month} ${year} ${time}`;
};
