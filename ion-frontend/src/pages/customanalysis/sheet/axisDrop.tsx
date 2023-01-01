import * as React from 'react';
import * as S from '../style';

import Typography from '@mui/material/Typography';
import { TfiLayoutColumn3Alt } from 'react-icons/tfi';

import {
    useAnalysisDragStore,
    useAnalysisStore,
    useAnalysisFieldsDeclared,
} from 'store/customanalysis/customanalysis';
import StyledPill from 'components/Pills';
import { ColorsEnum } from 'common/theme';
import { capitalizeString } from 'common/helper/general';

export default function AxisDrop(props: { entryType: 'columns' | 'rows' }) {
    const [data] = useAnalysisStore();
    const [dragStarted] = useAnalysisDragStore();
    const [dragOver, setDragOver] = React.useState(false);

    const [entries, setEntries] = useAnalysisFieldsDeclared();

    const handleDragOverStart = () => setDragOver(true);
    const handleDragOverLeave = () => setDragOver(false);

    const enableDropping = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };
    const handleColumnDrop = (e: React.DragEvent<HTMLDivElement>) => {
        let id = parseInt(e.dataTransfer.getData('text'));
        if (!entries[props.entryType].has(id)) entries[props.entryType].add(id);
        setEntries(entries);
        setDragOver(false);
    };

    return (
        <S.TypeDeclarationWrapper
            onDragOver={enableDropping}
            onDragEnter={handleDragOverStart}
            onDragLeave={handleDragOverLeave}
            onDrop={handleColumnDrop}
            style={{ height: '28px' }}
        >
            <S.TypeDeclarationWrapper
                style={{
                    border: '0.5px solid ' + (dragStarted ? ColorsEnum.beer : ColorsEnum.coolgray1),
                    padding: 5,
                    paddingRight: 30,
                    gap: 5,
                    height: '100%',
                    width: 100,
                }}
            >
                <TfiLayoutColumn3Alt
                    style={{ transform: props.entryType === 'rows' ? 'rotate(90deg)' : 'none' }}
                />
                <Typography variant="subtitle2"> {capitalizeString(props.entryType)} </Typography>
            </S.TypeDeclarationWrapper>
            <S.TypeDeclarationWrapper
                style={{
                    gap: 5,
                    height: '100%',
                    paddingLeft: 5,
                    width: 515,
                    border: '0.5px solid ' + (dragStarted ? ColorsEnum.beer : ColorsEnum.coolgray1),
                }}
            >
                {[...entries[props.entryType]].map((index: number) => (
                    <StyledPill
                        draggable
                        style={{ width: 120 }}
                        key={`selected_draggablePill_${index}`}
                        selected={true}
                    >
                        <Typography key={`panelTypography_${index}`} variant="subtitle2" noWrap>
                            {data.content_header[index].headerName}
                        </Typography>
                    </StyledPill>
                ))}
            </S.TypeDeclarationWrapper>
        </S.TypeDeclarationWrapper>
    );
}
