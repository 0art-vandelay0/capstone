import React from 'react';
import Data from './Data';
import Header from './Header';
import MyMapComponent from './MyMapComponent';

function App() {
    return (
        <React.Fragment>
            <Header />
            <Data />
            <MyMapComponent />
        </React.Fragment>
    );
}

export default App;
