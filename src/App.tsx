import React from 'react';
import logo from './logo.svg';
import './App.css';

interface IAppProps {
  callback: any;
}

const App = ({ callback }: IAppProps) => {
  return (
    <div className="App" ref={callback}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="App-content">
        <section className="App-control-panel"></section>
        <section className="App-card"></section>
        <section className="App-voices-viewer"></section>
        <section className="App-source-viewer"></section>
      </div>
    </div>
  );
}

export default App;
