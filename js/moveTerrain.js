import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

let defaultCamPos = [20, 0, 13];
let myCamera;
let model;

// Init 3D scene
function initThreeJSScene() {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const loader = new GLTFLoader();
  loader.load(
    "models/bb8_droid.glb",
    function (gltf) {
      const model = gltf.scene;
      model.rotation.set(Math.PI / 2, -Math.PI / 2, 0);
      scene.add(model);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  const geometry = new THREE.PlaneGeometry(30, 30);
  const material = new THREE.MeshBasicMaterial({
    color: 0x151515,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  const hlight = new THREE.AmbientLight(0x404040, 10);
  scene.add(hlight);

  camera.up.set(0, 0, 1);
  camera.position.set(defaultCamPos[0], defaultCamPos[1], defaultCamPos[2]);
  camera.lookAt(0, 0, 0);

  // const controls = new OrbitControls( camera, renderer.domElement );
  // controls.addEventListener('change', () => {
  //     renderer.render( scene, camera )
  // });

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  return new Camera3D(camera);
}

class Camera3D{
    constructor(camera){
        this.threeJsCamera = camera
    }

    getLocation(){
        return [
            this.threeJsCamera.position.x,
            this.threeJsCamera.position.y,
            this.threeJsCamera.position.z,
          ];
    }

    setLocation(vector3D){
        this.threeJsCamera.position.set(vector3D[0], vector3D[1], vector3D[2]);
    }

    lookAt(vector3D){
        this.threeJsCamera.lookAt(vector3D[0], vector3D[1], vector3D[2]);
    }
}

// Util functions
function argMax(array) {
  return [].map
    .call(array, (x, i) => [x, i])
    .reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}
function rotateVectorAroundAxis(vector, axis, angle) {
  const axisNorm = Math.sqrt(axis[0] ** 2 + axis[1] ** 2 + axis[2] ** 2);
  const normalizedAxis = [
    axis[0] / axisNorm,
    axis[1] / axisNorm,
    axis[2] / axisNorm,
  ];
  const cosTheta = Math.cos(angle);
  const sinTheta = Math.sin(angle);
  const crossProduct = [
    normalizedAxis[1] * vector[2] - normalizedAxis[2] * vector[1],
    normalizedAxis[2] * vector[0] - normalizedAxis[0] * vector[2],
    normalizedAxis[0] * vector[1] - normalizedAxis[1] * vector[0],
  ];
  const dotProduct =
    normalizedAxis[0] * vector[0] +
    normalizedAxis[1] * vector[1] +
    normalizedAxis[2] * vector[2];

  const rotatedVector = [
    vector[0] * cosTheta +
      crossProduct[0] * sinTheta +
      normalizedAxis[0] * dotProduct * (1 - cosTheta),
    vector[1] * cosTheta +
      crossProduct[1] * sinTheta +
      normalizedAxis[1] * dotProduct * (1 - cosTheta),
    vector[2] * cosTheta +
      crossProduct[2] * sinTheta +
      normalizedAxis[2] * dotProduct * (1 - cosTheta),
  ];
  return rotatedVector;
}
function extendVector3D(vector3D, lengthToAdd) {
  const magnitude = Math.sqrt(
    vector3D[0] * vector3D[0] +
      vector3D[1] * vector3D[1] +
      vector3D[2] * vector3D[2]
  );
  const directionCosines = [
    vector3D[0] / magnitude,
    vector3D[1] / magnitude,
    vector3D[2] / magnitude,
  ];
  const newMagnitude = Math.max(magnitude + lengthToAdd, 0);
  const extendedVector = [
    newMagnitude * directionCosines[0],
    newMagnitude * directionCosines[1],
    newMagnitude * directionCosines[2],
  ];
  return extendedVector;
}

// The control system is a big state machine controlled by hand gestures
let previousCategory = "Default";
let camAlterMiddleWare;

// On every frame that contains a hand
function onResults(results) {
  if (results.multiHandLandmarks.length > 0) {
    // This demo is for one hand gestures
    const landmarks = results.multiHandLandmarks[0];

    // Detect pose with pretrained tensorflow.js model
    const input = tf.tensor2d([
      landmarks.flatMap((landmark) => {
        const { x, y, z } = landmark;
        return [x, y, z];
      }),
    ]);
    const predicted_pose = argMax(model.predict(input).dataSync());
    const category = ["Rock", "Paper", "Scissors", "Pinch", "Ok", "Spock"][
      predicted_pose
    ];

    console.log(`Detected: ${category}`);

    // Alter camera with pose and landmark information

    if (previousCategory !== category) {
      switch (category) {
        case "Pinch":
          camAlterMiddleWare = dragMode(landmarks, myCamera);
          break;
        case "Rock":
          camAlterMiddleWare = zoomMode(landmarks, myCamera);
          break;
        default:
          camAlterMiddleWare = undefined;
          break;
      }
    }

    if (camAlterMiddleWare !== undefined) {
      camAlterMiddleWare(landmarks, myCamera);
    }

    previousCategory = category;
  }
}

// For each mode there should be a function with the same parameters
function dragMode(initLandMark, camera3D) {
  const tiltOrigin = [initLandMark[9].x, initLandMark[9].y, initLandMark[9].z]; //middle of the hand
  const camBeforeTilt = camera3D.getLocation();
  return (landmarks, camera3D) => {
    const [x, y, z] = tiltOrigin;
    const [x_c, y_c, z_c] = [landmarks[9].x, landmarks[9].y, landmarks[9].z]; // middle of the hand
    const dx = 2.7 * (x_c - x); // proportional to horizontal rotation
    const dy = -2.7 * (y_c - y); // proportional to lateral rotation

    let camPosVector = camera3D.getLocation();

    const axis = camPosVector[0] > 0 ? [0, 1, 0] : [0, -1, 0];
    camPosVector = rotateVectorAroundAxis(camBeforeTilt, axis, dy);
    camPosVector = rotateVectorAroundAxis(camPosVector, [0, 0, 1], dx);

    // Can't go "underground"
    if (camPosVector[2] < 1) {
      camPosVector[2] = 1;
    }

    camera3D.setLocation(camPosVector)
    camera3D.lookAt([0,0,0])
  };
}

function zoomMode(initLandMark, camera3D) {
  const referencePoint = [
    initLandMark[9].x,
    initLandMark[9].y,
    initLandMark[9].z,
  ]; // middle of the hand
  const camBeforeTransform = camera3D.getLocation();
  return (landmarks, camera3D) => {
    const [x, y, z] = [landmarks[9].x, landmarks[9].y, landmarks[9].z]; // middle of the hand
    const [x_r, y_r, z_r] = referencePoint;
    const camPosVector = extendVector3D(camBeforeTransform, 20 * (x - x_r));
    camera3D.setLocation(camPosVector)
    camera3D.lookAt([0,0,0])
  };
}

const hands = new Hands({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  },
});
hands.setOptions({
  maxNumHands: 1, // the model provided can only handle 1 hand at a time
  modelComplexity: 1, // can be reduced to 0 for performance
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});
hands.onResults(onResults);
const videoElement = document.getElementsByClassName("input_video")[0];
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: 1024,
  height: 720,
});

console.log("Loading model...");
model = await tf.loadLayersModel("web_model/model.json");
console.log("Model loaded!");

const cameraStarted = camera.start();

console.log("Initializing scene...");
myCamera = initThreeJSScene();
console.log("Scene initialized!");

// Stop loadingscreen when everything is loaded
const videoStreamStarted = new Promise((resolve) =>
  videoElement.addEventListener("loadedmetadata", resolve)
);
const minimalTimeout = new Promise((r) => setTimeout(r, 2000));
Promise.all([cameraStarted, minimalTimeout, videoStreamStarted]).then(() => {
  document.getElementById("preloader").style.display = "none";
});
