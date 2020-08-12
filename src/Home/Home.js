import React, {useEffect} from 'react';
import Widget from "../Widgets/Widgets";
import "./home.css";
import Feed from "../Feed/Feed";
import Sidebar from "../SideBar/Sidebar";
import {connect} from "react-redux";
import {getAllPosts, getUsers} from "../dbHandler";

function Home(props) {

    var username=window.localStorage.getItem("username");

    useEffect(()=>{
        getUsers().then( r=>{
            props.addAllUser(r)
        }).catch(err=>console.log(err));

        getAllPosts().then(r=>{
            console.log(r)
            props.addAllPosts(r)
        }).catch(err=>console.log(err))
        if (username==null||username.toString().trim()===""){
            props.history.push('/login')
        }

    },[]);

    useEffect(()=>{

        props.allUsers.find(user=>{
            if (user.username===username.toString().trim()){
                props.setCurrentUser(user)
            }
           // return true
        })


    },[props.allUsers]);





    return (
        <div className="d-flex container-fluid">
            <div className="home d-flex" >
                <Sidebar/>
                <Feed/>

                <Widget/>
            </div>
        </div>
    );

}
const mapStateToProps=state=>{
    return{
        ...state
    }
}
const mapDispathToProps=dispatch=>{
    return{
        addAllUser:(users)=>{dispatch({type:'addUsers',users:users})},
        addAllPosts:(posts)=>{dispatch({type:'addPosts',posts:posts})},
        setCurrentUser:(user)=>{dispatch({type:'currentUser',user:user})}

    }
}
export default connect(mapStateToProps,mapDispathToProps)(Home);