import * as React from 'react';
import * as S from './style';

import Typography from '@mui/material/Typography';

import { formatDate } from 'common/constant/dates';
import { usePortfolioStore } from 'store/portfolio/portfolio';
import { CurrencyToCountry } from 'common/constant/countries';

export default function PortfolioDesc(props: {}) {
    const selectedPortfolio = usePortfolioStore(state => state.selectedPortfolio);
    return (
        <div
            style={{
                padding: 5,
                height: '80vh',
                overflowY: 'hidden',
            }}
        >
            {'uuid' in selectedPortfolio ? (
                <>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            flexDirection: 'column',
                            gap: 20,
                            height: '40%',
                        }}
                    >
                        <div></div>
                        <div>
                            <Typography variant="subtitle2" style={{ minHeight: 50 }}>
                                {selectedPortfolio.description}
                            </Typography>
                            <S.PortfolioDescMetadataBody>
                                <Typography variant="subtitle2" component="div">
                                    {' '}
                                    Created at: {formatDate(selectedPortfolio.creation_date)}{' '}
                                </Typography>
                                <Typography variant="subtitle2" component="div">
                                    {' '}
                                    Updated at: {formatDate(selectedPortfolio.last_updated)}{' '}
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        gap: 5,
                                    }}
                                >
                                    Currency: {selectedPortfolio.currency}
                                    <img
                                        width="20"
                                        src={`https://flagcdn.com/${
                                            CurrencyToCountry[
                                                selectedPortfolio.currency as keyof typeof CurrencyToCountry
                                            ]
                                        }.svg`}
                                    />
                                </Typography>
                            </S.PortfolioDescMetadataBody>
                        </div>
                    </div>
                </>
            ) : undefined}
        </div>
    );
}
