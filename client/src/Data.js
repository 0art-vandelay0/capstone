import React, { useState, useEffect } from 'react';
import './Data.css';


function Data() {
    const [data, setData] = useState({ bathrooms: [] });

    useEffect(() => {
        fetch('/bathrooms')
            .then(res => res.json())
            .then(data => {
                setData(data);
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
                        <p key={i}>{bathroom.name}, {bathroom.location}</p>
                    ))
                )}
            </div>
        </>
    );
}

export default Data;
