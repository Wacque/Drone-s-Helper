import GlassmorphismCard from "./GlassmorphismCard.tsx";
import Scroll from "./Scroll.tsx";
import StreamItem from "./StreamItem.tsx";
import {useEffect, useRef, memo, useContext} from "react";
import axios from "axios";
import {AppContext} from "../provider/AppProvider.tsx";

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

const MainContent = memo(function ({video}: { video: HTMLVideoElement }) {
        const {activities, setActivities} = useContext(AppContext)
        // const [activity, setActivity] = useState<Array<ActivityItem>>([]);
        const canvasRecognition = useRef<HTMLCanvasElement>(null);

        useEffect(() => {
            if (recognizerInterval !== null) {
                clearInterval(recognizerInterval)
                recognizerInterval = null
            }

            recognizerInterval = setInterval(function () {
                recognizer()
            }, 3000)
        }, []);

        function recognizer() {
            // 1. 获取 canvas 元素和图像数据
            if (!recognizerCanvas) {
                recognizerCanvas = document.getElementById("outputForRecognition") as HTMLCanvasElement;
            }

            if (!recognizerCtx) {
                recognizerCtx = recognizerCanvas.getContext("2d")!;
            }

            recognizerCanvas.width = video.width;
            recognizerCanvas.height = video.height;

            recognizerCtx = recognizerCanvas.getContext("2d")!;
            recognizerCtx.drawImage(video, 0, 0, recognizerCanvas.width, recognizerCanvas.height);

            recognizerCanvas.toBlob(async function (blob) {
                // 2. 使用 FormData 上传图像
                const formData = new FormData();
                formData.append('image', blob!, `${new Date().getTime()}.jpeg`);

                try {
                    const res = await axios.post('/api', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Accept': 'application/json'
                        }
                    })

                    const label = res.data["label"]

                    if (label) {
                        setActivities(function (pre) {
                            if (pre.length) {
                                const lastActivity = pre[pre.length - 1]
                                if (lastActivity.label === label) {
                                    console.log(lastActivity)
                                    const newTimestamp = new Date().getTime()
                                    lastActivity.duration = lastActivity.duration + (newTimestamp - lastActivity.timestamp)
                                    lastActivity.id = newTimestamp

                                    return [...pre.slice(0, pre.length - 1), lastActivity]
                                }
                            }

                            return [...pre, new ActivityItem(label, 0)]
                        })

                        setTimeout(function () {
                            console.log(activities)
                        }, 2000)
                    }
                } catch (e) {
                    console.log(e)
                } finally {
                    console.log("finally")
                }
            }, 'image/jpeg', 0.95);
        }

        return <div className={"main absolute w-full left-0 top-0 h-full z-[10]"}>
            {/*<img className={'w-full block'} src={Cover} alt=""/>*/}
            <canvas width={video.width} height={video.height} className={"absolute left-[-3000px]"}
                    id={"outputForRecognition"} ref={canvasRecognition}/>
            <div className={'fixed grid grid-rows-1 gap-[20px] top-[30px] right-[30px]'}>
                <GlassmorphismCard title={"HEALTH WARNING"}>
                    <div className={'w-[30vw] h-[26vh] overflow-y-scroll text-white drop-shadow-sm'}>
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
                    <GlassmorphismCard>
                        <div className={"h-[26vh]  w-full"}>
                            Pixie
                            The Frontend Unicorn The Frontend Unicorn
                        </div>
                    </GlassmorphismCard>
                    <GlassmorphismCard>
                        <div className={"h-[26vh] w-full"}>
                            Pixie
                            The Frontend Unicorn The Frontend Unicorn
                        </div>
                    </GlassmorphismCard>
                </div>
            </div>
        </div>
    }
)

export default MainContent
