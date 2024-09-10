import React from 'react';
import './styles/Navbar.css';

export default function Navbar({onValueSend}) {
	const [openValue, setOpenValue] = React.useState(false);
	const list = React.useRef(null);

	function select(e) {
		if (list) {
			const childs = list.current.children;
			const valueToSend = Array.prototype.indexOf.call(childs, e.target);
			onValueSend(valueToSend);

			for (const child of childs)
				child.id = "";

			e.target.id = "selected";
			document.getElementById("navbar").style.visibility = "";
			setOpenValue(false);
		}
	}

	function show() {
		let navbar = document.getElementById("navbar");
		navbar.style.visibility = navbar.checkVisibility({visibilityProperty: true}) ? "" : "visible";
		setOpenValue(!openValue);
	}

	return (
		<div>
			<div onClick={show} id="burger">
				{ openValue ?
				<svg viewBox="0 -960 960 960">
					<path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
				</svg> :
				<svg viewBox="0 -960 960 960">
    				<path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
				</svg>}
			</div>
			<div id="navbar">
				<ul ref={list}>
					<li onClick={select} id="selected">Earth 3D</li>
					<li onClick={select}>Konami Code</li>
				</ul>
			</div>
		</div>
	)
}