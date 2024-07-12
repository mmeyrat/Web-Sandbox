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
        const color = loader.load('/images/Earth3D/earth_color_map.jpg');
        const specular = loader.load('/images/Earth3D/earth_specular_map.jpg');
        const normal = loader.load('/images/Earth3D/earth_normal_map.jpg');
        const stars = loader.load("/images/Earth3D/stars.jpg");
        const cloudstex = loader.load("/images/Earth3D/earth_clouds.jpg");

        const cloudGeo = new THREE.SphereGeometry(129, 128, 128);
        var cloud_material = new THREE.MeshPhongMaterial({ 
            map: cloudstex,
            alphaMap: cloudstex,
            transparent: true
        });
        
        const skyGeo = new THREE.SphereGeometry(40000, 25, 25);
        var sky_material = new THREE.MeshBasicMaterial({ map: stars });

        const geometry = new THREE.SphereGeometry(128, 128, 128);
        const material = new THREE.MeshPhongMaterial({
            map: color,
            specularMap: specular,
            normalMap: normal,
            shininess: 75,
        });
        
        material.normalScale.set(4, -1);

        const group = new THREE.Group();
        const sphere = new THREE.Mesh(geometry, material);
        const clouds = new THREE.Mesh(cloudGeo, cloud_material);
        const pivot = new THREE.Object3D();

        const sky = new THREE.Mesh(skyGeo, sky_material);
        sky.material.side = THREE.BackSide;

        const light = new THREE.DirectionalLight(0xffffff, 6);
        light.position.x = 500;
        light.position.y = 500;
        light.position.z = 500;
        const ambient = new THREE.AmbientLight(0xffffff, 0.2);

        const helper = new THREE.DirectionalLightHelper( light, 5 );

        sphere.rotation.x = 0.2;

        var mouse = new THREE.Vector2();
        var raycaster = new THREE.Raycaster();

        scene.add(light);
        pivot.add(camera);
        group.add(sphere, ambient, pivot, helper);
        scene.add(group);
        scene.add(sky);
        scene.add(clouds);

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

            raycaster.setFromCamera( mouse, camera );
            var intersects = raycaster.intersectObjects( sky );
            console.log(intersects);
        
            if(intersects.length > 0) {
                document.body.style.cursor = 'pointer';
            } else {
                document.body.style.cursor = 'default';
            }

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            
            renderer.setSize(window.innerWidth, window.innerHeight);
            
            sphere.rotation.y += 0.0004;
            clouds.rotation.y += 0.00038;
            clouds.rotation.x += 0.00002;

            renderer.setClearColor(0x000000, 0); 
            renderer.render(scene, camera);
        }

        update();
        

        function onDocumentMouseMove(event) {

            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        
           
        
        }
        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    });

	return (
		<div id="earth">
		</div>
	)
}