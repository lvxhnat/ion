/**
 * Get font color given background color
 */
export function getFontColor(bgColor: string): string {
    if (bgColor === '') return '#000';
    else return parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2 ? '#000' : '#fff';
}
