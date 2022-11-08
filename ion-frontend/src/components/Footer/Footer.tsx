import React from 'react';
import StreamHint from 'components/StreamHint';

import OandaDark from 'static/oanda/oanda-dark.png';
import OandaLight from 'static/oanda/oanda-light.png';
import { Box, Grid } from '@mui/material';

export default function Footer(props: { dataStreamProvider: 'oanda' }
) {
	const providers = {
		oanda: {
			dark: OandaDark,
			light: OandaLight,
		}
	};

	return (
		<Grid container>
			<Grid item lg={9}></Grid>
			<Grid item lg={3}>
				<Box display="flex" justifyContent="flex-end" style={{ paddingRight: '10px' }}>
					<StreamHint
						text={'streaming'}
						light={providers[props.dataStreamProvider].light}
						dark={providers[props.dataStreamProvider].dark} />
				</Box>
			</Grid>
		</Grid>
	);
}
