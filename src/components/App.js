import React from 'react';
import Earth from './Earth';
import Konami from './Konami';
import Navbar from './Navbar';
import './styles/App.css';

function App() {
	const [selectValue, setSelectValue] = React.useState(0);

	const handleSelectValue = (value) => {		
		setSelectValue(value);
	};

	switch(selectValue) {
		case 0:
			document.title = "Earth 3D";
			break;
		case 1: 
			document.title = "Konami Code";
			break;
		default:
			document.title = "Title";
			break;
	}

	return (
		<div id="App">
			{selectValue === 0 ? <Earth /> : null}
			{selectValue === 1 ? <Konami /> : null}
			<Navbar onValueSend={handleSelectValue}/>
		</div>
	);
}

export default App;
