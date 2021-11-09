import './App.css';
import Login from './components/Login/Login';
import SignUp from './components/Signup/Signup';
import UserScreen from './components/User/UserScreen';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AdminScreen from './components/Admin/AdminScreen';


function ProtectedRoute({component : Component, logic, ...rest}){
  return (
    <Route 
      {...rest}
      render={
        (props) =>
          logic ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  )
}

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <ProtectedRoute exact path="/login" component={Login} logic={localStorage.getItem('id') === null} />
          <ProtectedRoute exact path="/signup" component={SignUp} logic={localStorage.getItem('id') === null} />
          <ProtectedRoute exact path="/signup/:admin" component={SignUp} logic={localStorage.getItem('id') === null} />
          <ProtectedRoute path="/user/" component={UserScreen} logic={localStorage.getItem("role") === "USER"} />
          <ProtectedRoute path="/admin/" component={AdminScreen} logic={localStorage.getItem("role") === "ADMIN"} />
          <Route 
            exact 
            path="/" 
            render={() => { 
              return localStorage.getItem("id") === null ? 
                 <Redirect to="/login" /> 
                : 
                localStorage.getItem("role") === "USER" ? 
                  <Redirect to="/user/home" /> 
                  : 
                  <Redirect to="/admin/home" />
            }} 
          />
        </Switch>
      </Router>
    </div>
  );
}


export default App;
