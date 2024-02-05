import logo from './logo.svg';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
