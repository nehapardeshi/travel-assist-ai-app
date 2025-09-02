import logo from './logo.svg';
import './App.css';
import TravelForm from './TravelForm';

function App() {
  return (
    <div className="App">
      <h1>Travel Assist App</h1>
      <p>
        Welcome to the Travel Assist App! Please fill out the form below to get started.
      </p>
      <hr />
        <TravelForm />
     </div>

  );
}

export default App;
