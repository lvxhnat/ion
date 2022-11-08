import React from 'react';
import * as S from './style';
import { useThemeStore } from 'store/theme';

export default function StreamHint(props: {
    text: string,
    light: string,
    dark: string,
}) {
	const { mode } = useThemeStore();
	const size = '20px';
	const imgStyle: React.CSSProperties = { width: size, height: size, float: 'right' };

	return (
		<S.Pill>
			<S.LeftPill style={{ float: 'left' }}>
				{props.text}
			</S.LeftPill>
			<S.RightPill>
				{mode === 'dark' ? <img src={props.dark} style={imgStyle} /> : <img src={props.light} style={imgStyle} />}
			</S.RightPill>
		</S.Pill>
	);
}
