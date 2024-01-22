import React, { useState } from 'react';

const ImageTransfer = () => {
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result;
            console.log(base64String); // Add this line to log the base64 string
            setImage(base64String);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleImageUpload = () => {
        // POSTリクエストを送信する処理を実装する
        // ここで`image`の値を使用してBase64形式の画像データを送信する
    };

    return (
        <div>
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleImageUpload}>Upload</button>
        </div>
    );
};

export default ImageTransfer;
