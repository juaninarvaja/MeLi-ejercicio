import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Busqueda from './components/busqueda';


function App() {
  return (
    <div className="App">

      <Router>
        <Switch> 
          {/* si pongo / sola sin el exact va aentrar siempre ahi */}
          <Route exact path='/'> 
            <Busqueda/>
          </Route>
          {/* <Route path='/home'>
            <Home/>
          </Route>
          <Route path='/ClienteHome/:email'>
            <ClienteHome/>
          </Route>*/}
        </Switch> 
      </Router>

    </div>
  );
}

export default App;
