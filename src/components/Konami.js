import React from 'react';
import './styles/Konami.css';

const animLenght = 6;
const imagesNb = 24;

export default function Konami() {
	let currentImages = [];

	React.useEffect(() => {
		if (document.getElementsByClassName("scripts").length === 0)
		{
			const scriptSpeech = document.createElement("script");
			const scriptConfetti = document.createElement("script");
			scriptSpeech.className = "scripts";
			scriptConfetti.className = "scripts";
			scriptSpeech.src = "/sandbox/js/SpeechRecognition.js";
			scriptConfetti.src = "/sandbox/js/Confetti.js";
			document.body.appendChild(scriptSpeech);
			document.body.appendChild(scriptConfetti);
		}

		document.querySelectorAll('.moving-image').forEach((image, index) => {
			image.style.animationDuration = `${Math.random() * animLenght + animLenght}s`;

			placeImage(image, index);

			image.addEventListener('animationiteration', () => {
				placeImage(image, index);
			});
		});
	});

	function placeImage(image, index) {
		image.style.width = `${Math.min(window.innerWidth, window.innerHeight) / 3}px`;
		image.style.left = `${Math.random() * (window.innerWidth) - image.offsetWidth / 2}px`;
		image.style.top = `${Math.random() * (window.innerHeight) - image.offsetHeight / 2}px`;

		let unusedImages = [];
		for (let i = 0; i < imagesNb; i++)
			if (!currentImages.includes(i))
				unusedImages.push(i);

		let imageId = unusedImages[Math.floor(Math.random() * unusedImages.length)];
		image.src = `/sandbox/images/KonamiCode/${imageId}.jpg`;
		currentImages[index] = imageId;
	}

	return (
		<div>
			<canvas id="canvas" style={{opacity: 0}}></canvas>
			<img className="moving-image move-bottom-left" src="/sandbox/images/KonamiCode/0.jpg" alt=""></img>
			<img className="moving-image move-bottom-right" src="/sandbox/images/KonamiCode/1.jpg" alt=""></img>
			<img className="moving-image move-top-left" src="/sandbox/images/KonamiCode/2.jpg" alt=""></img>
			<img className="moving-image move-top-right" src="/sandbox/images/KonamiCode/3.jpg" alt=""></img>
			<img className="moving-image move-bottom-left" src="/sandbox/images/KonamiCode/4.jpg" alt=""></img>
			<img className="moving-image move-bottom-right" src="/sandbox/images/KonamiCode/5.jpg" alt=""></img>
			<img className="moving-image move-top-left" src="/sandbox/images/KonamiCode/6.jpg" alt=""></img>
			<img className="moving-image move-top-right" src="/sandbox/images/KonamiCode/7.jpg" alt=""></img>
			<div id="konami">
				<div id="konami-top">
					<span id="final" className="text-light"></span>
					<span id="interim" className="text-secondary"></span>
				</div>
				<div id="konami-bottom">
					<div className="icon-container" title="Mute/Unmute" id="listen">
						<svg viewBox="0 -960 960 960">
							<path d="m745.05-353.52-71.57-71.57q11.17-20.17 16.48-42.06 5.3-21.89 5.3-48.33h96.96q0 44-11.87 85.48-11.87 41.48-35.3 76.48ZM618.57-480.87 346.43-753v-26.22q7.35-46.61 45.74-80.19Q430.57-893 482.83-893q59.04 0 100.54 41.22 41.5 41.21 41.5 100.26v236.04q0 9.87-1.93 18.87-1.94 9-4.37 15.74ZM434.35-85.52v-125.7q-113.61-15.13-187.26-101.82-73.66-86.7-73.66-202.44h97.53q0 88.09 61.89 149.98 61.89 61.89 149.98 61.89 39.08 0 74.11-13.32 35.02-13.33 62.28-36.85l70 70q-32.39 28.65-72.26 47.54-39.87 18.89-85.66 25.02v125.7h-96.95Zm354.82 25-736-736 61.66-61.65 736 736-61.66 61.65Z"/>
						</svg>
						<svg viewBox="0 -960 960 960" display="none">
							<path d="M479.93-374q-58.97 0-100.19-41.26-41.22-41.27-41.22-100.22v-236.04q0-58.95 41.28-100.22Q421.09-893 480.07-893q58.97 0 100.19 41.26 41.22 41.27 41.22 100.22v236.04q0 58.95-41.28 100.22Q538.91-374 479.93-374ZM431.52-85.52v-125.26q-113.61-15.13-187.26-102.11-73.65-86.98-73.65-202.59h97.52q0 88.09 62.01 149.98 62 61.89 149.97 61.89 87.98 0 149.87-61.97t61.89-149.9h97.52q0 115.74-73.65 202.66-73.65 86.91-187.26 102.04v125.26h-96.96Z"/>
						</svg>
					</div>
					<div className="icon-container" title="Remove last" id="delete">
						<svg viewBox="0 -960 960 960">
							<path d="m469.57-323.39 91-91 90.99 91L717.17-389l-91-91 91-91-65.61-65.61-90.99 91-91-91L403.96-571l91 91-91 91 65.61 65.61ZM366.78-140.78q-25.21 0-47.87-11.33-22.65-11.32-37.61-31.41L60.78-480 281.3-776.48q14.96-20.09 37.61-31.41 22.66-11.33 47.87-11.33h426.44q44.3 0 75.15 30.85 30.85 30.85 30.85 75.15v466.44q0 44.3-30.85 75.15-30.85 30.85-75.15 30.85H366.78Z"/>
						</svg>
					</div>
					<div className="icon-container" title="Reset" id="reset">
						<svg viewBox="0 -960 960 960">
							<path d="M440-102.22q-128.35-16.13-213.78-111.43-85.44-95.31-85.44-225.22 0-67.7 26-129.89 26-62.2 74-110.59l75.65 75.09q-34.04 32.87-51.84 75.33-17.81 42.45-17.81 90.06 0 85.74 54.31 150.7 54.3 64.95 138.91 79.39v106.56Zm80 0v-106.56q84.17-14.87 138.7-79.89 54.52-65.03 54.52-150.2 0-93.78-64.07-160.96-64.06-67.17-157.28-71.69h-5.26L534-624.13l-62.22 62.22-166.56-166.57 166.56-167.13L534-833.39l-55.3 55.3h5.82q140.22 0 237.46 99.22 97.24 99.22 97.24 240 0 128.91-85.44 224.5Q648.35-118.78 520-102.22Z"/>
						</svg>
					</div>
					<div className="icon-container" title="Language" id="translate">
						<svg viewBox="0 -960 960 960">
							<path d="M140.78-280v-400h298.09v106H246.78v60.22h152.09v100.35H246.78V-280h-106Zm366.78 0v-400H731.3q36.27 0 62.09 25.82 25.83 25.83 25.83 62.09v83.96q0 30.3-21.72 51.11-21.72 20.8-51.15 24.93L827.7-280H709.78l-73.87-144.74h-22.34V-280H507.56Zm106.01-233.78h103.04V-574H613.57v60.22Z"/>
						</svg>
						<svg viewBox="0 -960 960 960" display="none">
							<path d="M229.26-280q-36.5 0-62.49-25.99-25.99-25.99-25.99-62.49V-680h106v299.65h89.48V-680h106v311.52q0 36.5-25.82 62.49Q390.61-280 354.35-280H229.26Zm370.07 0q-36.29 0-62.33-25.99t-26.04-62.49v-37.74h106v25.87h96.26v-55.13H599.43q-36.49 0-62.48-25.99-25.99-25.99-25.99-62.49v-68.13q0-36.26 25.99-62.09Q562.94-680 599.43-680H731.3q36.27 0 62.09 25.82 25.83 25.83 25.83 62.09v38.31h-106v-25.87h-96.26v55.13H731.3q36.27 0 62.09 25.82 25.83 25.83 25.83 62.09v68.13q0 36.5-25.84 62.49Q767.54-280 731.26-280H599.33Z"/>
						</svg>
					</div>
					<a className="icon-container" title="Info" href="https://en.wikipedia.org/wiki/Konami_Code" target="_blank" rel="noreferrer">
						<svg viewBox="0 -960 960 960">
							<path d="M431.52-271.52h96.96V-520h-96.96v248.48ZM480-588.7q21.8 0 36.55-14.75Q531.3-618.2 531.3-640q0-21.8-14.75-36.55Q501.8-691.3 480-691.3q-21.8 0-36.55 14.75Q428.7-661.8 428.7-640q0 21.8 14.75 36.55Q458.2-588.7 480-588.7Zm0 527.92q-87.52 0-163.91-32.96-76.38-32.96-132.88-89.47-56.51-56.5-89.47-132.88Q60.78-392.48 60.78-480t32.96-163.91q32.96-76.38 89.47-132.88 56.5-56.51 132.88-89.47 76.39-32.96 163.91-32.96t163.91 32.96q76.38 32.96 132.88 89.47 56.51 56.5 89.47 132.88 32.96 76.39 32.96 163.91t-32.96 163.91q-32.96 76.38-89.47 132.88-56.5 56.51-132.88 89.47Q567.52-60.78 480-60.78Zm0-106q131.74 0 222.48-90.74 90.74-90.74 90.74-222.48t-90.74-222.48Q611.74-793.22 480-793.22t-222.48 90.74Q166.78-611.74 166.78-480t90.74 222.48q90.74 90.74 222.48 90.74ZM480-480Z"/>
						</svg>
					</a>
				</div>
			</div>
		</div>
	)
}