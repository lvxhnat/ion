import React from 'react';
import AxisDrop from './AxisDrop';

export default function Drop() {
    return (
        <div>
            <div style={{ display: 'flex', gap: 10 }}>
                <span>
                    <AxisDrop entryType="rows" />
                </span>
                <span>
                    <AxisDrop entryType="columns" />
                </span>
            </div>
        </div>
    );
}
