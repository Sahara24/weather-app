import './App.css';
import { Home } from './Components/Home';
import { useState } from 'react';

function App() {
  const [type, setType] = useState('');
  return (
    <div className={`App app${type}`}>
      <Home setType={setType} />
    </div >
  );
}

export default App;
