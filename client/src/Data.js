import React, { useState, useEffect } from 'react';
import { MapPin } from "@phosphor-icons/react";
import './Data.css';

function Data( {setSelectedBathroom} ) {
    const [data, setData] = useState({ bathrooms: [] });
    const rainbowColors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#9400D3"];

    useEffect(() => {
        fetch('/bathrooms')
            .then(res => res.json())
            .then(data => {
                const coloredData = data.bathrooms.map((bathroom, i) => {
                    const color = rainbowColors[i % rainbowColors.length];
                    return {...bathroom, color};
                });

                setData({ bathrooms: coloredData });
            });
    }, []);

    return (
        <>
            <div>
                <h3>Temp Data hitting MongoDB</h3>
            </div>
            <div className="scroll-div">
                {data.bathrooms.length === 0 ? (
                    <p>Loading...</p>
                ) : (
                    data.bathrooms.map((bathroom, i) => (
                        <p key={i} className='bathroom-location' onClick={() => setSelectedBathroom(bathroom)}>
                        <MapPin size={23} color={bathroom.color} />
                            &nbsp;
                            <strong>{bathroom.name}</strong>, {bathroom.address}
                        </p>
                    ))
                )}
            </div>
        </>
    );
}

export default Data;
