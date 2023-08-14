export const VIDEO_SIZE = {
    '640 X 480': {width: 640, height: 480},
    '640 X 360': {width: 640, height: 360},
    '360 X 270': {width: 360, height: 270}
};
export class Camera {
    static async setup(v: HTMLVideoElement) {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error(
                'Browser API navigator.mediaDevices.getUserMedia not available');
        }

        const videoConfig = {
            'audio': false,
            'video': {
                facingMode: 'user',
                // Only setting the video to a specified size for large screen, on
                // mobile devices accept the default size.
                width: VIDEO_SIZE['360 X 270'].width,
                height: VIDEO_SIZE['360 X 270'].height,
                frameRate: {
                    ideal: 60,
                }
            }
        };

        const stream = await navigator.mediaDevices.getUserMedia(videoConfig);

        const camera = new Camera();
        v.srcObject = stream;

        await new Promise((resolve) => {
           v.onloadedmetadata = () => {
                resolve(v);
            };
        });

        await v.play();

        const videoWidth = v.videoWidth;
        const videoHeight = v.videoHeight;
        // Must set below two lines, otherwise video element doesn't show.
        v.width = videoWidth;
        v.height = videoHeight;

        // const canvasContainer = document.querySelector('.canvas-wrapper');
        // canvasContainer.style = `width: ${videoWidth}px; height: ${videoHeight}px`;

        return camera;
    }
}
