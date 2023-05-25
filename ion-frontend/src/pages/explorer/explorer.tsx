import * as React from 'react';
import * as S from './style';

import { CssBaseline } from '@mui/material';
import Navigation from 'components/Navigation';

import {
    GiAbstract106,
    GiSydneyOperaHouse,
    GiPayMoney,
    GiFruiting,
    GiBallPyramid,
} from 'react-icons/gi';
import { RiBankFill } from 'react-icons/ri';
import { ColorsEnum } from 'common/theme';

type ChoiceTypes = 'allProducts' | 'etf' | 'equity' | 'forex' | 'commodities' | 'econs';

const ExplorerToolbar = (props: {
    selected: ChoiceTypes;
    onClick: (choice: ChoiceTypes) => void;
}) => {
    return (
        <S.ExplorerToolbarWrapper>
            <S.ExplorerButton
                selected={props.selected === 'allProducts'}
                onClick={() => props.onClick('allProducts')}
            >
                <GiBallPyramid style={{ color: ColorsEnum.youthPink, fontSize: 13 }} />
                All Products
            </S.ExplorerButton>
            <S.ExplorerButton
                selected={props.selected === 'econs'}
                onClick={() => props.onClick('econs')}
            >
                <RiBankFill style={{ color: ColorsEnum.white, fontSize: 13 }} />
                Economic Data
            </S.ExplorerButton>
            <S.ExplorerButton
                selected={props.selected === 'etf'}
                onClick={() => props.onClick('etf')}
            >
                <GiAbstract106 style={{ color: ColorsEnum.lighterMachoBlue, fontSize: 13 }} />
                ETF
            </S.ExplorerButton>
            <S.ExplorerButton
                selected={props.selected === 'equity'}
                onClick={() => props.onClick('equity')}
            >
                <GiSydneyOperaHouse style={{ color: ColorsEnum.gamerKhaki, fontSize: 13 }} />
                Equity
            </S.ExplorerButton>
            <S.ExplorerButton
                selected={props.selected === 'forex'}
                onClick={() => props.onClick('forex')}
            >
                <GiPayMoney style={{ color: ColorsEnum.beer, fontSize: 13 }} />
                Forex
            </S.ExplorerButton>
            <S.ExplorerButton
                selected={props.selected === 'commodities'}
                onClick={() => props.onClick('commodities')}
            >
                <GiFruiting style={{ color: ColorsEnum.seeAndBeGreen, fontSize: 13 }} />
                Commodities
            </S.ExplorerButton>
        </S.ExplorerToolbarWrapper>
    );
};

export default function Explorer() {
    const [choice, setChoice] = React.useState<ChoiceTypes>('allProducts');
    return (
        <div>
            <CssBaseline />
            <Navigation />
            <ExplorerToolbar selected={choice} onClick={setChoice} />
        </div>
    );
}
