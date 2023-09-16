import React, { useState } from 'react';
import Data from './Data';
import MyMapComponent from './MyMapComponent';

function MapControl() {
    const [selectedBathroom, setSelectedBathroom] = useState(null);

    return (
        <div>
            <Data setSelectedBathroom={setSelectedBathroom} />
            <MyMapComponent selectedBathroom={selectedBathroom} setSelectedBathroom={setSelectedBathroom} />
        </div>
    );
}

export default MapControl;
