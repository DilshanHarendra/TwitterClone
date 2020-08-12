import React, {Component} from 'react';
import './Signin.css';
import TwitterIcon from "@material-ui/icons/Twitter";
import {Link} from "react-router-dom";
class Signin extends Component {

    constructor(props) {
        super(props);
        this.state={
            username:'',
            pass:''
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render() {
        return (
            <div className="signin">
                <div className="box mx-auto">
                    <TwitterIcon className="twitter-icon mt-2 text-center"/>
                    <h1 className="text-center">Login</h1>
                    <form action="">
                        <input type="text"  placeholder="Username" name="username" value={this.state.username} onChange={this.changeHandler}/>
                        <input type="password" placeholder="Password" name="pass" value={this.state.pass} onChange={this.changeHandler} autoComplete="true"/>
                        <button className="mx-auto mt-4" type="submit">Sign up</button>
                    </form>

                    <Link to="/signup">Don't have an account</Link>

                </div>
            </div>
        );
    }
}

export default Signin;