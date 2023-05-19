import * as React from 'react';
import * as S from '../../style';

import Typography from '@mui/material/Typography';

import { formatDate } from 'common/constant/dates';
import { usePortfolioStore } from 'store/portfolio/portfolio';
import { ColorsEnum } from 'common/theme';
import { CurrencyToCountry } from 'common/constant/countries';

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
                <React.Fragment>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
                        <img 
                            height="125"
                            width="100"
                            style={{ objectFit: "contain" }}
                            src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg" 
                        />
                        <Typography variant="subtitle2" noWrap>
                            {selectedPortfolio.description}
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <div style={{ backgroundColor: ColorsEnum.darkGrey, padding: "2px 5px", borderRadius: 5 }}>
                            <Typography variant="subtitle2" noWrap> Portfolio {selectedPortfolio.uuid.slice(0, 10)} </Typography>
                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                            <div>
                                <Typography variant="subtitle2" component="div"> Created at: {formatDate(selectedPortfolio.creation_date)} </Typography>
                                <Typography variant="subtitle2" component="div"> Updated at: {formatDate(selectedPortfolio.last_updated)} </Typography>
                            </div>
                        </div>
                    </div>
                    <div style={{ paddingTop: 5, flexDirection: 'column', flex: 1 }}>
                        <Typography variant="subtitle2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 5 }}>
                            Currency: {selectedPortfolio.currency}
                            <img 
                                width="20"
                                src={`https://flagcdn.com/${CurrencyToCountry[selectedPortfolio.currency as keyof typeof CurrencyToCountry]}.svg`} 
                            />
                        </Typography>
                    </div>
                </React.Fragment> : 
                undefined
            }
        </div>
    );
}
