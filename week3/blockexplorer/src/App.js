import { Switch, Route } from 'react-router-dom';
import Home from './pages/root';
import Block from './pages/block';
import './App.css';

function App() {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/block' component={Block} />
            </Switch>
        </div>
    );
}

export default App;
