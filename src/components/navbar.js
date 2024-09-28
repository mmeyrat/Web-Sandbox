import React from 'react';
import './styles/Navbar.css';

export default function Navbar({onValueSend}) {
	const [openValue, setOpenValue] = React.useState(false);
	const list = React.useRef(null);

	function select(e) {
		if (list) {
			const childs = list.current.children;
			const valueToSend = Array.prototype.indexOf.call(childs, e.target);
			onValueSend(valueToSend); // Send value to app to show the correct component

			for (const child of childs) // Unselect all elements
				child.id = "";

			e.target.id = "selected"; // Set current selection to the corresponding element
			document.getElementById("navbar").style.visibility = ""; // Hide folder menu
			setOpenValue(false);
		}
	}

	function show() {
		let navbar = document.getElementById("navbar");
		navbar.style.visibility = navbar.checkVisibility({visibilityProperty: true}) ? "" : "visible"; // Show folder menu
		setOpenValue(!openValue);
	}

	return (
		<div>
			<div onClick={show} id="folder" className="menu">
				{ openValue ?
				<svg viewBox="0 -960 960 960">
					<path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
				</svg> :
				<svg viewBox="0 -960 960 960">
    				<path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
				</svg>}
			</div>
			<div id="navbar" className="menu">
				<ul ref={list}>
					<li onClick={select} id="selected">Earth 3D</li>
					<li onClick={select}>Konami Code</li>
				</ul>
			</div>
			<a title="GitHub" id="link" href="https://github.com/mmeyrat/Web-Sandbox" target="_blank" rel="noreferrer">
				<svg viewBox="0 0 24 24">
					<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
				</svg>
			</a>
		</div>
	)
}