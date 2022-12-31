import * as React from 'react';
import * as S from '../style';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import AbcIcon from '@mui/icons-material/Abc';
import { FaDatabase } from 'react-icons/fa';

import { DataTableHeaderDefinition } from 'components/Tables/DataTable/type';
import StyledPill from 'components/Pills';
import { useAnalysisDragStore, useAnalysisStore } from 'store/customanalysis/customanalysis';

export default function SidePanel() {
    const [data] = useAnalysisStore();
    const setDragStarted = useAnalysisDragStore()[1];
    const [pillSelected, setPillSelected] = React.useState<number>();
    const [dataHovered, setDataHovered] = React.useState<boolean>();

    const dragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
        e.dataTransfer.setData('text', id.toString());
        setDragStarted(true);
    };

    return (
        <S.SidePanel>
            <S.SidePanelRow>
                <Typography variant="subtitle1">
                    <strong>Data</strong>
                </Typography>
            </S.SidePanelRow>
            <Divider style={{ marginBottom: 3 }} />

            <S.SidePanelRow
                dense
                displayHover
                style={{
                    paddingBottom: 5,
                    paddingTop: 5,
                }}
            >
                <FaDatabase />
                <Typography variant="subtitle2" style={{ paddingTop: 5, paddingBottom: 5 }}>
                    {' '}
                    {data.file_name}{' '}
                </Typography>
            </S.SidePanelRow>

            <S.SidePanelRow>
                <Typography variant="subtitle1">
                    <strong>Tables</strong>
                </Typography>
            </S.SidePanelRow>
            <Divider style={{ marginBottom: 3 }} />

            {data.content_header.map((col: DataTableHeaderDefinition, index: number) => (
                <S.SidePanelRow key={`sidePanelRow_${index}`} dense>
                    <AbcIcon key={`panelIcon_${index}`} fontSize="small" />
                    <StyledPill
                        draggable
                        key={`draggablePill_${index}`}
                        selected={pillSelected === index}
                        onDragStart={(e: React.DragEvent<HTMLDivElement>) => dragStart(e, index)}
                        onDragEnd={() => setDragStarted(false)}
                        onClick={() => setPillSelected(index)}
                    >
                        <Typography key={`panelTypography_${index}`} variant="subtitle2" noWrap>
                            {col.headerName}
                        </Typography>
                    </StyledPill>
                </S.SidePanelRow>
            ))}
        </S.SidePanel>
    );
}
