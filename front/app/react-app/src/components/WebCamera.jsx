import React from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const WebCamera = () => {
    const webcamRef = React.useRef(null);
    const [isCameraRunning, setIsCameraRunning] = React.useState(false); // カメラの実行状態をfalseに設定

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        const base64Image = imageSrc.split(',')[1]; // データURLからベース64画像データを抽出

        // axiosを使用してベース64画像データを含むPOSTリクエストを実行
        axios.post(`${process.env.REACT_APP_URL}/analyze_image`, { image: base64Image }, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                // レスポンスデータの処理
                console.log(response.data);
            })
            .catch(error => {
                // エラーの処理
                console.error(error);
            });
    }, [webcamRef]);

    const toggleCamera = React.useCallback(() => {
        setIsCameraRunning(prevState => !prevState);
    }, []);

    return (
        <>
            <button onClick={toggleCamera}>カメラの切り替え</button>
            <div className='w-[80%] mx-auto my-20'>
                {isCameraRunning && (
                    <>
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={{
                                facingMode: "environment"
                            }}
                        />
                        <div className='my-10'>
                            <button onClick={capture}>キャプチャ</button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default WebCamera;
