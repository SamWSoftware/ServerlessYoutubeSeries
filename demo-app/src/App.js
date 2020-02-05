import React from 'react';
import logo from './completeCodingLogo.png';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>This is a react app for complete coding</p>
                <a
                    className="App-link"
                    href="https://www.youtube.com/watch?v=D5_FHbdsjRc&list=PLmexTtcbIn_gP8bpsUsHfv-58KsKPsGEo"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn Serverless
                </a>
            </header>
        </div>
    );
}

export default App;
