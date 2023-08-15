import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
// Register one of the TF.js backends.
import '@tensorflow/tfjs-backend-webgl';
// import '@tensorflow/tfjs-backend-wasm';
import {Camera} from "./camera.ts";
import {RendererCanvas2d} from './renderer_canvas2d.ts'
import {STATE} from "./params.ts";
import {PoseDetector} from "@tensorflow-models/pose-detection/dist/pose_detector";
import "./index.css"
import "./App.css"
import GlassmorphismCard from "./component/GlassmorphismCard.tsx";
import {useEffect} from "react";
import Icon from './assets/react.svg'

export async function setBackendAndEnvFlags() {
    const flagConfig = {
        WEBGL_CPU_FORWARD: true,
        WEBGL_FLUSH_THRESHOLD: -1,
        WEBGL_FORCE_F16_TEXTURES: false,
        WEBGL_PACK: true,
        WEBGL_RENDER_FLOAT32_CAPABLE: true,
        WEBGL_VERSION: 2
    }
    tf.env().setFlags(flagConfig);

    // tfjs-webgl
    await resetBackend("webgl");
}

const resetBackend = async function (backendName: string) {
    const ENGINE = tf.engine();
    if (!(backendName in ENGINE.registryFactory)) {
        if (backendName === 'webgpu') {
            // alert('webgpu backend is not registered. Your browser may not support WebGPU yet. To test this backend, please use a supported browser, e.g. Chrome canary with --enable-unsafe-webgpu flag');
            // STATE.backend = !!STATE.lastTFJSBackend ? STATE.lastTFJSBackend : 'tfjs-webgl';
            // showBackendConfigs();
            return;
        } else {
            throw new Error(`${backendName} backend is not registered.`);
        }
    }

    if (backendName in ENGINE.registry) {
        const backendFactory = tf.findBackendFactory(backendName);
        tf.removeBackend(backendName);
        tf.registerBackend(backendName, backendFactory);
    }

    await tf.setBackend(backendName);
}

let renderer: RendererCanvas2d
let detector: PoseDetector
let video: HTMLVideoElement

async function renderPrediction() {
    await renderResult();

    requestAnimationFrame(renderPrediction);
}

async function renderResult() {
    const poses = await detector.estimatePoses(video, {maxPoses: STATE.modelConfig.maxPoses, flipHorizontal: false});
    const rendererParams = [video, poses, false];
    renderer.draw(rendererParams);
}

function App() {

    useEffect(() => {
        Notification.requestPermission().then((result) => {
            console.log(result);
        });

        setTimeout(() => {
            const n = new Notification("My Great Song");
            console.log('-===-------------------')
        }, 5000)
    }, [])


    async function initVideo(v: HTMLVideoElement | null) {
        if (v !== null) {
            video = v
            await Camera.setup(video)
            await setBackendAndEnvFlags()

            const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER};
            detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);

            const canvas = document.getElementById('output') as HTMLCanvasElement;

            if (canvas) {
                canvas.width = video.width;
                canvas.height = video.height;
            }

            renderer = new RendererCanvas2d(canvas);

            await renderPrediction()
        }
    }

    return (
        <>
            <canvas id="output"></canvas>
            <video className={'absolute left-[-9999px] top-[-9999px]'} ref={(v) => initVideo(v)}></video>
            <div id="scatter-gl-container"></div>
            <div className={"main absolute w-full left-0 top-0 h-full z-[10]"}>
                <div className={'fixed top-[30px] right-[30px]'}>
                    <GlassmorphismCard>
                        <div className={'w-[300px] p-[20px] h-[600px] text-white drop-shadow-sm'}>
                            Pixie
                            The Frontend Unicorn
                        </div>
                    </GlassmorphismCard>
                </div>
            </div>
        </>
    )
}

export default App
