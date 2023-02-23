import { ColorsEnum } from 'common/theme';

/**
 * Get font color given background color
 */
export function getFontColor(bgColor: string): string {
    if (bgColor === '') return ColorsEnum.black;
    else
        return parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2
            ? ColorsEnum.white
            : ColorsEnum.black;
}
