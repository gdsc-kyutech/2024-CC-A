import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Ping = () => {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const checkConnection = async () => {
            try {
                const response = await axios.get('${process.env.REACT_APP_URL}/ping'); 
                if (response.status === 200) {
                    setIsConnected(true);
                } else {
                    setIsConnected(false);
                }
            } catch (error) {
                setIsConnected(false);
            }
        };

        checkConnection();
    }, []);

    return (
        <div className='my-40'>
            {isConnected ? (
                <p>Connected to the backend</p>
            ) : (
                <p>Unable to connect to the backend</p>
            )}
        </div>
    );
};

export default Ping;
