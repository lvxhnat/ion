import * as React from 'react';
import * as S from '../style';

import CloseIcon from '@mui/icons-material/Close';

import Typography from '@mui/material/Typography';
import { ColorsEnum } from 'common/theme';
import { useThemeStore } from 'store/theme';
import PopupButton from 'components/Button';
import { typographyTheme } from 'common/theme/typography';

export function PortfolioPopupOptionRow(props: {
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
                <Typography variant="subtitle2" noWrap>
                    {props.title}
                </Typography>
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

export function PortfolioPopupTextRow(props: {
    title: string;
    selection?: string;
    [x: string]: any;
}) {
    const { mode } = useThemeStore();

    const textStyle: React.CSSProperties = {
        width: '100%',
        fontFamily: 'inherit',
        backgroundColor: 'transparent',
        color: mode === 'dark' ? ColorsEnum.white : ColorsEnum.black,
        outline: 'none',
        border: `1px solid ${mode === 'dark' ? ColorsEnum.white : ColorsEnum.black}`,
        fontSize: typographyTheme.subtitle1.fontSize,
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
                <Typography variant="subtitle2" noWrap>
                    {props.title}
                </Typography>
            </div>
            <div
                style={{
                    width: '60%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}
            >
                {props.selection ? (
                    <Typography {...props} variant="subtitle2">
                        {props.selection}
                    </Typography>
                ) : (
                    <input type="text" {...props} style={textStyle} />
                )}
            </div>
        </div>
    );
}

export default function PortfolioPopup(props: {
    show: boolean;
    setShow: (show: boolean) => void;
    handleClick: () => void;
    children: any;
}) {
    const [showCancel, setShowCancel] = React.useState<boolean>(false);

    return (
        <S.LabPopup show={props.show}>
            <S.LabPopupHeader>
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
                        Add Portfolio Transaction
                    </Typography>
                </div>
            </S.LabPopupHeader>
            <div style={{ minHeight: 300 }}>{props.children}</div>
            <S.LabPopupFooter>
                <PopupButton buttonType="secondary" onClick={() => props.setShow(false)}>
                    Cancel
                </PopupButton>
                <PopupButton buttonType="primary" onClick={props.handleClick}>
                    OK
                </PopupButton>
            </S.LabPopupFooter>
        </S.LabPopup>
    );
}
