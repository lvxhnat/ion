import * as React from 'react';
import * as S from '../style';

import CloseIcon from '@mui/icons-material/Close';

import Typography from '@mui/material/Typography';
import { ColorsEnum } from 'common/theme';
import { useThemeStore } from 'store/theme';
import PopupButton from 'components/Button';
import { PortfolioSpecificationType, usePortfolioStore } from 'store/portfolio/portfolio';

function PortfolioPopupOptionRow(props: {
    title: string;
    selected: string;
    [props: string]: any;
    options: string[];
}) {
    const { mode } = useThemeStore();

    const textStyle: React.CSSProperties = {
        width: '100%',
        fontFamily: 'inherit',
        backgroundColor: 'transparent',
        color: mode === 'dark' ? ColorsEnum.white : ColorsEnum.black,
        outline: 'none',
        border: `1px solid ${mode === 'dark' ? ColorsEnum.white : ColorsEnum.black}`,
    };
    return (
        <div
            style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 1,
            }}
        >
            <div
                style={{
                    width: '40%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="subtitle1">{props.title}</Typography>
            </div>
            <div
                style={{
                    width: '60%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}
            >
                <select {...props} style={textStyle} defaultValue={props.selected}>
                    {props.options.map((option: string) => {
                        return (
                            <option key={`${props.title}_${option}`} value={option}>
                                {option}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
}

function PortfolioPopupTextRow(props: {
    title: string;
    [props: string]: any;
    showdescription?: boolean;
}) {
    const { mode } = useThemeStore();

    const textStyle: React.CSSProperties = {
        width: '100%',
        fontFamily: 'inherit',
        backgroundColor: 'transparent',
        color: mode === 'dark' ? ColorsEnum.white : ColorsEnum.black,
        outline: 'none',
        border: `1px solid ${mode === 'dark' ? ColorsEnum.white : ColorsEnum.black}`,
    };

    return (
        <div
            style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 1,
            }}
        >
            <div
                style={{
                    width: '40%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="subtitle1">{props.title}</Typography>
            </div>
            <div
                style={{
                    width: '60%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}
            >
                {props.showdescription ? (
                    <textarea {...props} style={textStyle} />
                ) : (
                    <input type="text" {...props} style={textStyle} />
                )}
            </div>
        </div>
    );
}

export default function PortfolioPopup(props: { show: boolean; setShow: (show: boolean) => void }) {
    const [showCancel, setShowCancel] = React.useState<boolean>(false);
    const [portfolioConfig, setPortfolioConfig] = React.useState<PortfolioSpecificationType>({
        name: '',
        description: '',
        currency: '',
    });
    const setPortfolios = usePortfolioStore(state => state.setPortfolios);

    const defaultCurrency = 'SGD';
    const currencies = ['SGD', 'USD'];

    return (
        <div
            style={{
                display: props.show ? 'block' : 'none',
                position: 'absolute',
                margin: '0 auto',
                top: '25%',
                left: '25%',
                width: 'calc(650px + 5vw)',
                height: 'calc(350px + 5vh)',
                maxWidth: 700,
                maxHeight: 450,
                borderRadius: 10,
                backgroundColor: ColorsEnum.black,
            }}
        >
            <S.LabPopupContainerWrapper>
                <div style={{ gap: 2, display: 'flex', width: '33%', paddingLeft: 5 }}>
                    <S.LabOpenButtonWrapper
                        onMouseOver={() => setShowCancel(true)}
                        onMouseOut={() => setShowCancel(false)}
                        onClick={() => props.setShow(false)}
                        style={{ backgroundColor: ColorsEnum.coolgray2 }}
                    >
                        <CloseIcon
                            style={{ display: showCancel ? 'block' : 'none' }}
                            fontSize="inherit"
                        />
                    </S.LabOpenButtonWrapper>
                    <S.LabOpenButtonWrapper />
                    <S.LabOpenButtonWrapper />
                </div>
                <div style={{ display: 'flex', width: '67%' }}>
                    <Typography variant="subtitle1" style={{ marginLeft: '10%' }}>
                        Add Portfolio Configuration
                    </Typography>
                </div>
            </S.LabPopupContainerWrapper>
            <div style={{ padding: 5 }}>
                <PortfolioPopupTextRow
                    title="Portfolio Name"
                    onChange={(event: any) => {
                        portfolioConfig.name = event.target.value;
                        setPortfolioConfig(portfolioConfig);
                    }}
                />
                <PortfolioPopupTextRow
                    showdescription
                    title="Portfolio Description"
                    onChange={(event: any) => {
                        portfolioConfig.description = event.target.value;
                        setPortfolioConfig(portfolioConfig);
                    }}
                />
                <PortfolioPopupOptionRow
                    selected={defaultCurrency}
                    title="Currency Specification"
                    options={currencies}
                    onChange={(event: any) => {
                        portfolioConfig.currency = event.target.value;
                        setPortfolioConfig(portfolioConfig);
                    }}
                />
            </div>
            <div
                style={{
                    gap: 5,
                    padding: 5,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
                    backgroundColor: ColorsEnum.darkGrey,
                }}
            >
                <PopupButton buttonType="secondary" onClick={() => props.setShow(false)}>
                    Cancel
                </PopupButton>
                <PopupButton
                    buttonType="primary"
                    onClick={() => {
                        portfolioConfig.currency =
                            portfolioConfig.currency === ''
                                ? defaultCurrency
                                : portfolioConfig.currency;
                        setPortfolios(portfolioConfig);
                        props.setShow(false);
                    }}
                >
                    OK
                </PopupButton>
            </div>
        </div>
    );
}
