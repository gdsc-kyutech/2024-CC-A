import React from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import Chat from './Chat';
import Loading from './Loading';


const WebCamera = () => {
    const webcamRef = React.useRef(null);
    const [isCameraRunning, setIsCameraRunning] = React.useState(false);
    const [capturedImage, setCapturedImage] = React.useState(null);
    const [response, setResponse] = React.useState(null);
    const [loading ,setLoading] = React.useState(false);
    
    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        const base64Image = imageSrc.split(',')[1];

        setCapturedImage(imageSrc);
        setLoading(true);
        
        axios.post(`${process.env.REACT_APP_URL}/analyze_image`, { image: base64Image }, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                console.log(response.data);
                setResponse(response.data.content);
                setLoading(false);
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
                        <div className='my-10 hover:bg-[#D39200]'>
                            <button onClick={capture}>キャプチャ</button>
                        </div>
                        
                    </>
                )
                
                }
                {capturedImage && ( 
                    <div>
                        <img src={capturedImage} alt="Captured" />
                        <Loading isLoading={loading} />
                    </div>
                )}
            </div>
            <Chat response={response} />
        </>
    );
};

export default WebCamera;
