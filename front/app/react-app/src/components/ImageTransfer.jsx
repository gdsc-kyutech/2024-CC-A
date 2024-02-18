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

    const handleImageUpload = () => {
        // POSTリクエストを送信する処理を実装する
        // ここで`image`の値を使用してBase64形式の画像データを送信する
        console.log(image);
        // TODO: dotenvを使ってURLを環境変数から取得する
        setLoading(true);
        axios
            .post(`${process.env.REACT_APP_URL}/analyze_image`, {
                image: image,
            })
            .then((response) => {
                console.log(response.data);
                setResponse(response.data.content); // Set the response data's content as the message
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <div className='mx-6 mt-20'>
                <div className='flex justify-between '>
                    <input type="file" onChange={handleImageChange} 
                        className='bg-[#D39200] text-white text-[10px] rounded-lg shadow-md block w-[245px]
                        file:bg-[#D39200] file:text-white file:py-2 file:px-4 file:rounded-lg
                        file:border-0 file:text-[12px]'
                    />
                    <button onClick={handleImageUpload} className="bg-[#D39200] text-white p-[3px] px-[6px] rounded-lg ml-2 shadow-md p-[5px] block text-[12.5px] font-semibold
                    ">Upload</button>
                    {/* <button onClick={handleClick}>テスト用ボタン</button> */} 
                </div>
                <Loading isLoading={loading}/>
            </div>
            <Chat response={response} className="mb-20" />
        </>
    );
};

export default ImageTransfer;
