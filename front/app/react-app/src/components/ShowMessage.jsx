import React from 'react';

const ShowMessage = ({ message }) => {
    return (
        <div className='w-80'>
            This is the hint.
            <p>{message}</p>
        </div>
    );
};

export default ShowMessage;
