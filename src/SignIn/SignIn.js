import React, {Component} from 'react';
import './Signin.css';
import TwitterIcon from "@material-ui/icons/Twitter";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getUsers} from "../dbHandler";
class Signin extends Component {

    constructor(props) {
        super(props);
        this.state={
            username:'',
            pass:'',
            err:false
        }

        var username=window.localStorage.getItem("username");
        if (username!==null){
            props.history.push('/')
        }
    }

    componentDidMount() {

        if (this.props.allUsers.length===0){
            getUsers().then( r=>{
                this.props.addAllUser(r)
            }).catch(err=>console.log(err));
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    submit=e=>{
        e.preventDefault();
        if (this.state.username===""||this.state.pass===""){
            this.setState({
                err:"Please Fill all Fields"
            })
        }else{
            this.setState({
                err:false
            })
            console.log(this.props.allUsers)
            for (var i=0; i<this.props.allUsers.length;i++){
                var user=this.props.allUsers[i];
                if (user.username===`@${this.state.username.toString().trim()}`){
                    if (user.pass.toString().trim()===this.state.pass.toString().trim()){
                        this.props.setCurrentUser(user)
                        window.localStorage.setItem("username",user.username);
                        this.props.history.push('/');
                    }else{
                        this.setState({
                            err:"Incorrect Password"
                        })
                    }
                    break;
                }else{
                    this.setState({
                        err:"Username Not Found"
                    })
                }
            }





        }

    }

    render() {
        return (
            <div className="signin">
                <div className="box mx-auto">
                    <TwitterIcon className="twitter-icon mt-2 text-center"/>
                    <h1 className="text-center">Login</h1>
                    {this.state.err?(<p className={"text-center text-danger"}>{this.state.err}</p>):(<div></div>)}
                    <form onSubmit={this.submit}>
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
const mapStateToProps=state=>{
    return{
        ...state
    }
}
const mapDispathToProps=dispatch=>{
    return{
        addAllUser:(users)=>{dispatch({type:'addUsers',users:users})},
        setCurrentUser:(user)=>{dispatch({type:'currentUser',user:user})}

    }
}
export default connect(mapStateToProps,mapDispathToProps)(Signin);