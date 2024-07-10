import React from 'react';
import './Navbar.css';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

export default function Navbar() {
	const list = React.useRef(null);

	function select(e) {
		if (list) {
			for (const child of list.current.children) {
				child.id = "";
			}
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