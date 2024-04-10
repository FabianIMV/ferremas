import './App.css';
import React from 'react';
import NavBar from './components/NavBar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
        <NavBar />
      <div className="search-bar">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Buscar productos..." aria-label="Buscar" aria-describedby="button-addon2"></input>
          <div class="btn btn-outline-secondary" type="button" id="button-addon2">Buscar</div>
        </div>
      </div>
    </div>
  );
}

export default App;
