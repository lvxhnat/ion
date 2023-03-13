import * as React from 'react';

import IconButton from '@mui/material/IconButton';
import { ColorsEnum } from 'common/theme';
import { useThemeStore } from 'store/theme';
import { useWatchlistStore } from 'store/prices/watchlist';

const GridSelectItem = (props: {
    padding: number;
    hovered: boolean;
    selected: boolean;
    borderColor: string;
    gridHoveredColor: string;
    gridSelectedColor: string;
    size: number;
    [key: string]: any;
}) => {
    const {
        padding,
        hovered,
        selected,
        borderColor,
        gridHoveredColor,
        gridSelectedColor,
        size,
        ...others
    } = props;

    return (
        <div
            style={{
                border: '1px solid ' + borderColor,
                backgroundColor: hovered
                    ? gridHoveredColor
                    : selected
                    ? gridSelectedColor
                    : ColorsEnum.black,
                width: `calc(${size} - ${padding})`,
                height: `calc(${size} - ${padding})`,
            }}
            {...others}
        />
    );
};

const GridIcon = (props: { size: number; nrows: number; ncols: number; [key: string]: any }) => {
    return (
        <div {...props}>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: [...Array(props.ncols)].map(() => 'auto').join(' '),
                    alignItems: 'middle',
                    justifyContent: 'middle',
                    width: props.size,
                    height: props.size,
                    border: '1px solid ' + ColorsEnum.white,
                    borderRadius: '2px',
                }}
            >
                {[...Array(props.nrows).keys()].map((_: number, r_index: number) => {
                    return [...Array(props.ncols).keys()].map((_: number, c_index: number) => {
                        const gridId = (r_index + 1) * props.ncols + (c_index + 1);
                        return (
                            <GridSelectItem
                                key={gridId}
                                size={10}
                                padding={0}
                                hovered={false}
                                selected={false}
                                onMouseOver={() => null}
                                gridHoveredColor={'transparent'}
                                gridSelectedColor={'transparent'}
                                borderColor={ColorsEnum.white}
                            />
                        );
                    });
                })}
            </div>
        </div>
    );
};

const GridSelector = (props: {
    nrows: number;
    ncols: number;
    padding: number;
    gridSize: number;
    hovered: boolean;
    gridHoveredColor: string;
    gridSelectedColor: string;
    gridContainerColor: string;
    borderColor: string;
}) => {
    const [hoveredId, setHoveredId] = React.useState<[number, number]>([0, 0]); // x and y coordinates
    const [selectedId, setSelectedId] = useWatchlistStore(store => [
        store.gridSelected,
        store.setGridSelected,
    ]);

    return (
        <>
            <GridIcon ncols={selectedId[1] + 1} nrows={selectedId[0] + 1} size={30} />
            <div
                onMouseLeave={() => setHoveredId([0, 0])}
                style={{
                    position: 'absolute',
                    display: props.hovered ? 'grid' : 'none',
                    gridTemplateColumns: [...Array(props.ncols)].map(() => 'auto').join(' '),
                    alignItems: 'middle',
                    justifyContent: 'middle',
                    backgroundColor: props.gridContainerColor,
                    width: props.gridSize * props.ncols + props.padding * 4,
                    height: props.gridSize * props.nrows + props.padding * 4,
                    marginTop: `calc(${1.3 * props.gridSize * props.nrows}px)`,
                    marginLeft: `calc(${1.3 * props.gridSize * props.ncols}px)`,
                    border: '1px solid ' + ColorsEnum.black,
                    gap: props.padding,
                    padding: props.padding * 2,
                }}
            >
                {[...Array(props.nrows).keys()].map((_: number, r_index: number) => {
                    return [...Array(props.ncols).keys()].map((_: number, c_index: number) => {
                        const gridId = (r_index + 1) * props.ncols + (c_index + 1);
                        return (
                            <GridSelectItem
                                onClick={() => setSelectedId([r_index, c_index])}
                                onMouseOver={() => setHoveredId([r_index, c_index])}
                                key={gridId}
                                size={props.gridSize}
                                padding={props.padding}
                                selected={r_index <= selectedId[0] && c_index <= selectedId[1]}
                                hovered={r_index <= hoveredId[0] && c_index <= hoveredId[1]}
                                gridHoveredColor={props.gridHoveredColor}
                                gridSelectedColor={props.gridSelectedColor}
                                borderColor={props.borderColor}
                            />
                        );
                    });
                })}
            </div>
        </>
    );
};

/**
 * Creates the grid selection (rows, cols) for page grid layout
 * @param gridSelector - Takes in [coordinates, grid selection function] passed down from a higher level component.
 * @returns
 */
export default function Createbar() {
    const { mode } = useThemeStore();
    const hoveredColor = (darkColor: string, lightColor: string) =>
        mode === 'dark' ? darkColor : lightColor;
    const [hovered, setHovered] = React.useState<boolean>(false);

    return (
        <div
            style={{
                backgroundColor: hovered
                    ? hoveredColor(ColorsEnum.darkGrey, ColorsEnum.lightLime)
                    : 'transparent',
            }}
        >
            <IconButton
                disableRipple
                onMouseOver={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <GridSelector
                    nrows={4}
                    ncols={6}
                    padding={3}
                    gridSize={25}
                    hovered={hovered}
                    borderColor={hoveredColor(ColorsEnum.white, ColorsEnum.black)}
                    gridContainerColor={hoveredColor(ColorsEnum.coolgray1, ColorsEnum.lightLime)}
                    gridHoveredColor={hoveredColor(ColorsEnum.warmgray5, ColorsEnum.lightLime)}
                    gridSelectedColor={hoveredColor(ColorsEnum.coolgray1, ColorsEnum.limeGreen)}
                />
            </IconButton>
        </div>
    );
}
