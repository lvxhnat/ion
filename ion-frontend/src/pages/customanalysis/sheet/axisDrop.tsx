import * as React from 'react';
import * as S from '../style';

import Typography from '@mui/material/Typography';
import { TfiLayoutColumn3Alt } from 'react-icons/tfi';

import { useAnalysisDragStore, useAnalysisStore } from 'store/customanalysis/customanalysis';
import StyledPill from 'components/Pills';
import { ColorsEnum } from 'common/theme';

export default function axisDrop() {
    const [data] = useAnalysisStore();
    const [dragStarted] = useAnalysisDragStore();
    const [dragOver, setDragOver] = React.useState(false);

    const [columnEntries, setColumnEntries] = React.useState<number[]>([]);
    const [rowEntries, setRowEntries] = React.useState<number[]>([]);

    const handleDragOverStart = () => setDragOver(true);
    const handleDragOverLeave = () => setDragOver(false);

    const enableDropping = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };
    const handleColumnDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const id = e.dataTransfer.getData('text');
        setColumnEntries([...columnEntries, parseInt(id)]);
    };

    return (
        <S.TypeDeclarationWrapper
            onDragOver={enableDropping}
            onDragEnter={handleDragOverStart}
            onDragLeave={handleDragOverLeave}
            onDrop={handleColumnDrop}
            style={{ height: '40px' }}
        >
            <S.TypeDeclarationWrapper
                style={{
                    border: '1px solid ' + (dragStarted ? ColorsEnum.beer : ColorsEnum.white),
                    padding: 5,
                    paddingRight: 30,
                    gap: 5,
                    height: '100%',
                }}
            >
                <TfiLayoutColumn3Alt />
                <Typography variant="subtitle2"> Columns </Typography>
            </S.TypeDeclarationWrapper>
            <S.TypeDeclarationWrapper
                style={{
                    gap: 10,
                    width: 1000,
                    height: '100%',
                    border: '1px solid ' + (dragStarted ? ColorsEnum.beer : ColorsEnum.white),
                }}
            >
                {columnEntries.map((index: number) => (
                    <StyledPill draggable key={`selected_draggablePill_${index}`} selected={true}>
                        <Typography key={`panelTypography_${index}`} variant="subtitle2" noWrap>
                            {data.content_header[index].headerName}
                        </Typography>
                    </StyledPill>
                ))}
            </S.TypeDeclarationWrapper>
        </S.TypeDeclarationWrapper>
    );
}
