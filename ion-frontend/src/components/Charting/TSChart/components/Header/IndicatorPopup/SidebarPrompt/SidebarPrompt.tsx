import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';

import { useThemeStore } from 'store/theme';
import { ColorsEnum } from 'common/theme';

const drawerWidth = '100%';

export default function SidebarPrompt() {
	const { mode } = useThemeStore();
	const mapping = [{ icon: <SsidChartIcon fontSize="small" />, text: 'Indicators' }, { icon: <ScatterPlotIcon fontSize="small" />, text: 'Instruments' }];

	return (
		<Drawer
			sx={{
				width: drawerWidth,
				height: '100%',
				'& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', },
			}}
			PaperProps={{
				sx: { backgroundColor: mode === 'dark' ? ColorsEnum.darkGrey : ColorsEnum.white, },
				style: { position: 'relative' }
			}}
			variant="permanent"
			anchor="left"
		>
			<List>
				{mapping.map((item: { icon: React.ReactNode, text: string }, index: number) => (
					<ListItem key={item.text} disablePadding>
						<ListItemButton style={{ padding: '3px 15px', fontSize: '20px' }}>
							<ListItemIcon> {item.icon} </ListItemIcon>
							<ListItemText
								disableTypography
								primary={<Typography style={{ fontSize: '12px' }}>{item.text}</Typography>}
							/>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Drawer>
	);
}
