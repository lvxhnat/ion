import React from "react";
import * as S from "../style";

import { ASSET_TYPES } from "common/constant";

import { FredSeriesEntry } from "pages/Economic/requests";
import { DoublyLinkedListNode } from "../DoublyLinkedListNode";
import Chartview from "./Chartview";

interface SelectedSeriesMainviewProps {
  seriesSelected: FredSeriesEntry | undefined;
  nodes: DoublyLinkedListNode;
}

export default function SelectedSeriesMainview(
  props: SelectedSeriesMainviewProps
) {
  return (
    <S.SelectedSeriesMainviewContainer>
      <Chartview
        ticker={props.seriesSelected?.id ?? ""}
        seriesSelected={props.seriesSelected}
        assetType={ASSET_TYPES.FRED as keyof typeof ASSET_TYPES}
      />
    </S.SelectedSeriesMainviewContainer>
  );
}
