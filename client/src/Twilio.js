import React, { useState } from 'react';

const Twilio = ({ bathroomCode }) => {
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSendSMS = async () => {
        const payload = { 
            body: `Your bathroom code is ${bathroomCode}`, 
            to: phoneNumber, 
            // from_: 'TWILIO_PHONE'

        };
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
        <div id="twilioPrompt" style={{ display: 'flex', flexDirection: 'column' }}>
            <input 
                type="text" 
                placeholder="Phone number" 
                value={phoneNumber} 
                onChange={e => setPhoneNumber(e.target.value)}
            />
            <button id="sendButton" onClick={handleSendSMS} >Send Code via SMS</button>
        </div>
    );
};

export default Twilio;
