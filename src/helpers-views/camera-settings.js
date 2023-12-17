import { device } from "tabris";

export default function cameraSettings(index){

     // Default is selfie camera but you can easely set it to back
    const camera = device.cameras[index];

    // camera.captureResolution = {width: 1250, height: 1250};

    camera.priority = "balanced";

    // console.log(camera.availableCaptureResolutions)

    return camera;

}
