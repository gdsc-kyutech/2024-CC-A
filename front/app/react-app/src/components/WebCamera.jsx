import React from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import Chat from './Chat';
import Loading from './Loading';
import cameraIcon from '../camera-icon.png'
import shutterIcon from '../shutter-icon.png'

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
        <div className='bg-[#D39200] mt-20 mx-6 rounded-[7.5px] '>
            <button onClick={toggleCamera} className='text-white  p-3 w-40 rounded-lg font-semibold tracking-widest relative'>
                <div>Camera</div>
                <img src={cameraIcon} alt="" className='w-4 absolute left-[15px] top-[15px]'/>
            </button>
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
                            className='w-full rounded-[5px] '
                        />
                        <div className='my-5 pb-5'>
                            <button onClick={capture}><img src={shutterIcon} alt="" className='w-10'/></button>
                        </div>
                        
                    </>
                )
                
                }
                {capturedImage && ( 
                    <>
                    <div className='pb-5'> 
                        <img src={capturedImage} alt="Captured"/>
                    </div>
                    </>
                )}
            </div>
        </div>
        <Loading isLoading={loading} />
        <Chat response={response} />
        </>
    );
};

export default WebCamera;
