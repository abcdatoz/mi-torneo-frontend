//import './App.css';
//import 'semantic-ui-css/semantic.min.css'

import Header from  './components/layouts/Header'

import PrivateRoute from './components/common/PrivateRoute'
import Login from './components/accounts/Login'
import Register from './components/accounts/Register'
import { Route, Switch, } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


import Home from './components/Home'
import Bug from './components/Bug'

import MiTorneo from './components/torneo/MiTorneo'
import Equipos from './components/equipos/Equipos'



import 'react-toastify/dist/ReactToastify.css';



function App() {

  const notify = () => toast("Wow so easy!");


  return (
    <div className="App">
      <Header />
      


      <div className='container'>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          
          <PrivateRoute exact path="/bugs" component={Bug} />
          <PrivateRoute exact path="/torneos" component={MiTorneo} />
          <PrivateRoute exact path="/equipos" component={Equipos} />
          
          
          
        </Switch>

      </div>
      
      

      <ToastContainer />

    </div>
  );
}
export default App;

//this is a comment