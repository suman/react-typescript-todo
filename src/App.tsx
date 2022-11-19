import React from 'react';
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