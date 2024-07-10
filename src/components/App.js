import logo from './logo.svg';
import Navbar from './Navbar.js'
import Konami from './Konami'

function App() {
  return (
    <div className="App">
      <div className="App-header">
        
        {/*<img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>*/}
      </div>
      <div>
        {/*<Konami />*/}
        <Navbar />
      </div>
    </div>
  );
}

export default App;
