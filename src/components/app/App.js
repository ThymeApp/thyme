import React, { Component } from 'react';

import ThymeTable from '../ThymeTable';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App__header">
          <h1 className="App__title">Thyme</h1>
        </header>
        <section className="App__container">
          <ThymeTable />
        </section>
      </div>
    );
  }
}

export default App;
