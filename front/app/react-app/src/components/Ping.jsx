import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Ping = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [responseData, setResponseData] = useState(null);

    useEffect(() => {
        const checkConnection = async () => {
            try {
                // TODO: dotenvを使ってURLを環境変数から取得する
                const response = await axios.get('http://localhost:8080/ping');
                if (response.status === 200) {
                    setIsConnected(true);
                    setResponseData(response.data);
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
                <>
                    <p>Pong</p>
                    {responseData && <p>{JSON.stringify(responseData)}</p>}
                </>
            ) : (
                <p>Unable to connect to the backend</p>
            )}
        </div>
    );
};

export default Ping;
