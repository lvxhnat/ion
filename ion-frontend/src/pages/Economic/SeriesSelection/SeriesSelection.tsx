/**
 * This component is the display view of the sidebar providing a choice of series on a user selected field
 */
import * as React from 'react';
import * as S from '../style';

import Typography from '@mui/material/Typography';

import { FredCategoryEntry, FredSeriesEntry } from 'endpoints/clients/fred';

import { ColorsEnum } from 'common/theme';
import { formatDate } from 'common/constant/dates';
import { DoublyLinkedListNode } from '../DoublyLinkedListNode';

interface SeriesSelectionProps {
    nodes: DoublyLinkedListNode;
    setSeriesSelected: (series: FredSeriesEntry) => void;
}

const sortSeriesEntries = (
    a: FredCategoryEntry | FredSeriesEntry,
    b: FredCategoryEntry | FredSeriesEntry
) => {
    const firstEntry = a as FredSeriesEntry;
    const secondEntry = b as FredSeriesEntry;
    if (firstEntry.popularity > secondEntry.popularity) return -1;
    if (firstEntry.popularity < secondEntry.popularity) return 1;
    return 0;
};

export default function SeriesSelection(props: SeriesSelectionProps) {
    return (
        <S.SeriesPanel>
            {props.nodes && props.nodes.value.type === 'series'
                ? props.nodes.value.entries.sort(sortSeriesEntries).map(seriesEntry => {
                      const series = seriesEntry as FredSeriesEntry;
                      return (
                          <S.SeriesContainer
                              onClick={() => props.setSeriesSelected(series)}
                              key={`${props.nodes.value.selection.id}_${series.id}`}
                          >
                              <S.BaseDivClass>
                                  <S.BaseDivClass
                                      style={{
                                          width: '75%',
                                          gap: 20,
                                      }}
                                  >
                                      <Typography
                                          variant="subtitle2"
                                          style={{
                                              color: ColorsEnum.coolgray1,
                                          }}
                                      >
                                          {`${series.id}:FRED`}
                                      </Typography>
                                      <Typography
                                          variant="subtitle2"
                                          noWrap
                                          fontWeight="bold"
                                      >{`${series.title} (${series.units_short})`}</Typography>
                                  </S.BaseDivClass>
                                  <S.BaseDivClass style={{ width: '25%' }}>
                                      <Typography
                                          variant="subtitle2"
                                          align="right"
                                          style={{ width: '100%' }}
                                      >
                                          Last Updated: {formatDate(series.last_updated)}
                                      </Typography>
                                  </S.BaseDivClass>
                              </S.BaseDivClass>
                              <Typography
                                  variant="subtitle2"
                                  noWrap
                                  style={{
                                      width: '100%',
                                  }}
                              >
                                  {series.notes}
                              </Typography>
                              <div
                                  style={{
                                      display: 'flex',
                                      width: '100%',
                                      color: ColorsEnum.warmgray3,
                                  }}
                              >
                                  <Typography variant="subtitle2" style={{ width: '50%' }}>
                                      Observation Frequency: {series.frequency}
                                  </Typography>
                                  <Typography
                                      variant="subtitle2"
                                      align="right"
                                      style={{ width: '50%' }}
                                  >
                                      {`Period: ${series.realtime_start} to ${series.realtime_end}`}
                                  </Typography>
                              </div>
                          </S.SeriesContainer>
                      );
                  })
                : null}
        </S.SeriesPanel>
    );
}
