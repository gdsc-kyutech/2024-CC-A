import React from "react";
import Markdown from 'react-markdown'
import '../Chat.css'

const Chat = ({ response }) => {
    
    return (
        <div className="relative">
            {/* {response && (
                <div>
                <h2>Chat</h2>
                <div>
                    <Markdown>{response}</Markdown>
                </div>
                </div>
            )} */}
            <div className="text-left mx-6 bg-[#2592AD] p-6 mt-10 rounded-lg">
                <Markdown>テキストテキストテキストテキストテキストテキストテキストテキストテキスト</Markdown>
            </div>
            <div className="triangle"></div>
        </div>
    );
};

export default Chat;
