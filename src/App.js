import Header from './components/Header';
import Input from './components/Input';
import './App.css';

function App() {
  return (
    <div>
      <Header/>

      <div class="container">
        <h1 class="my-3">Welcome to Daakiya</h1>
    </div>

    <div className="container">
      <Input />
    </div>
    </div>
  );
}

export default App;
