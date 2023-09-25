import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import BathroomDetails from './BathroomDetails';
import './MyMapComponent.css';

function MyMapComponent({ selectedBathroom, setSelectedBathroom }) {
    const shouldLoadMap = true;
    const [locations, setLocations] = useState([]);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/bathrooms');
            const data = await response.json();
            if (data.bathrooms) {
                setLocations(data.bathrooms);
            }
        };
        fetchData();
    }, []);

    const containerStyle = {
        width: '525px',
        height: '400px'
    };

    const center = {
        lat: 45.586643196593236,
        lng: -122.69974399042516
    };

    const fetchNearestBathrooms = async (lat, lon) => {
        const response = await fetch(`http://localhost:5000/search_nearest?lat=${lat}&lon=${lon}`);
        const data = await response.json();
        setLocations(data.nearest_bathrooms);
    };

    const getCoordinates = async (address) => {
        const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
        const requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
        const response = await fetch(requestUrl);
        const data = await response.json();
        if (data.status === 'OK') {
            const { lat, lng } = data.results[0].geometry.location;
            return { lat, lon: lng };
        } else {
            console.error('Geocoding error:', data.status);
            return null;
        }
    };

    return (
        <>
            <div style={{ marginBottom: '20px' }}>
                <input type="text" placeholder="Enter your address" id="userAddress" />
                <button onClick={async () => {
                    const address = document.getElementById("userAddress").value;
                    const coordinates = await getCoordinates(address);
                    if (coordinates) {
                        const { lat, lon } = coordinates;
                        fetchNearestBathrooms(lat, lon);
                    } else {
                        console.error("Couldn't get coordinates for the given address.");
                    }
                }}>
                    Search
                </button>
            </div>
            {isLoaded && shouldLoadMap ? (
                <div id="mapContainer" style={{ display: 'flex', flexDirection: 'column' }}>  {/* Changed flexDirection to 'column' */}
                    <div id="googleMapWrapper" style={{ boxShadow: '0px 0px 7px 0px #4e4e4e' }}>
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={10}
                        >
                            {locations.map((location, index) => (
                                <Marker 
                                    key={index}
                                    position={{ lat: location.location.coordinates[1], lng: location.location.coordinates[0] }}
                                    onClick={() => setSelectedBathroom(location)}
                                    icon={
                                        selectedBathroom && selectedBathroom._id === location._id
                                        ? {
                                            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                                            scaledSize: new window.google.maps.Size(50, 50)
                                        }
                                        : "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                                    }
                                />
                            ))}
                        </GoogleMap>
                    </div>
                    {selectedBathroom && (
                        <div id="detailsContainer">
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




// import React, { useState, useEffect } from 'react';
// import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
// import BathroomDetails from './BathroomDetails';
// import './MyMapComponent.css';

// function MyMapComponent({ selectedBathroom, setSelectedBathroom }) {
//     const shouldLoadMap = true;
//     const [locations, setLocations] = useState([]);

//     const { isLoaded } = useJsApiLoader({
//         id: 'google-map-script',
//         googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
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
//         width: '525px',
//         height: '400px'
//     };

//     const center = {
//         lat: 45.586643196593236,
//         lng: -122.69974399042516
//     };

//     const fetchNearestBathrooms = async (lat, lon) => {
//         const response = await fetch(`http://localhost:5000/search_nearest?lat=${lat}&lon=${lon}`);
//         const data = await response.json();
//         setLocations(data.nearest_bathrooms);
//     };

//     const getCoordinates = async (address) => {
//         const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
//         const requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
//         const response = await fetch(requestUrl);
//         const data = await response.json();
//         if (data.status === 'OK') {
//             const { lat, lng } = data.results[0].geometry.location;
//             return { lat, lon: lng };
//         } else {
//             console.error('Geocoding error:', data.status);
//             return null;
//         }
//     };

//     return (
//         <>
//             <div style={{ marginBottom: '20px' }}>
//                 <input type="text" placeholder="Enter your address" id="userAddress" />
//                 <button onClick={async () => {
//                     const address = document.getElementById("userAddress").value;
//                     const coordinates = await getCoordinates(address);
//                     if (coordinates) {
//                         const { lat, lon } = coordinates;
//                         fetchNearestBathrooms(lat, lon);
//                     } else {
//                         console.error("Couldn't get coordinates for the given address.");
//                     }
//                 }}>
//                     Search
//                 </button>
//             </div>
//             {isLoaded && shouldLoadMap ? (
//                 <div id="mapContainer" style={{ display: 'flex' }}>
//                     <div id="googleMapWrapper" style={{ boxShadow: '0px 0px 7px 0px #4e4e4e' }}>
//                         <GoogleMap
//                             mapContainerStyle={containerStyle}
//                             center={center}
//                             zoom={10}
//                         >
//                             {locations.map((location, index) => (
//                                 <Marker 
//                                     key={index}
//                                     position={{ lat: location.location.coordinates[1], lng: location.location.coordinates[0] }}
//                                     onClick={() => setSelectedBathroom(location)}
//                                     icon={
//                                         selectedBathroom && selectedBathroom._id === location._id
//                                         ? {
//                                             url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
//                                             scaledSize: new window.google.maps.Size(50, 50)
//                                         }
//                                         : "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
//                                     }
//                                 />
//                             ))}
//                         </GoogleMap>
//                     </div>
//                     {selectedBathroom && (
//                         <div id="detailsContainer">
//                             <BathroomDetails details={selectedBathroom} />
//                         </div>
//                     )}
//                 </div>
//             ) : (
//                 <p style={{ marginTop: '10px' }}>
//                     <span style={{ display: 'inline-block', fontWeight: 'bold', border: '4px solid black', backgroundColor: 'darkslategray', color: 'white', padding: '50px', textShadow: '2px 1px 1px black' }}>Map is currently disabled</span>
//                 </p>
//             )}
//         </>
//     );
// }

// export default MyMapComponent;