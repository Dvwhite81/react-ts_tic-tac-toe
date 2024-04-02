import Logo2 from './assets/images/Logo-Circle.png';
import Logo from '/Logo-Circle.png';
import './App.css';

function App() {
  return (
    <>
      <h1>Hello</h1>
      <a href="https://vitejs.dev" target="_blank">
        <img src={Logo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={Logo2} className="logo react" alt="React logo" />
      </a>
    </>
  );
}

export default App;
