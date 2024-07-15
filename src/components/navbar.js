import React from 'react';
import './Navbar.css';

export default function Navbar({onValueSend}) {
	const list = React.useRef(null);

	function select(e) {
		if (list) {
			const childs = list.current.children;
			const valueToSend = Array.prototype.indexOf.call(childs, e.target);
			onValueSend(valueToSend);

			for (const child of childs)
				child.id = "";

			e.target.id = "selected";
		}
	}

	return (
		<div id="navbar">
			<ul ref={list}>
				<li onClick={select} id="selected">Earth 3D</li>
				<li onClick={select}>Konami Code</li>
			</ul>
		</div>
	)
}