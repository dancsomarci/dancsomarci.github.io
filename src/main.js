// import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// let camPos = [20, 0, 13]

// function initThreeJSScene(){
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize( window.innerWidth, window.innerHeight );
//     document.body.appendChild( renderer.domElement );
    
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
//     const loader = new GLTFLoader();
//     loader.load( 'models/bb8_droid.glb', function ( gltf ) {
//         const model = gltf.scene;
//         model.rotation.set(Math.PI/2,-Math.PI/2,0)
//         scene.add( model );
    
//     }, undefined, function ( error ) {
    
//         console.error( error );
    
//     } );

//     loader.load( 'models/bb8_droid.glb', function ( gltf ) {
//         const model = gltf.scene;
//         model.rotation.set(Math.PI/2,-Math.PI/2,0)
//         model.position.set(-10, -10, 0)
//         scene.add( model );
    
//     }, undefined, function ( error ) {
    
//         console.error( error );
    
//     } );

//     const geometry = new THREE.PlaneGeometry( 100, 100 );
//     const material = new THREE.MeshBasicMaterial( {color: 0x151515, side: THREE.DoubleSide} );
//     const plane = new THREE.Mesh( geometry, material );
//     scene.add( plane );

//     const axesHelper = new THREE.AxesHelper( 5 );
//     axesHelper.setColors(new THREE.Color("red"), new THREE.Color("green"), new THREE.Color("blue"))
//     axesHelper.position.set(-10, 10, 0)
//     scene.add( axesHelper );
    
//     const hlight = new THREE.AmbientLight (0x404040,10);
//     scene.add(hlight);
//     const directionalLight = new THREE.DirectionalLight(0xffffff,1);
//     directionalLight.position.set(0,1,0);
//     directionalLight.castShadow = true;
//     scene.add(directionalLight);
//     const light = new THREE.PointLight(0xc4c4c4,1);
//     light.position.set(0,300,500);
//     scene.add(light);
//     const light2 = new THREE.PointLight(0xc4c4c4,1);
//     light2.position.set(500,100,0);
//     scene.add(light2);
//     const light3 = new THREE.PointLight(0xc4c4c4,1);
//     light3.position.set(0,100,-500);
//     scene.add(light3);
//     const light4 = new THREE.PointLight(0xc4c4c4,1);
//     light4.position.set(-500,300,500);
//     scene.add(light4);

//     camera.up.set(0,0,1);
//     camera.position.set(camPos[0], camPos[1], camPos[2]);
//     camera.lookAt(0,0,0)
    
//     // const controls = new OrbitControls( camera, renderer.domElement );
//     // controls.addEventListener('change', () => {
//     //     renderer.render( scene, camera )
//     //     console.log(`campos: ${camera.position.x} ${camera.position.y} ${camera.position.z}`)
//     // });

//     function animate() {
//         requestAnimationFrame( animate );
//         renderer.render( scene, camera );
//     }
//     animate();

//     return (x, y, z) =>{
//         camera.position.set( x, y, z );
//         camera.lookAt(0,0,0);
//         //controls.update();
//     }
// }

// let setCamera;


// let model;
// const categories = ["Rock", "Paper", "Scissors", "Pinch", "Ok", "Spock"]
// function argMax(array) {
//     return [].map.call(array, (x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
// }
// function rotateVectorAroundAxis(vector, axis, angle) {
//     // Normalize the axis vector
//     const axisNorm = Math.sqrt(axis[0]**2 + axis[1]**2 + axis[2]**2);
//     const normalizedAxis = [axis[0]/axisNorm, axis[1]/axisNorm, axis[2]/axisNorm];
  
//     // Compute the sine and cosine of the angle
//     const cosTheta = Math.cos(angle);
//     const sinTheta = Math.sin(angle);
  
//     // Compute the cross product of the axis vector and the input vector
//     const crossProduct = [
//       normalizedAxis[1]*vector[2] - normalizedAxis[2]*vector[1],
//       normalizedAxis[2]*vector[0] - normalizedAxis[0]*vector[2],
//       normalizedAxis[0]*vector[1] - normalizedAxis[1]*vector[0]
//     ];
  
//     // Compute the dot product of the axis vector and the input vector
//     const dotProduct = normalizedAxis[0]*vector[0] + normalizedAxis[1]*vector[1] + normalizedAxis[2]*vector[2];
  
//     // Compute the rotated vector
//     const rotatedVector = [
//       vector[0]*cosTheta + crossProduct[0]*sinTheta + normalizedAxis[0]*dotProduct*(1-cosTheta),
//       vector[1]*cosTheta + crossProduct[1]*sinTheta + normalizedAxis[1]*dotProduct*(1-cosTheta),
//       vector[2]*cosTheta + crossProduct[2]*sinTheta + normalizedAxis[2]*dotProduct*(1-cosTheta)
//     ];
  
//     // Return the rotated vector
//     return rotatedVector;
//   }
  
// function getPerpendicularVector(vector1, vector2) {
//     const [x1, y1, z1] = vector1;
//     const [x2, y2, z2] = vector2;
//     const crossProduct = [    y1 * z2 - z1 * y2,    z1 * x2 - x1 * z2,    x1 * y2 - y1 * x2  ];
//     const magnitude = Math.sqrt(crossProduct[0] ** 2 + crossProduct[1] ** 2 + crossProduct[2] ** 2);
//     return [crossProduct[0] / magnitude, crossProduct[1] / magnitude, crossProduct[2] / magnitude];
// }
// function extendVector3D(vector3D, lengthToAdd) {
//     const magnitude = Math.sqrt(vector3D[0] * vector3D[0] + vector3D[1] * vector3D[1] + vector3D[2] * vector3D[2]);
//     const directionCosines = [vector3D[0] / magnitude, vector3D[1] / magnitude, vector3D[2] / magnitude];
//     const newMagnitude = Math.max(magnitude + lengthToAdd, 0);
//     const extendedVector = [newMagnitude * directionCosines[0], newMagnitude * directionCosines[1], newMagnitude * directionCosines[2]];
//     return extendedVector;
// }

// let mode = "Default"
  
// let tiltMode = false
// let tiltOrigin;
// let camBeforeTilt;

// let modeFunctions = []

// // Every frame
// function onResults(results) {
//     let predicted_pose = -1
//     let finger_tip
//     let thumb_tip;
//     let middle_of_hand;
//     if (results.multiHandLandmarks) {
//         for (const landmarks of results.multiHandLandmarks) {
//             const temp = []
//             for (const landmark of landmarks) {
//                 const {x, y, z} = landmark
//                 temp.push(x, y, z)
//             }
//             const input = tf.tensor2d([temp])
//             predicted_pose = argMax(model.predict(input).dataSync())
//             finger_tip = [landmarks[8].x, landmarks[8].y, landmarks[8].z]
//             thumb_tip = [landmarks[4].x, landmarks[4].y, landmarks[4].z]
//             middle_of_hand = [landmarks[9].x, landmarks[9].y, landmarks[9].z]
//         }
//     }
//     let category
//     if (predicted_pose === -1){
//         category = "Nothing"
//     } else {
//         category = categories[predicted_pose]
//     }

//     console.log(`Detected: ${category}`)

//     // Demo 1 - Rock zoom pull left to right
//     //
//     // if (category == "Rock"){
//     //     let [x_f, y_f, z_f] = finger_tip
//     //     let [x_t, y_t, z_t] = thumb_tip
        
//     //     const zoomFactor = z_f * -10
//     //     camPos[1] = +20*x_f
//     //     camPos[2] = -20*x_f

//     //     const [x, y, z] = camPos

//     //     setCamera(x, y, z)
//     //     //console.log(`Setting camera to: x=${x}, y=${y}, z=${z}`)
//     // }

//     // Demo 2 - Rock pinch move thumb index distance
//     //
//     // if (category != "Nothing"){
//     //     let [x_f, y_f, z_f] = finger_tip
//     //     let [x_t, y_t, z_t] = thumb_tip
//     //     const zoomFactor = Math.sqrt((x_t-x_f)*(x_t-x_f) + (y_t-y_f)*(y_t-y_f)) * 2
//     //     camPos[1] = +20*(1 - zoomFactor)
//     //     camPos[2] = -20*(1 - zoomFactor)
//     //     const [x, y, z] = camPos
//     //     setCamera(x, y, z)
//     // }

//     // Demo 3 - drag movement with static zoom
//     if (!tiltMode && (category == "Pinch")){
//         tiltMode = true
//         tiltOrigin = middle_of_hand
//         camBeforeTilt = camPos
//     } else if (tiltMode && (category == "Pinch")){
//         // These are in finger coordinates
//         let [x, y, z] = tiltOrigin
//         let [x_c, y_c, z_c] = middle_of_hand
//         let dx = 2.7*(x_c-x); // proportional to horizontal rotation
//         let dy = -2.7*(y_c-y); // proportional to lateral rotation

//         const axis = camPos[0] > 0 ? [0,1,0] : [0,-1,0]
//         camPos = rotateVectorAroundAxis(camBeforeTilt, axis, dy)
//         camPos = rotateVectorAroundAxis(camPos, [0,0,1], dx)

//         if (camPos[2] < 1){
//             camPos[2] = 1
//         }
//     } else{
//         tiltMode = false
//         tiltOrigin = undefined
//         camBeforeTilt = undefined
//     }

//     // zoom in
//     if (category == "Rock"){
//         camPos = extendVector3D(camPos, -0.5)
//     }

//     // zoom out
//     if (category == "Ok"){
//         camPos = extendVector3D(camPos, 0.5)
//     }

//     setCamera(camPos[0], camPos[1], camPos[2])

//     // Drag around with dynamic zoom mode
//     // First step is mode selection
//     // if (category == "Paper"){ // reset mode
//     //     mode == "Default"
//     // }

//     // if (mode == "Default"){
//     //     if (category == "Pinch"){
//     //         mode = "Drag"
//     //     } else if (category == "Rock"){
//     //         mode = "Zoom"
//     //     }
//     // }
    

//     // if (mode == "Drag"){
//     //     modeFunctions = dragMode()
//     // }

//     // function dragMode(){
//     //     const middleware = () => {
//     //         if (!tiltMode){
//     //             tiltMode = true
//     //             tiltOrigin = middle_of_hand
//     //             camBeforeTilt = camPos
//     //         } else if (tiltMode){
//     //             // These are in finger coordinates
//     //             let [x, y, z] = tiltOrigin
//     //             let [x_c, y_c, z_c] = middle_of_hand
//     //             let dx = 2.7*(x_c-x); // proportional to horizontal rotation
//     //             let dy = -2.7*(y_c-y); // proportional to lateral rotation
        
//     //             const axis = camPos[0] > 0 ? [0,1,0] : [0,-1,0]
//     //             camPos = rotateVectorAroundAxis(camBeforeTilt, axis, dy)
//     //             camPos = rotateVectorAroundAxis(camPos, [0,0,1], dx)
        
//     //             if (camPos[2] < 1){
//     //                 camPos[2] = 1
//     //             }
//     //         } 
//     //     }

//     //     const destruct = () => {
//     //         tiltMode = false
//     //         tiltOrigin = undefined
//     //         camBeforeTilt = undefined
//     //     }

//     //     return [middleware, destruct]
//     // }

//     // function zoomMode(){
//     //     const middleware = () => {
//     //         if (!tiltMode){
//     //             tiltMode = true
//     //             tiltOrigin = middle_of_hand
//     //             camBeforeTilt = camPos
//     //         } else if (tiltMode){
//     //             // These are in finger coordinates
//     //             let [x, y, z] = tiltOrigin
//     //             let [x_c, y_c, z_c] = middle_of_hand
//     //             let dx = 2.7*(x_c-x); // proportional to horizontal rotation
//     //             let dy = -2.7*(y_c-y); // proportional to lateral rotation
        
//     //             const axis = camPos[0] > 0 ? [0,1,0] : [0,-1,0]
//     //             camPos = rotateVectorAroundAxis(camBeforeTilt, axis, dy)
//     //             camPos = rotateVectorAroundAxis(camPos, [0,0,1], dx)
        
//     //             if (camPos[2] < 1){
//     //                 camPos[2] = 1
//     //             }
//     //         } 
//     //     }

//     //     const destruct = () => {
//     //         tiltMode = false
//     //         tiltOrigin = undefined
//     //         camBeforeTilt = undefined
//     //     }

//     //     return [middleware, destruct]
//     // }

//     // setCamera(camPos[0], camPos[1], camPos[2])
// }



// const hands = new Hands({locateFile: (file) => {
//     return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
// }});
// hands.setOptions({
//     maxNumHands: 1, // the model provided can only handle 1 hand at a time
//     modelComplexity: 1, // can be reduced to 0 for performance
//     minDetectionConfidence: 0.5,
//     minTrackingConfidence: 0.5
// });
// hands.onResults(onResults);
// const videoElement = document.getElementsByClassName('input_video')[0];
// const camera = new Camera(videoElement, {
//     onFrame: async () => {
//         await hands.send({image: videoElement});
//     },
//     width: 1024,
//     height: 720
// });

// console.log("Loading model...")
// model = await tf.loadLayersModel("web_model/model.json");
// console.log("Model loaded!")
// const cameraStarted = camera.start();
// console.log("Initializing scene...")
// setCamera = initThreeJSScene();
// console.log("Scene initialized!")
// const minimalTimeout = new Promise(r => setTimeout(r, 2000));
// Promise.all([cameraStarted, minimalTimeout]).then(() => {
//     document.getElementById("preloader").style.display = "none";
// })

//Everything is deprecated here
//Files are kept because certain parts are unique and can be used for further testing
//Check out optimized.js for the latest solutions
