import * as React from 'react';
import { IntRange } from "common/types";

/**
 * For example: {"name": "price", "index": "price_0", "width": 20}
 */
export interface TableHeaderItem {
    name: string, // Denotes the name of the column we want to create
    index: string | number, // A unique identifier for the column name 
    width?: IntRange<0, 100> // A number from 0 to 100 denote column width
}

export type TableHeaderSpecification = Array<TableHeaderItem>

/**
 * For example: {"value": 2321, backgroundColor: "black"}
 */
export interface TableBodySubItem {
    value: string | number | React.ReactNode, // The value of the item to to be added in the table 
    backgroundColor?: string, // If required, the background color of the cell
}

export interface TableBodyItem {
    // Number of keys == (key of TableHeaderItem).length
    [name: string]: TableBodySubItem
}

export type TableBodySpecification = Array<TableBodyItem>

export type StyledTableCellProps = {
    children?: React.ReactNode,
    isHeader?: boolean,
    [x: string]: any, // Spread rest of props
}