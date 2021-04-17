import logo from './logo.svg';
import './App.css';
import DiffRender from './Algorithm/DiffRender.jsx'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
        </a>
        <DiffRender user="The little brown fox jumped over the lazy dog" recorded="The quick brown fox jumped over the lazy dog"></DiffRender>
      </header>
    </div>
  );
}

export default App;
