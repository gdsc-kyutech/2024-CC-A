import React from "react";
import "../Loading.css";

const Loading = ({ isLoading }) => {


    return (
        <div>
        {isLoading && (
            <div id="loading">
                <div className="loader007"></div>
            </div>
        )}
        </div>
    );
};

export default Loading;
