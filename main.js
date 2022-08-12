import './style.css'

import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

//characters texture
const img = new THREE.TextureLoader().load('ak12.png');
const defypng = new THREE.TextureLoader().load('defylogo.png');

const defylogo = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 15),
    new THREE.MeshBasicMaterial( { map: defypng, side: THREE.DoubleSide, transparent: true} ),
);

const ak12 = new THREE.Mesh(
    new THREE.PlaneGeometry(20,20),
    new THREE.MeshBasicMaterial( { map: img, side: THREE.DoubleSide, transparent: true })
);

const gmtry = new THREE.PlaneGeometry(30, 100, 10, 50);
const material = new  THREE.MeshBasicMaterial( {color: 0xFFFFFF, wireframe:true} );
const floor = new THREE.Mesh( gmtry, material );

scene.add( defylogo, ak12, floor );

//defylogo
defylogo.position.z -= 10;

//ak12
ak12.position.x -= 11;
ak12.position.y -= 1;
ak12.position.z += 8;

//floor
floor.rotateX(30);
floor.position.y -= 14;
floor.position.z += 34;

document.body.onkeydown = function(evt) {
    if (evt.key == 'w') {
        camera.position.z -= 0.5;
        camera.position.y += 0.070;
    } else if (evt.key == 's') {
        camera.position.z += 0.5;
        camera.position.y -= 0.070;
    }
}

// const controls = new OrbitControls(camera, renderer.domElement);

function draw() {
    requestAnimationFrame( draw );
    // ak12.rotation.y -= 0.01;
    // controls.update();
    renderer.render( scene, camera );
}

draw();

// const imgx = new THREE.TextureLoader().load('bgg.jpg');
// scene.background = imgx;
window.addEventListener('resize', function() {
    renderer.setSize(this.window.innerWidth, this.window.innerHeight);
    camera.aspect = this.window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();
});
renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);

camera.position.setZ(10);

renderer.render( scene, camera );

