import logo from './logo.svg';
import './App.css';
// import store from './redux/store';
// import {Provider} from 'react-redux'
// import Routes from './Components/Routes'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import MainApp from './@routes';

function App() {
  return ( 
      <div className = 'App'>
        <MainApp />
      </div>
  );
}

export default App;
