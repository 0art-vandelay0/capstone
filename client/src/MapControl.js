// import React, { useState } from 'react';
// import Data from './Data';
// import MyMapComponent from './MyMapComponent';

// function MapControl() {
//     const [selectedBathroom, setSelectedBathroom] = useState(null);

//     return (
//         <div>
//             <Data setSelectedBathroom={setSelectedBathroom} />
//             <MyMapComponent selectedBathroom={selectedBathroom} setSelectedBathroom={setSelectedBathroom} />
//         </div>
//     );
// }

// export default MapControl;


// Compare component page organization

import React, { useState } from 'react';
import Data from './Data';
import MyMapComponent from './MyMapComponent';

function MapControl() {
    const [selectedBathroom, setSelectedBathroom] = useState(null);

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1 }}>
            <MyMapComponent selectedBathroom={selectedBathroom} setSelectedBathroom={setSelectedBathroom} />
        </div>
            <div style={{ flex: 1 }}>
                <Data setSelectedBathroom={setSelectedBathroom} />
            </div>
        </div>
    );
}


export default MapControl;
