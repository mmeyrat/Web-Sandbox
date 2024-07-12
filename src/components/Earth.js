import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './Earth.css';

export default function Earth() {
	React.useEffect(() => {
		const scene = new THREE.Scene();

		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50000);
		camera.position.z = 300;

		const loader = new THREE.TextureLoader();
		const earthColorTex = loader.load("/images/Earth3D/earth_color_map.jpg");
		const earthSpecularTex = loader.load("/images/Earth3D/earth_specular_map.jpg");
		const earthNormalTex = loader.load("/images/Earth3D/earth_normal_map.jpg");
		const cloudsTex = loader.load("/images/Earth3D/earth_clouds.jpg");
		const starsTex = loader.load("/images/Earth3D/stars.jpg");

		const earthGeo = new THREE.SphereGeometry(128, 128, 128);
		const cloudsGeo = new THREE.SphereGeometry(129, 128, 128);
		const starsGeo = new THREE.SphereGeometry(40000, 25, 25);

		const cloudsMat = new THREE.MeshPhongMaterial({ 
			map: cloudsTex,
			alphaMap: cloudsTex,
			transparent: true
		});
		const earthMat = new THREE.MeshPhongMaterial({
			map: earthColorTex,
			specularMap: earthSpecularTex,
			normalMap: earthNormalTex,
			shininess: 100,
			normalScale: new THREE.Vector2(4, -1)
		});
		const starsMat = new THREE.MeshBasicMaterial({ map: starsTex });
		
		const pivot = new THREE.Object3D();
		const earth = new THREE.Mesh(earthGeo, earthMat);
		const clouds = new THREE.Mesh(cloudsGeo, cloudsMat);
		const stars = new THREE.Mesh(starsGeo, starsMat);
		
		stars.material.side = THREE.BackSide;
		earth.rotation.x = 0.2;

		const ambient = new THREE.AmbientLight(0xffffff, 0.2);
		const light = new THREE.DirectionalLight(0xffffff, 5);
		light.position.set(500, 500, 500);

		pivot.add(camera);
		scene.add(earth, clouds, stars, ambient, light, pivot);

		const renderer = new THREE.WebGLRenderer({ antialias : true, alpha: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.getElementById("earth").appendChild(renderer.domElement);

		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enablePan = false;
		controls.enableDamping = true;
		controls.minDistance = 150;
		controls.maxDistance = 1000;
		controls.maxTargetRadius = 0.05;

		function update() {
			requestAnimationFrame(update);
			
			earth.rotation.y += 0.0004;
			clouds.rotation.y += 0.00038;
			clouds.rotation.x += 0.00002;
			
			let zoom = Math.round(controls.target.distanceTo(controls.object.position));
			controls.rotateSpeed = Math.log(0.001 * zoom, 2.5) + 2;
			controls.update();

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			
			renderer.setSize(window.innerWidth, window.innerHeight);
			renderer.setClearColor(0x000000, 0); 
			renderer.render(scene, camera);
		}

		update();
	});

	document.body.onmousedown = () => { document.getElementById("earth").style.cursor = "grabbing"; }
	document.body.onmouseup = () => { document.getElementById("earth").style.cursor = "grab"; }

	return (
		<div id="earth"></div>
	)
}