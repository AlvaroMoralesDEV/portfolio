import React from 'react';
import Header from './components/js/Header';
import Footer from './components/js/Footer';
import Home from './components/js/Home';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
