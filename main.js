import './style.css'
import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,100);
const renderer= new THREE.WebGLRenderer({
  canvas:document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth,window.innerHeight);

window.addEventListener('resize',()=>{
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  
})
camera.position.setZ(30);

// renderer.render(scene,camera);

 const geometry=new THREE.TorusGeometry(10,3,16,100);
 const material= new THREE.MeshStandardMaterial({color: 0xFF6347});
 const torus= new THREE.Mesh(geometry,material);
 scene.add(torus);

 const pointlight=new THREE.PointLight(0xffffff)
const ambientlight= new THREE.AmbientLight(0xffffff)
 pointlight.position.set(5,5,5)
 scene.add(ambientlight,pointlight)

 const controls=new OrbitControls(camera,renderer.domElement);


 function addstars(){
  const geometry= new THREE.SphereGeometry(0.25,24,24)
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry,material)

  const [x,y,z]=Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star)
 }
 Array(200).fill().map(addstars); 

 const lighthelper= new THREE.PointLightHelper(pointlight)
 const gridhelper= new THREE.GridHelper(200,50)
 scene.add(gridhelper,lighthelper)

 function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x+=0.01;
  torus.rotation.y+=0.005;
  torus.rotation.z+=0.01;
  controls.update()
  renderer.render(scene,camera);
 }
 animate()

