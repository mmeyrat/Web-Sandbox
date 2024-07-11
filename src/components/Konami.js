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
	});

	return (
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
	)
}