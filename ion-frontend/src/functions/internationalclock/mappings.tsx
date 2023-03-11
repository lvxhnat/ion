import * as React from 'react';

export const geoMapping: {
    [index: string]: { locale: string; timeZone: string; country_code: string };
} = {
    Singapore: { locale: 'Singapore', timeZone: 'Asia/Singapore', country_code: 'SG' },
    Tokyo: { locale: 'Tokyo', timeZone: 'Asia/Tokyo', country_code: 'JP' },
    London: { locale: 'London', timeZone: 'Europe/London', country_code: 'GB' },
    'New York City': { locale: 'New+York', timeZone: 'America/New_York', country_code: 'US' },
};
