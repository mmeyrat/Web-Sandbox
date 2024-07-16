import React from 'react';
import './Konami.css';

export default function Konami() {
	let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

	React.useEffect(() => {
		if (document.getElementsByClassName("speech").length === 0)
		{
			const script = document.createElement("script");
			script.className = "speech";
			script.src = '/js/SpeechRecognition.js';
			document.body.appendChild(script);
		}

		document.querySelectorAll('.falling-image').forEach((image, index) => {
				image.style.animationDuration = `${Math.random() * 10 + 6}s`;
				image.style.top = index % 2 ? "-600px" : "-300px";

				placeImage(image, index);

				image.addEventListener('animationiteration', () => {
					placeImage(image, index);
				});

				if (isMobile) 
					window.addEventListener("resize", () => { placeImage(image, index); });
		});
	});

	function placeImage(image, index) {
		let coef = window.screen.width < 750 ? 3 : 6;
		image.style.width = isMobile ? "130px" : "unset";

		let column = window.screen.width / coef;
		image.style.left = `${column * (index % coef) + Math.random() * (column - image.offsetWidth)}px`;
		image.src = `/images/KonamiCode/ko${Math.floor(Math.random() * 20)}.jpg`;
	}

	return (
		<div>
			<img className="falling-image" src="/images/KonamiCode/ko0.jpg" alt=""></img>
			<img className="falling-image" src="/images/KonamiCode/ko1.jpg" alt=""></img>
			<img className="falling-image" src="/images/KonamiCode/ko2.jpg" alt=""></img>
			<img className="falling-image" src="/images/KonamiCode/ko3.jpg" alt=""></img>
			<img className="falling-image" src="/images/KonamiCode/ko4.jpg" alt=""></img>
			<img className="falling-image" src="/images/KonamiCode/ko5.jpg" alt=""></img>
			<div id="konami">
				<div id="konami-top">
					<span id="final" className="text-light"></span>
					<span id="interim" className="text-secondary"></span>
				</div>
				<div id="konami-bottom">
					<div className="icon-container" id="listen"><i className="material-symbols-sharp">mic_off</i></div>
					<div className="icon-container" id="delete"><i className="material-symbols-sharp ">backspace</i></div>
					<div className="icon-container" id="reset"><i className="material-symbols-sharp">restart_alt</i></div>
					<div className="icon-container" id="translate"><i className="material-symbols-sharp">language_french</i></div>
					<a className="icon-container" href="https://en.wikipedia.org/wiki/Konami_Code" target="_blank" rel="noreferrer"><i className="material-symbols-sharp no-fill">info</i></a>
				</div>
			</div>
		</div>
	)
}