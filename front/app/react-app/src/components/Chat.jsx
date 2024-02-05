import React from "react";

const Chat = ({ response }) => {
    return (
        <div>
        {response && (
            <div>
            <h2>Chat</h2>
            <div>
                <p>{response.content}</p>
            </div>
            </div>
        )}
        </div>
    );
};

export default Chat;
