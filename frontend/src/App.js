import './App.css';
import Login from './components/Login/Login';
import SignUp from './components/Signup/Signup';
import UserScreen from './components/User/UserScreen';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/user/home" component={UserScreen} />
          <Route exact path="/user/profile" component={UserScreen} />
          <Route exact path="/" render={() => <Redirect to="/login" />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
