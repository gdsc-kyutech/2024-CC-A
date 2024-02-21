import ImageTransfer from "./ImageTransfer";
import Ping from "./Ping";
import WebCamera from "./WebCamera";
import iconImage from "../icon.png"

export default function Home() {
    return (
      <div>
        <div className="mb-10 mt-20 relative">
          <img src={iconImage} alt="" className="w-40 my-2 mx-auto"/>
          <div className="text-[40px] font-semibold absolute left-1/2 transform -translate-x-1/2 bottom-[-32.5px] text-[#333333]">EnviroScope</div>
        </div>
        <div>
            <ImageTransfer />
            <WebCamera />
        </div>
        {/* <Ping /> */}
      </div>
    );
}
  

