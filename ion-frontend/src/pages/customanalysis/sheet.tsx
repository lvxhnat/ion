import * as React from 'react';
import * as S from './style';

import Typography from '@mui/material/Typography';
import AbcIcon from '@mui/icons-material/Abc';
import Divider from '@mui/material/Divider';
import { TfiLayoutColumn3Alt } from 'react-icons/tfi';
import { FaDatabase } from 'react-icons/fa';

import { DataTableHeaderDefinition } from 'components/Tables/DataTable/type';
import { useAnalysisStore } from 'store/customanalysis/customanalysis';
import StyledPill from 'components/Pills';
import { ColorsEnum } from 'common/theme';

export default function Sheet() {
    const [data] = useAnalysisStore();
    const [dragOver, setDragOver] = React.useState(false);
    const [dragStarted, setDragStarted] = React.useState<boolean>(false);
    const [pillSelected, setPillSelected] = React.useState<number>();

    const [columnEntries, setColumnEntries] = React.useState<number[]>([]);
    const [rowEntries, setRowEntries] = React.useState<number[]>([]);

    const handleDragOverStart = () => setDragOver(true);
    const handleDragOverLeave = () => setDragOver(false);

    const dragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
        e.dataTransfer.setData('text', id.toString());
        setDragStarted(true);
    };
    const enableDropping = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };
    const handleColumnDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const id = e.dataTransfer.getData('text');
        setColumnEntries([...columnEntries, parseInt(id)]);
    };

    return (
        <S.Panel>
            <S.SidePanel>
                <Typography variant="subtitle1"> Data </Typography>
                <Divider />
                <S.TypeDeclarationWrapper style={{ gap: 10, paddingBottom: 20, paddingTop: 10 }}>
                    <FaDatabase />
                    <Typography variant="subtitle2"> {data.file_name} </Typography>
                </S.TypeDeclarationWrapper>
                {data.content_header.map((col: DataTableHeaderDefinition, index: number) => (
                    <S.SidePanelRow key={`sidePanelRow_${index}`}>
                        <AbcIcon key={`panelIcon_${index}`} fontSize="small" />
                        <StyledPill
                            draggable
                            key={`draggablePill_${index}`}
                            selected={pillSelected === index}
                            onDragStart={(e: React.DragEvent<HTMLDivElement>) =>
                                dragStart(e, index)
                            }
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
            <S.MainPanel>
                <S.TypeDeclarationWrapper
                    onDragOver={enableDropping}
                    onDragEnter={handleDragOverStart}
                    onDragLeave={handleDragOverLeave}
                    onDrop={handleColumnDrop}
                    style={{ height: '40px' }}
                >
                    <S.TypeDeclarationWrapper
                        style={{
                            border:
                                '1px solid ' + (dragStarted ? ColorsEnum.beer : ColorsEnum.white),
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
                            border:
                                '1px solid ' + (dragStarted ? ColorsEnum.beer : ColorsEnum.white),
                        }}
                    >
                        {columnEntries.map((index: number) => (
                            <StyledPill draggable key={`draggablePill_${index}`} selected={true}>
                                <Typography
                                    key={`panelTypography_${index}`}
                                    variant="subtitle2"
                                    noWrap
                                >
                                    {data.content_header[index].headerName}
                                </Typography>
                            </StyledPill>
                        ))}
                    </S.TypeDeclarationWrapper>
                </S.TypeDeclarationWrapper>
            </S.MainPanel>
        </S.Panel>
    );
}
