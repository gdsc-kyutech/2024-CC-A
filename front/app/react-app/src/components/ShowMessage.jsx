import React from 'react';

const ShowMessage = ({ message }) => {
    return (
        <div className='w-80'>
            <p>{message}</p>
        </div>
    );
};

export default ShowMessage;
