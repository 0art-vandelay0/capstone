// import React, { useState } from 'react';
// import Data from './Data';
// import MyMapComponent from './MyMapComponent';

// function MapControl() {
//     const [selectedBathroom, setSelectedBathroom] = useState(null);

//     return (
//         <div style={{ display: 'flex', flexDirection: 'row' }}>
//         <div style={{ flex: 1 }}>
//             <MyMapComponent selectedBathroom={selectedBathroom} setSelectedBathroom={setSelectedBathroom} />
//         </div>
//             <div id="dataComp" style={{ flex: 1 }}>
//                 <Data setSelectedBathroom={setSelectedBathroom} />
//             </div>
//         </div>
//     );
// }


// export default MapControl;


import React, { useState } from 'react';
import Data from './Data';
import MyMapComponent from './MyMapComponent';
import BathroomDetails from './BathroomDetails';

function MapControl() {
    const [selectedBathroom, setSelectedBathroom] = useState(null);

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: 2 }}>
                <MyMapComponent selectedBathroom={selectedBathroom} setSelectedBathroom={setSelectedBathroom} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div id="dataComp">
                    <Data setSelectedBathroom={setSelectedBathroom} />
                </div>
                <div id="detailsContainer">
                    {selectedBathroom && <BathroomDetails details={selectedBathroom} />}
                </div>
            </div>
        </div>
    );
}

export default MapControl;
