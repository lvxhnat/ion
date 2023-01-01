import * as React from 'react';
import * as S from '../style';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import AbcIcon from '@mui/icons-material/Abc';
import { FaDatabase } from 'react-icons/fa';

import { DataTableHeaderDefinition } from 'components/Tables/DataTable/type';
import StyledPill from 'components/Pills';
import { useAnalysisDragStore, useAnalysisStore } from 'store/customanalysis/customanalysis';

export default function SidePanel(props: { className?: string }) {
    const [data] = useAnalysisStore();
    const setDragStarted = useAnalysisDragStore()[1];
    const [pillSelected, setPillSelected] = React.useState<number>();

    const dragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
        e.dataTransfer.setData('text', id.toString());
        setDragStarted(true);
    };

    return (
        <S.SidePanel className={props.className}>
            <S.SidePanelRow>
                <Typography variant="subtitle1">
                    <strong>Data</strong>
                </Typography>
            </S.SidePanelRow>
            <Divider style={{ marginBottom: 3 }} />

            <S.SidePanelRow dense displayHover>
                {data.file_name ? (
                    <>
                        <FaDatabase />
                        <Typography variant="subtitle2" style={{ padding: 5 }}>
                            {data.file_name}
                        </Typography>
                    </>
                ) : null}
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
