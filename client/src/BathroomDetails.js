// import React from 'react';
// import Twilio from './Twilio'; 

// const BathroomDetails = ({ details }) => {
//     return (
//         <div>
//             <h2>{details.name}</h2>
//             <p>Location: {details.location}</p>
//             <p>Code: {details.code}</p>
//             <p>Notes: {details.notes ? details.notes : "No notes for this"}</p>
//             <Twilio bathroomCode={details.code} />
//         </div>
//     );
// };

// export default BathroomDetails;

import React from 'react';
import Twilio from './Twilio';
import { MapPinLine } from "@phosphor-icons/react";
import './BathroomDetails.css';

const BathroomDetails = ({ details, color }) => {
    // const { coordinates, type } = details.location || {};
    // const latitude = coordinates ? coordinates[1] : 'N/A';
    // const longitude = coordinates ? coordinates[0] : 'N/A';
    
    return (
        <div className="bathroom-details-container">
            <MapPinLine size={27} color={color} style={{marginTop: '20px'}}/>
            <div className="bathroom-details">
                <h2>{details.name}</h2>
                <p>Location: {details.address}</p>
                <p>Code: {details.code}</p>
                <p>{details.notes ? details.notes : "No notes for this location."}</p>
                <Twilio bathroomCode={details.code} />
            </div>
        </div>
    );
};

export default BathroomDetails;

