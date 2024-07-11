import React from 'react';
import Earth from './Earth';
import Konami from './Konami';
import Navbar from './Navbar';

function App() {
	const [selectValue, setSelectValue] = React.useState(1);

	const handleSelectValue = (value) => {
		setSelectValue(value);
	};

	return (
		<div className="App">
			{selectValue === 0 ? <Earth /> : null}
			{selectValue === 1 ? <Konami /> : null}
			<Navbar onValueSend={handleSelectValue}/>
		</div>
	);
}

export default App;
