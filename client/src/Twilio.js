import React, { useState } from 'react';

const Twilio = ({ bathroomCode }) => {
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSendSMS = async () => {
        const payload = { phoneNumber, bathroomCode };
        const response = await fetch('/send_sms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        console.log('SMS sent:', data);
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Phone number" 
                value={phoneNumber} 
                onChange={e => setPhoneNumber(e.target.value)}
            />
            <button onClick={handleSendSMS}>Send Code via SMS</button>
        </div>
    );
};

export default Twilio;
