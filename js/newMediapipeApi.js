// import * as THREE from "three";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// // document.addEventListener("DOMContentLoaded", () => {
// //   console.log("loaded")
// // });

// // Init 3D scene
// function initThreeJSScene(defaultCamPos) {
//   const renderer = new THREE.WebGLRenderer();
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   document.body.appendChild(renderer.domElement);

//   const scene = new THREE.Scene();
//   const camera = new THREE.PerspectiveCamera(
//     75,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
//   );

//   const loader = new GLTFLoader();
//   loader.load(
//     "models/bb8_droid.glb",
//     function (gltf) {
//       const model = gltf.scene;
//       model.rotation.set(Math.PI / 2, -Math.PI / 2, 0);
//       scene.add(model);

//       renderer.render(scene, camera); // not animating
//     },
//     undefined,
//     function (error) {
//       console.error(error);
//     }
//   );

//   const geometry = new THREE.PlaneGeometry(30, 30);
//   const material = new THREE.MeshBasicMaterial({
//     color: 0x151515,
//     side: THREE.DoubleSide,
//   });
//   const plane = new THREE.Mesh(geometry, material);
//   scene.add(plane);

//   const hlight = new THREE.AmbientLight(0x404040, 10);
//   scene.add(hlight);

//   camera.up.set(0, 0, 1);
//   camera.position.set(defaultCamPos[0], defaultCamPos[1], defaultCamPos[2]);
//   camera.lookAt(0, 0, 0);

//   // function animate() {
//   //   requestAnimationFrame(animate);
//   //   renderer.render(scene, camera);
//   // }
//   // animate();

//   renderer.render(scene, camera);

//   return new Camera3D(camera, () => renderer.render(scene, camera));
// }

// class Camera3D {
//   constructor(camera, renderSceneFunc) {
//     this.threeJsCamera = camera;
//     this.renderSceneFunc = renderSceneFunc;

//     this.lookAtVector = [0, 0, 0]; //maybe get this info from camera why is this the default?!
//   }

//   getLocation() {
//     return [
//       this.threeJsCamera.position.x,
//       this.threeJsCamera.position.y,
//       this.threeJsCamera.position.z,
//     ];
//   }

//   setLocation(vector3D) {
//     this.threeJsCamera.position.set(vector3D[0], vector3D[1], vector3D[2]);
//     this.renderSceneFunc()
//   }

//   lookAt(vector3D) {
//     this.threeJsCamera.lookAt(vector3D[0], vector3D[1], vector3D[2]);
//     this.lookAtVector = [...vector3D];
//     this.renderSceneFunc()
//   }

//   getFocusLocation() {
//     return this.lookAtVector;
//   }

//   getGazeDirection(){
//     const cp = this.getLocation();
//     const fp = this.getFocusLocation();
//     return [fp[0] - cp[0], fp[1] - cp[1], fp[2] - cp[2]];
//   }
// }

// // Util functions
// function argMax(array) {
//   return [].map
//     .call(array, (x, i) => [x, i])
//     .reduce((r, a) => (a[0] > r[0] ? a : r))[1];
// }
// function rotateVectorAroundAxis(vector, axis, angle) {
//   const axisNorm = Math.sqrt(axis[0] ** 2 + axis[1] ** 2 + axis[2] ** 2);
//   const normalizedAxis = [
//     axis[0] / axisNorm,
//     axis[1] / axisNorm,
//     axis[2] / axisNorm,
//   ];
//   const cosTheta = Math.cos(angle);
//   const sinTheta = Math.sin(angle);
//   const crossProduct = [
//     normalizedAxis[1] * vector[2] - normalizedAxis[2] * vector[1],
//     normalizedAxis[2] * vector[0] - normalizedAxis[0] * vector[2],
//     normalizedAxis[0] * vector[1] - normalizedAxis[1] * vector[0],
//   ];
//   const dotProduct =
//     normalizedAxis[0] * vector[0] +
//     normalizedAxis[1] * vector[1] +
//     normalizedAxis[2] * vector[2];

//   const rotatedVector = [
//     vector[0] * cosTheta +
//       crossProduct[0] * sinTheta +
//       normalizedAxis[0] * dotProduct * (1 - cosTheta),
//     vector[1] * cosTheta +
//       crossProduct[1] * sinTheta +
//       normalizedAxis[1] * dotProduct * (1 - cosTheta),
//     vector[2] * cosTheta +
//       crossProduct[2] * sinTheta +
//       normalizedAxis[2] * dotProduct * (1 - cosTheta),
//   ];
//   return rotatedVector;
// }
// function extendVector3D(vector3D, lengthToAdd) {
//   const magnitude = Math.sqrt(
//     vector3D[0] * vector3D[0] +
//       vector3D[1] * vector3D[1] +
//       vector3D[2] * vector3D[2]
//   );
//   const directionCosines = [
//     vector3D[0] / magnitude,
//     vector3D[1] / magnitude,
//     vector3D[2] / magnitude,
//   ];
//   const newMagnitude = Math.max(magnitude + lengthToAdd, 0);
//   const extendedVector = [
//     newMagnitude * directionCosines[0],
//     newMagnitude * directionCosines[1],
//     newMagnitude * directionCosines[2],
//   ];
//   return extendedVector;
// }
// function scaleVector(vector3D, length) {
//   const magnitude = Math.sqrt(vector3D[0]**2 + vector3D[1]**2 + vector3D[2]**2);
//   return [length*vector3D[0]/magnitude, length*vector3D[1]/magnitude, length*vector3D[2]/magnitude];
// }
// function addVectors(vector3D_A, vector3D_B) {
//   return [vector3D_A[0] + vector3D_B[0], vector3D_A[1] + vector3D_B[1], vector3D_A[2] + vector3D_B[2]]
// }

// function generateOnResultCallback(camera, model){
//   let previousCategory = "Default";
//   let camAlterMiddleWare;
//   return function onResults(results) {
//     if (results.multiHandLandmarks.length > 0) {
//       // This demo is for one hand gestures
//       const landmarks = results.multiHandLandmarks[0];

//       // Detect pose with pretrained tensorflow.js model
//       const input = tf.tensor2d([
//         landmarks.flatMap((landmark) => {
//           const { x, y, z } = landmark;
//           return [x, y, z];
//         }),
//       ]);
//       const predicted_pose = argMax(model.predict(input).dataSync());
//       // const category = ["Rock", "Paper", "Scissors", "Pinch", "Ok", "Spock"][
//       //   predicted_pose
//       // ];
//       const category = ["Rock", "Paper", "Pinch", "Flower", "Neutral"][
//         predicted_pose
//       ];

//       console.log(`Detected: ${category}`);

//       // Alter camera with pose and landmark information

//       if (previousCategory !== category) {
//         switch (category) {
//           case "Pinch":
//             camAlterMiddleWare = dragCameraMode(landmarks, camera);
//             break;
//           // case "Flower": Not stable yet
//           //   camAlterMiddleWare = dragCameraMode(landmarks, myCamera);
//           //   break;
//           case "Rock":
//             camAlterMiddleWare = zoomMode(landmarks, camera);
//             break;
//           default:
//             camAlterMiddleWare = undefined;
//             break;
//         }
//       }

//       if (camAlterMiddleWare !== undefined) {
//         camAlterMiddleWare(landmarks, camera);
//       }

//       previousCategory = category;
//     }
//   }
// }

// // Try it like this for new camera Mode
// // function dragLandScapeMode(initLandMark, camera3D) {
// //   const tiltOrigin = [initLandMark[9].x, initLandMark[9].y, initLandMark[9].z]; //middle of the hand
// //   const camBeforeTilt = camera3D.getLocation();
// //   return (landmarks, camera3D) => {
// //     const [x, y, z] = tiltOrigin;
// //     const [x_c, y_c, z_c] = [landmarks[9].x, landmarks[9].y, landmarks[9].z]; // middle of the hand
// //     const dx = 2.7 * (x_c - x); // proportional to horizontal rotation
// //     const dy = -2.7 * (y_c - y); // proportional to lateral rotation

// //     let cameraPosVector = camera3D.getLocation();

// //     const axis = camera[0] > 0 ? [0, 1, 0] : [0, -1, 0];
// //     cameraPosVector = rotateVectorAroundAxis(camBeforeTilt, axis, dy);
// //     cameraPosVector = rotateVectorAroundAxis(cameraPosVector, [0, 0, 1], dx);

// //     // Can't go "underground"
// //     if (cameraPosVector[2] < 1) {
// //       cameraPosVector[2] = 1;
// //     }

// //     camera3D.setLocation(cameraPosVector);
// //   };
// // }

// function dragLandScapeMode(initLandMark, camera3D) {
//   const tiltOrigin = [initLandMark[9].x, initLandMark[9].y, initLandMark[9].z]; //middle of the hand
//   const camBeforeTilt = camera3D.getLocation();
//   return (landmarks, camera3D) => {
//     const [x, y, z] = tiltOrigin;
//     const [x_c, y_c, z_c] = [landmarks[9].x, landmarks[9].y, landmarks[9].z]; // middle of the hand
//     const dx = 2.7 * (x_c - x); // proportional to horizontal rotation
//     const dy = -2.7 * (y_c - y); // proportional to lateral rotation

//     let cameraPosVector = camera3D.getLocation();

//     const axis = camera[0] > 0 ? [0, 1, 0] : [0, -1, 0];
//     cameraPosVector = rotateVectorAroundAxis(camBeforeTilt, axis, dy);
//     cameraPosVector = rotateVectorAroundAxis(cameraPosVector, [0, 0, 1], dx);

//     // Can't go "underground"
//     if (cameraPosVector[2] < 1) {
//       cameraPosVector[2] = 1;
//     }

//     camera3D.setLocation(cameraPosVector);
//     camera3D.lookAt(camera3D.getFocusLocation());
//   };
// }

// // For each mode there should be a function with the same parameters
// function dragCameraMode(initLandMark, camera3D) {
//   const tiltOrigin = [initLandMark[8].x, initLandMark[8].y, initLandMark[8].z]; //fingertip
//   let gazeDirectionBeforeTilt = camera3D.getGazeDirection()
//   let prev_dx = 0;
//   let prev_dy = 0;
//   const prevDxList = []
//   const prevDyList = []
//   return (landmarks, camera3D) => {
//     const [x, y, z] = tiltOrigin;
//     const [x_c, y_c, z_c] = [landmarks[8].x, landmarks[8].y, landmarks[8].z]; // fingertip
//     const dx = 2.7 * (x_c - x); // proportional to horizontal rotation
//     const dy = -2.7 * (y_c - y); // proportional to lateral rotation

//     function rotateView(dx, dy){
//       const camPosVector = camera3D.getLocation();
//       let gazeDirection = camera3D.getGazeDirection();

//       const axis = camPosVector[0] > 0 ? [0, 1, 0] : [0, -1, 0];
//       gazeDirection = rotateVectorAroundAxis(gazeDirectionBeforeTilt, axis, dy);
//       //prev_dy = dy;
//       gazeDirection = rotateVectorAroundAxis(gazeDirection, [0, 0, 1], dx);
//       //prev_dx = dx;

//       const newFocusPoint = addVectors(camPosVector, gazeDirection);
//       camera3D.lookAt(newFocusPoint);
//     }

//     //only kálmán szűrő
//     prevDxList.push(dx)
//     prevDyList.push(dy)

//     const smoothingFactor = 8;

//     if (prevDxList.length > smoothingFactor){
//       prevDxList.shift()
//     }

//     if (prevDyList.length > smoothingFactor){
//       prevDyList.shift()
//     }

//     const averageDx = prevDxList.reduce((a, b) => a + b)/prevDxList.length
//     const averageDy = prevDyList.reduce((a, b) => a + b)/prevDyList.length

//     // const xJitter = Math.abs(averageDx-prev_dx);
//     // const yJitter = Math.abs(averageDy-prev_dy);

//     // console.log(xJitter, yJitter)

//     // const yjitterResistance = 0.0005;
//     // const xjitterResistance = 0.0005;

//     // if (xJitter > xjitterResistance && yJitter > yjitterResistance){
//     //   rotateView(dx, dy)
//     // } else if (yJitter > yjitterResistance){
//     //   rotateView(prev_dx, dy)
//     // } else if (xJitter > xjitterResistance){
//     //   rotateView(dx, prev_dy)
//     // }

//     rotateView(averageDx, averageDy);
//   };
// }

// function zoomMode(initLandMark, camera3D) {
//   const referencePoint = [
//     initLandMark[9].x,
//     initLandMark[9].y,
//     initLandMark[9].z,
//   ]; // middle of the hand
//   const camBeforeTransform = camera3D.getLocation();
//   return (landmarks, camera3D) => {
//     const [x, y, z] = [landmarks[9].x, landmarks[9].y, landmarks[9].z]; // middle of the hand
//     const [x_r, y_r, z_r] = referencePoint;
//     const zoomFactor = -20 * (x - x_r);

//     let gazeDirection = camera3D.getGazeDirection();
//     const offset = scaleVector(gazeDirection, zoomFactor);
//     const newCamPos = addVectors(camBeforeTransform, offset);

//     // Can't go "underground"
//     if (newCamPos[2] < 1) {
//       newCamPos[2] = 1;
//     }

//     camera3D.setLocation(newCamPos);
//   };
// }

// function loadModelAsync() {
//   return new Promise(async (resolve, reject) => {
//     try {
//       console.log("loading model")
//       const model = await tf.loadLayersModel("recognition_model/model.json");
//       console.log("model loaded")
//       resolve(model);
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

// function initSceneAsync() {0
//   return new Promise((resolve, reject) => {
//     try {
//       console.log("Initializing scene...");
//       const camera = initThreeJSScene([20, 0, 13]);
//       console.log("Scene initialized!");
//       resolve(camera);
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

// function initMediapipeHandsAsync(camera3D, model) {
//   return new Promise(async (resolve, reject) => {
//     try {
//       console.log("init hands");

//       const hands = new Hands({
//         locateFile: (file) => {
//           return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
//         },
//       });
//       hands.setOptions({
//         maxNumHands: 1, // the model provided can only handle 1 hand at a time
//         modelComplexity: 1, // can be reduced to 0 for performance
//         minDetectionConfidence: 0.5,
//         minTrackingConfidence: 0.5,
//       });
//       hands.onResults(generateOnResultCallback(camera3D, model));

//       const videoElement = document.getElementsByClassName("input_video")[0];
//       const camera = new Camera(videoElement, {
//         onFrame: async () => {
//           await hands.send({ image: videoElement });
//         },
//         width: 1024,
//         height: 720,
//       });

//       const cameraStarted = camera.start();

//       const videoStreamStarted = new Promise((resolve) =>
//         videoElement.addEventListener("playing", resolve)
//       );

//       Promise.all([cameraStarted, videoStreamStarted]).then(() => {
//         console.log("hands loaded");
//         resolve();
//       });

//     } catch (error) {
//       reject(error);
//     }
//   });
// }

// // Stop loadingscreen when everything is loaded
// Promise.all([loadModelAsync(), initSceneAsync()]).then(async (res) => {
//   initMediapipeHandsAsync(res[1], res[0]).then(() => {
//     document.getElementById("preloader").style.display = "none";
//   })
// });

//sadffffffffffffffffffffffffffffffffff

import vision from "https://cdn.skypack.dev/@mediapipe/tasks-vision@latest";
const { HandLandmarker, FilesetResolver } = vision;

let handLandmarker = undefined;
let webcamRunning = false;
const videoHeight = "360px";
const videoWidth = "480px";

// Before we can use HandLandmarker class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment to
// get everything needed to run.
// async function runDemo() {
//   const vision = await FilesetResolver.forVisionTasks(
//     "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
//   );
//   handLandmarker = await HandLandmarker.createFromOptions(vision, {
//     baseOptions: {
//       modelAssetPath: `https://storage.googleapis.com/mediapipe-assets/hand_landmarker.task`
//     },
//     runningMode: "IMAGE",
//     numHands: 2
//   });
// }
// runDemo();

function loadHandsAsync() {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("loading hands");

      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
      handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `app/shared/models/hand_landmarker.task`, //https://storage.googleapis.com/mediapipe-assets/hand_landmarker.task
        },
        runningMode: "VIDEO",
        numHands: 1,
      });

      console.log("hands loaded");
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

loadHandsAsync().then(() => {
  const video = document.getElementById("webcam");
  const canvasElement = document.getElementById("output_canvas");
  const canvasCtx = canvasElement.getContext("2d");

  document.getElementById("preloader").style.display = "none";

  // Check if webcam access is supported.
  function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  if (hasGetUserMedia()) {
    // Activate the webcam stream.
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then(function (stream) {
        video.srcObject = stream;
        video.addEventListener("loadeddata", predictWebcam);
      });
  } else {
    console.log("Webcam not supported!");
  }

  async function predictWebcam() {
    canvasElement.style.height = videoHeight;
    video.style.height = videoHeight;
    canvasElement.style.width = videoWidth;
    video.style.width = videoWidth;

    let nowInMs = Date.now();
    const results = handLandmarker.detectForVideo(video, nowInMs);
  
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    if (results.landmarks) {
      for (const landmarks of results.landmarks) {
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 5,
        });
        drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 2 });
      }
    }
    canvasCtx.restore();
  
    // Call this function again to keep predicting when the browser is ready.
    window.requestAnimationFrame(predictWebcam);
  }
});


