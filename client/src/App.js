import React from 'react';
// import Data from './Data';
import Header from './Header';
// import MyMapComponent from './MyMapComponent';
import MapControl from './MapControl';

function App() {
    return (
        <React.Fragment>
            <div style={{ margin: '40px' }}>
                <Header />
                <MapControl />
            </div>
        </React.Fragment>
    );
}

export default App;
