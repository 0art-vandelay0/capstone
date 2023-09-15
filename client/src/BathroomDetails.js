import React from 'react';

const BathroomDetails = ({ details }) => {
    return (
        <div>
            <h2>{details.name}</h2>
            <p>Location: {details.location}</p>
            <p>Code: {details.code}</p>
            <p>Notes: {details.notes ? details.notes : "No notes for this"}</p>
        </div>
    );
};

export default BathroomDetails;
