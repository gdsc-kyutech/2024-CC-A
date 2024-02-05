import ImageTransfer from "./ImageTransfer";
import Ping from "./Ping";
import WebCamera from "./WebCamera";

export default function Home() {
    return (
      <div>
        <h1 className="mt-20">HOME</h1>
        <div>
            <ImageTransfer />
            <Ping />
            <WebCamera />
        </div>
      </div>
    );
}
  

