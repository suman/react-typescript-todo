import React from 'react';
import logo from './logo.svg';
import './App.css';
import Head from './Head';
import TodoContainer from './Todo/Index';

function App() {
  return (
    <div className="App">
      <Head />
      <TodoContainer />
    </div>
  );
}

export default App;