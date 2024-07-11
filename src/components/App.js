import React from 'react';
import Navbar from './Navbar.js'
import Konami from './Konami'

function App() {
	const [selectValue, setSelectValue] = React.useState(0);

	const handleSelectValue = (value) => {
		setSelectValue(value);
	};

	return (
		<div className="App">
			{/*selectValue === 1 ? <Earth /> : null*/}
			{selectValue === 1 ? <Konami /> : null}
			<Navbar onValueSend={handleSelectValue}/>
		</div>
	);
}

export default App;
