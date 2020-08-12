import React, {Component} from 'react';
import './Signup.css';
import TwitterIcon from "@material-ui/icons/Twitter";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {registerUser} from "../dbHandler";
class Signup extends Component {

    constructor(props) {
        super(props);
        this.state={
            username:'',
            name:'',
            pass:'',
            pImage:'',
            err:'none'
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    submit=e=>{
        e.preventDefault();
        if (this.state.username===""||this.state.name===""||this.state.pass===""){
            this.setState({
                err:'block'
            })
        }else {
            this.setState({
                err:'none'
            });

            delete this.state['err']
           registerUser(`${this.state.username}`,this.state.name.toString(),this.state.pImage.toString(),this.state.pass.toString())
               .then(m=>{
                   this.props.addNewUser(this.state);
                   window.localStorage.setItem("username",this.state.username)
                   this.props.history.push('/');
               })
               .catch(err=>{

                  alert(err.message)
               })


        }
    }

    render() {
        return (
            <div className="signup">
                    <div className="box mx-auto">
                        <TwitterIcon className="twitter-icon mt-2 text-center"/>
                        <h1 className="text-center" >Create your account</h1>
                        <p className="text-center text-danger" style={{display:this.state.err}} >Please Fill All Details</p>
                        <form  onSubmit={this.submit}>
                            <input type="text"  placeholder="Username" name="username" value={this.state.username} onChange={this.changeHandler}/>
                            <input type="text" placeholder="Name" name="name" value={this.state.name} onChange={this.changeHandler}/>
                            <input type="text" placeholder="Profile Image url" name="pImage" value={this.state.pImage} onChange={this.changeHandler}/>
                            <input type="password" placeholder="Password" name="pass" value={this.state.pass} onChange={this.changeHandler} autoComplete="true"/>
                            <button className="mx-auto mt-4" type="submit">Sign up</button>
                        </form>

                        <Link to="/login">Already have an account</Link>

                    </div>
            </div>
        );
    }
}
const mapStateToProps=state=>{
    return{

        allUsers:state.allUsers
    }
}
const mapDispathToProps=dispatch=>{
    return{
        addNewUser:(nuser)=>{dispatch({type:'addNewUser',user:nuser})}
    }
}
export default connect(mapStateToProps,mapDispathToProps)(Signup);