import React, { useState, useEffect } from 'react'; //removed useCallBack from imports
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import BathroomDetails from './BathroomDetails';

function MyMapComponent() {
    // toggle T/F to enable/disable map
    const shouldLoadMap = true;

    const [locations, setLocations] = useState([]);
    const [selectedBathroom, setSelectedBathroom] = useState(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/bathrooms');
                const data = await response.json();
                if (data.bathrooms) {
                    setLocations(data.bathrooms);
                    console.log("Fetched locations:", data.bathrooms);  // Debugging line
                }
            } catch (error) {
                console.error("An error occurred while fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const containerStyle = {
        width: '400px',
        height: '400px'
    };

    const center = {
        lat: 45.586643196593236, 
        lng: -122.69974399042516
    };

    return (
        <>
            {isLoaded && shouldLoadMap ? (
                <div style={{ display: 'flex' }}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                    >
                        {locations.map((location, index) => (
                            <Marker 
                                key={index}
                                position={{ lat: location.lat, lng: location.lng }}
                                onClick={() => setSelectedBathroom(location)}
                            />
                        ))}
                    </GoogleMap>
                    {selectedBathroom && (
                        <div style={{ marginLeft: '20px', borderBlock: '2px solid black' }}>
                            <BathroomDetails details={selectedBathroom} />
                        </div>
                    )}
                </div>
            ) : (
                <p style={{ marginTop: '10px' }}>
                    <span style={{ display: 'inline-block', fontWeight: 'bold', border: '4px solid black', backgroundColor: 'darkslategray', color: 'white', padding: '50px', textShadow: '2px 1px 1px black' }}>Map is currently disabled</span>
                </p>
            )}
        </>
    );
    
}

export default MyMapComponent;



// Below replaces the map with details but it doesnt reload the markers when returning to the map

// import React, { useState, useEffect } from 'react';
// import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
// import BathroomDetails from './BathroomDetails';

// function MyMapComponent() {
//     const shouldLoadMap = true;
//     const [locations, setLocations] = useState([]);
//     const [selectedBathroom, setSelectedBathroom] = useState(null);
//     const [showMap, setShowMap] = useState(true); // New state variable

//     const { isLoaded } = useJsApiLoader({
//         id: 'google-map-script',
//         googleMapsApiKey: 'AIzaSyCP87suMwo4h6N0Jd2srRvq_siWIMiTfaY'
//     });

//     useEffect(() => {
//         const fetchData = async () => {
//             const response = await fetch('/bathrooms');
//             const data = await response.json();
//             if (data.bathrooms) {
//                 setLocations(data.bathrooms);
//             }
//         };
//         fetchData();
//     }, []);

//     const containerStyle = {
//         width: '400px',
//         height: '400px'
//     };

//     const center = {
//         lat: 45.586643196593236,
//         lng: -122.69974399042516
//     };

//     return (
//         <>
//             {isLoaded && shouldLoadMap ? (
//                 <>
//                     {showMap ? (
//                         <GoogleMap
//                             mapContainerStyle={containerStyle}
//                             center={center}
//                             zoom={10}
//                         >
//                             {locations.map((location, index) => (
//                                 <Marker
//                                     key={index}
//                                     position={{ lat: location.lat, lng: location.lng }}
//                                     onClick={() => {
//                                         setSelectedBathroom(location);
//                                         setShowMap(false);
//                                     }}
//                                 />
//                             ))}
//                         </GoogleMap>
//                     ) : (
//                         <>
//                             <BathroomDetails details={selectedBathroom} />
//                             <button onClick={() => setShowMap(true)}>Go back to map</button>
//                         </>
//                     )}
//                 </>
//             ) : (
//                 <p style={{ marginTop: '10px' }}>
//                     <span style={{ display: 'inline-block', fontWeight: 'bold', border: '4px solid black', backgroundColor: 'darkslategray', color: 'white', padding: '50px', textShadow: '2px 1px 1px black' }}>Map is currently disabled</span>
//                 </p>
//             )}
//         </>
//     );
// }

// export default MyMapComponent;
