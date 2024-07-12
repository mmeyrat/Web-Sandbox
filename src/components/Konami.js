import React from 'react';
import './Konami.css';

export default function Konami() {
	React.useEffect(() => {
		if (document.getElementsByClassName("speech").length === 0)
		{
			const script = document.createElement("script");
			script.className = "speech";
			script.src = '/js/SpeechRecognition.js';
			document.body.appendChild(script);
		}

		document.querySelectorAll('.falling-image').forEach((image, index) => {
			resetImage(image, index);
		});
	
		function resetImage(image, index) {
			// Positionner l'image dans une section spécifique pour éviter les chevauchements
			image.style.left = Math.random() * window.innerWidth - 132 + 'px';
	
			// Définir une durée d'animation aléatoire entre 5 et 15 secondes
			const duration = Math.random() * 20 + 5;
			image.style.animationDuration = duration + 's';
	
			// Réinitialiser l'image une fois l'animation terminée
			image.addEventListener('animationiteration', () => {
				resetImage(image, index);
			});
		}
	});

	return (
		<div>
			<div className="loader">
				<span className="falling-image"><img src="/images/KonamiCode/ko0.jpg" alt=""></img></span>
				<span className="falling-image"><img src="/images/KonamiCode/ko1.jpg" alt=""></img></span>
				<span className="falling-image"><img src="/images/KonamiCode/ko2.jpg" alt=""></img></span>
				<span className="falling-image"><img src="/images/KonamiCode/ko3.jpg" alt=""></img></span>
				<span className="falling-image"><img src="/images/KonamiCode/ko4.jpg" alt=""></img></span>
				<span className="falling-image"><img src="/images/KonamiCode/ko5.jpg" alt=""></img></span>
				<span className="falling-image"><img src="/images/KonamiCode/ko6.jpg" alt=""></img></span>
				<span className="falling-image"><img src="/images/KonamiCode/ko7.jpg" alt=""></img></span>
				<span className="falling-image"><img src="/images/KonamiCode/ko8.jpg" alt=""></img></span>
				<span className="falling-image"><img src="/images/KonamiCode/ko9.jpg" alt=""></img></span>
				<span className="falling-image"><img src="/images/KonamiCode/ko10.jpg" alt=""></img></span>
				<span className="falling-image"><img src="/images/KonamiCode/ko11.jpg" alt=""></img></span>
			</div>
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
				<span id="status" style={{opacity: 0}}>Veuillez réciter le code...</span>
			</div>
		</div>
	)
}