import * as React from 'react';
import * as S from './style';

import Typography from '@mui/material/Typography';

import { formatDate } from 'common/constant/dates';
import { usePortfolioStore } from 'store/portfolio/portfolio';
import { ColorsEnum } from 'common/theme';
import { CurrencyToCountry } from 'common/constant/countries';
import NoDataSkeleton from 'components/Skeletons/NoDataSkeleton';

export default function PortfolioDesc(props: {}) {
    const selectedPortfolio = usePortfolioStore(state => state.selectedPortfolio);
    return (
        <div style={{ 
            padding: 5,
            height: '45vh', 
            overflowY: 'hidden',
        }}>
            {
                ('uuid' in selectedPortfolio) ? 
                <>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, height: '40%' }}>
                        <div style={{ width: '20%' }}>
                            <img 
                                height="100%"
                                width="100%"
                                style={{ objectFit: "contain" }}
                                src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg" 
                            />
                            <div style={{ backgroundColor: ColorsEnum.darkGrey, padding: "2px 5px", borderRadius: 5 }}>
                                <Typography variant="subtitle2" noWrap> Portfolio {selectedPortfolio.uuid.slice(0, 10)} </Typography>
                            </div>
                        </div>
                        <div style={{ width: '80%', height: '100%' }}>
                            <Typography variant="subtitle2">
                                {selectedPortfolio.description}
                            </Typography>
                            <S.PortfolioDescMetadataBody>
                                <Typography variant="subtitle2" component="div"> Created at: {formatDate(selectedPortfolio.creation_date)} </Typography>
                                <Typography variant="subtitle2" component="div"> Updated at: {formatDate(selectedPortfolio.last_updated)} </Typography>
                                <Typography variant="subtitle2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 5 }}>
                                    Currency: {selectedPortfolio.currency}
                                    <img 
                                        width="20"
                                        src={`https://flagcdn.com/${CurrencyToCountry[selectedPortfolio.currency as keyof typeof CurrencyToCountry]}.svg`} 
                                    />
                                </Typography>
                            </S.PortfolioDescMetadataBody>
                        </div>
                    </div>
                    <div style={{ height: '60%', backgroundColor: ColorsEnum.darkGrey, borderRadius: 5 }}>
                        <NoDataSkeleton text="No Calculations Made"/>
                    </div>
                </> : 
                undefined
            }
        </div>
    );
}
