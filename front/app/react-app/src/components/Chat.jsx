import React from "react";
import Markdown from 'react-markdown'

const Chat = ({ response }) => {


    return (
        <div>
        {response && (
            <div>
            <h2>Chat</h2>
            <div>
                <Markdown>{response}</Markdown>
            </div>
            </div>
        )}
        </div>
    );
};

export default Chat;
