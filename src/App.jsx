import React from 'react'
import Home from './Components/Home/Home.jsx'
import Navbar from './Components/Navbar/Navbar.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import NotFound from './Components/NotFound/NotFound.jsx'
import { Switch, Redirect, Route } from 'react-router-dom'
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes.jsx'
import { connect } from 'react-redux'
import Favorite from './Components/Favorite/Favorite.jsx'
import { goToHome } from './redux/actions/actions.js'

function App(props) {


  return (
    <>

      <Navbar />

      <Switch>


        {props.Path === 'home' ? <ProtectedRoutes path="/home" component={Home} /> : <ProtectedRoutes path="/favorite" component={Favorite} />}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/favorite" component={Favorite} />

        <Redirect exact from="/" to="/home" />
        <Route path="/*" component={NotFound} />

      </Switch>








    </>
  )
}
function mapStateToProps(state) {
  return {
    Path: state.routePath,
    isLogin: state.isLogIn
  }
}
export default connect(mapStateToProps, { goToHome })(App)




