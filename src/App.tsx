import { Link, Switch, Route } from 'react-router-dom'
import './App.css';
import BadUrl from './components/BadUrl';
import Galleri from './components/galleri/Galleri';
import Startsida from './components/startsida/Startsida';
import Tävla from './components/Tävla/Tävla';

function App() {
  return (
    <div className="App">
        <header>
          <h2>Hamster Wars</h2>
          <nav className="menuSection">
            <Link to='/'>Startsida</Link>
            <Link to='/Tävla'>Tävla</Link>
            <Link to='/Galleri'>Galleri</Link>
          </nav>
        </header>
        <main>
          <Switch>
            <Route exact path='/'> < Startsida /> </Route>
            <Route path='/Tävla'> < Tävla /> </Route>
            <Route path='/Galleri'> < Galleri /> </Route>
            <Route path='/'> <BadUrl /></Route>
          </Switch>
        </main>
    </div>
  );
}

export default App;
