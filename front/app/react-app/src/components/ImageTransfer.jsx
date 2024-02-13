import React, { useState } from 'react';
import axios from 'axios';
import Chat from './Chat';
import Loading from './Loading';

const ImageTransfer = () => {
    const [image, setImage] = useState(null);
    const [response, setResponse] = useState('');
    const [loading ,setLoading] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            console.log(base64String); // Add this line to log the base64 string
            setImage(base64String);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }

    const handleImageUpload = () => {
        // POSTリクエストを送信する処理を実装する
        // ここで`image`の値を使用してBase64形式の画像データを送信する
        console.log(image);
        // TODO: dotenvを使ってURLを環境変数から取得する
        axios
            .post(`${process.env.REACT_APP_URL}/analyze_image`, {
                image: image,
            })
            .then((response) => {
                console.log(response.data);
                setResponse(response.data.content); // Set the response data's content as the message
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <div>
                <input type="file" onChange={handleImageChange} />
                <button onClick={handleImageUpload}>Upload</button>
                <button onClick={handleClick}>テスト用ボタン</button>
                <Loading isLoading={loading} />
            </div>
            <Chat response={response} />
        </>
    );
};

export default ImageTransfer;
