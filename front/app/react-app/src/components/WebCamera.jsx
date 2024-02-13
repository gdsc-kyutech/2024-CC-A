import React from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import Chat from './Chat';
import Loading from './Loading';


const WebCamera = () => {
    const webcamRef = React.useRef(null);
    const [isCameraRunning, setIsCameraRunning] = React.useState(false);
    const [response, setResponse] = React.useState(null);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        const base64Image = imageSrc.split(',')[1];

        axios.post(`${process.env.REACT_APP_URL}/analyze_image`, { image: base64Image }, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                console.log(response.data);
                setResponse(response.data.content);
            })
            .catch(error => {
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
                        <Chat response={response} />
                    </>
                )}
            </div>
        </>
    );
};

export default WebCamera;
