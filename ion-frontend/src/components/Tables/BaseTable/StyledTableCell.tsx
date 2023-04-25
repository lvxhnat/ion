import { ColorsEnum } from 'common/theme';
import * as React from 'react';
import * as S from './style';

interface StyledTableCellProps {
    children?: React.ReactNode;
    isHeader?: boolean;
    width?: string;
    color?: string;
    [props: string]: any;
}

export function StyledTableCell({
    children,
    isHeader,
    width,
    color,
    ...props
}: StyledTableCellProps) {
    return (
        <S.TableCellWrapper {...props} width={width}>
            <S.TableCellLabel
                variant="subtitle2"
                align="center"
                isHeader={isHeader}
                style={{ color: color ? color : ColorsEnum.primary }}
            >
                {children}
            </S.TableCellLabel>
        </S.TableCellWrapper>
    );
}

export function StyledChartCell({ children, width }: StyledTableCellProps) {
    return <S.TableCellWrapper width={width}>{children}</S.TableCellWrapper>;
}
