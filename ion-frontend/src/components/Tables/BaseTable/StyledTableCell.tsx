import * as React from 'react';
import * as S from './style';

export interface StyledTableCellProps {
    children?: React.ReactNode;
    isHeader?: boolean;
    width?: string;
}

export function StyledTableCell({ children, isHeader, width }: StyledTableCellProps) {
    return (
        <S.TableCellWrapper width={width}>
            <S.TableCellLabel variant="subtitle2" align="center" isHeader={isHeader}>
                {children}
            </S.TableCellLabel>
        </S.TableCellWrapper>
    );
}

export function StyledChartCell({ children, width }: StyledTableCellProps) {
    return <S.TableCellWrapper width={width}>{children}</S.TableCellWrapper>;
}
