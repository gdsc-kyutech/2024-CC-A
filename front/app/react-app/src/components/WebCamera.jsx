import React from 'react';
import Webcam from 'react-webcam';

const WebCamera = () => {
    const webcamRef = React.useRef(null);
    const [isCameraRunning, setIsCameraRunning] = React.useState(false); // Set the default value of isCameraRunning to false

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc);
    }, [webcamRef]);

    const toggleCamera = React.useCallback(() => {
        setIsCameraRunning(prevState => !prevState);
    }, []);



    return (
        <>
            <button onClick={toggleCamera}>Toggle Camera</button>
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
                            <button onClick={capture}>Capture</button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default WebCamera;
