import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './Earth.css';

export default function Earth() {

    React.useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 300;

        const loader = new THREE.TextureLoader();
        const color = loader.load('/images/earth_color_map.jpg');
        const specular = loader.load('/images/earth_specular_map.jpg');
        const normal = loader.load('/images/earth_normal_map.jpg');

        const geometry = new THREE.SphereGeometry(128, 128, 128);
        const material = new THREE.MeshPhongMaterial({
            map: color,
            specularMap: specular,
            normalMap: normal,
            shininess: 25,
        });
        
        material.normalScale.set(4, -1)

        const group = new THREE.Group();
        const sphere = new THREE.Mesh(geometry, material);
        const pivot = new THREE.Object3D();


        const light = new THREE.DirectionalLight(0xffffff, 6);
        light.position.y = 500;
        const ambient = new THREE.AmbientLight(0xffffff, 0.3);

        const helper = new THREE.DirectionalLightHelper( light, 5 );

        camera.add(light);
        pivot.add(camera);
        group.add(sphere, ambient, pivot, helper);
        scene.add(group);

        const renderer = new THREE.WebGLRenderer({antialias : true, alpha: true});
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

            let zoom = Math.round(controls.target.distanceTo(controls.object.position));
            controls.rotateSpeed = Math.log(0.001 * zoom, 2.5) + 2;

            controls.update();

            renderer.setClearColor(0x000000, 0); 
            renderer.render(scene, camera);
        }

        update();
    });

	return (
		<div id="earth">
		</div>
	)
}