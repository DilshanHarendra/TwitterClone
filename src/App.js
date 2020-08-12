import React from 'react';

import './App.css';
import { BrowserRouter as Router} from "react-router-dom";
import {Route, Switch} from "react-router";
import Home from "./Home/Home";

import "bootstrap/dist/css/bootstrap.min.css";
import {insertSampleData, createDatabase} from './dbHandler'
import Signup from "./Signup/Signup";
import Signin from "./SignIn/SignIn";
import {Provider} from "react-redux";
import {createStore} from "redux";
import reducer from "./reducer";
function App() {


    createDatabase();
    insertSampleData();






  return (
    <div className="App">
            <Provider store={createStore(reducer)}>
                <Router>
                    <div className="pages">
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/signup" exact component={Signup}/>
                            <Route path="/signin" exact component={Signin}/>
                        </Switch>
                    </div>

                </Router>
            </Provider>
        </div>


  );
}

export default App;
