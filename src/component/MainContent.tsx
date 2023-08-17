import GlassmorphismCard from "./GlassmorphismCard.tsx";
import Scroll from "./Scroll.tsx";
import StreamItem from "./StreamItem.tsx";
import {useEffect, useRef, memo, useContext} from "react";
import axios from "axios";
import {AppContext} from "../provider/AppProvider.tsx";
import WarningItem from "./WarningItem.tsx";
import VideoContainer from "./VideoContainer.tsx";
import ActivitiesTreeMap from "./ActivitiesTreeMap.tsx";
import HealthRecord from "./HealthRecord.tsx";
import Icon from "../assets/u16.svg"
import Setting from '../assets/u14.svg'

let recognizerCanvas: HTMLCanvasElement
let recognizerCtx: CanvasRenderingContext2D
let recognizerInterval: NodeJS.Timer | null = null

export class ActivityItem {
    label: string = ""
    timestamp: number = 0
    id: number = 0
    duration: number = 0

    constructor(label: string, duration: number) {
        this.label = label
        this.timestamp = new Date().getTime()
        this.id = new Date().getTime()
        this.duration = duration
    }
}

const MainContent = memo(({video}: { video: HTMLVideoElement }) => {
        const {activities, appendActivity, warning, showVideoLabel} = useContext(AppContext)
        // const [activity, setActivity] = useState<Array<ActivityItem>>([]);
        const canvasRecognition = useRef<HTMLCanvasElement>(null);

        useEffect(() => {
            if (recognizerInterval !== null) {
                clearInterval(recognizerInterval)
                recognizerInterval = null
            }

            recognizerInterval = setInterval(function () {
                recognizer()
            }, 2000)
        }, []);

        function recognizer() {
            // 1. 获取 canvas 元素和图像数据
            if (!recognizerCanvas) {
                recognizerCanvas = document.getElementById("outputForRecognition") as HTMLCanvasElement;
            }

            if (!recognizerCtx) {
                recognizerCtx = recognizerCanvas.getContext("2d")!;
            }

            recognizerCanvas.width = parseInt( video.style.width);
            recognizerCanvas.height = parseInt(video.style.height);

            recognizerCtx = recognizerCanvas.getContext("2d")!;
            recognizerCtx.drawImage(video, 0, 0, recognizerCanvas.width, recognizerCanvas.height);

            recognizerCanvas.toBlob(async function (blob) {
                // 2. 使用 FormData 上传图像
                const formData = new FormData();
                console.log(blob)
                formData.append('image', blob!, `${new Date().getTime()}.jpeg`);

                try {
                    // https://7a50-103-43-85-174.ngrok-free.app
                    const res = await axios.post('/', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Accept': 'application/json'
                        }
                    })

                    const label = res.data["label"]

                    if (label) {
                        appendActivity(label)
                    }
                } catch (e) {
                    console.log(e)
                } finally {
                    console.log("finally")
                }
            }, 'image/jpeg', 0.95);
        }

        return <div className={"main absolute w-full left-0 top-0 h-full z-[10]"}>
            <canvas width={video.width} height={video.height} className={"absolute left-[-3000px]"}
                    id={"outputForRecognition"} ref={canvasRecognition}/>
            {showVideoLabel && <VideoContainer/>}
            <a href="/">
                <div className={'flex ml-[4px] mt-[4px] items-center '}>
                    <img src={Icon} alt=""/>
                    <div style={{fontWeight: 500, textShadow: "0 0 3px rgba(0,0,0,.5)"}} className={'text-[30px] text-thePrimary'}>GoodWorkingDays</div>
                </div>
            </a>
            <div className={'fixed left-[14px] bottom-[30px] cursor-pointer'}>
                <img src={Setting} alt=""/>
            </div>


            <div className={'fixed grid grid-rows-1 gap-[20px] top-[20px] right-[20px]'}>
                <GlassmorphismCard title={"HEALTH WARNING"}>
                    <div className={'w-[30vw] h-[26vh] overflow-y-scroll text-white drop-shadow-sm'}>
                        <Scroll list={
                            [...warning.map((item) => <div className={'mb-[6px]'}><WarningItem key={item.timestamp} item={item}/></div>)]
                        }/>
                    </div>
                </GlassmorphismCard>
                <GlassmorphismCard title={"STREAM"}>
                    <div className={'w-[30vw] h-[30vh] text-white drop-shadow-sm'}>
                        <Scroll list={[
                            ...activities.map((item) => <StreamItem key={item.id} activity={item}/>).reverse()
                        ]}/>
                    </div>
                </GlassmorphismCard>
                <div className={"grid grid-cols-2 gap-[20px] w-[30vw] justify-between"}>
                    <GlassmorphismCard title={"TODAY"}>
                        <div className={"h-[22vh]  w-full"}>
                            <ActivitiesTreeMap/>
                        </div>
                    </GlassmorphismCard>
                    <GlassmorphismCard title={"HEALTH RECORD"}>
                        <div className={"h-[22vh] w-full"}>
                           <HealthRecord/>
                        </div>
                    </GlassmorphismCard>
                </div>
            </div>
        </div>
    }
)

export default MainContent
