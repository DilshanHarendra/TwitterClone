import React, {useEffect} from 'react';
import Widget from "../Widgets/Widgets";
import "./home.css";
import Feed from "../Feed/Feed";
import Sidebar from "../SideBar/Sidebar";
import {connect} from "react-redux";
import {getAllPosts, getAllRetweet, getUsers} from "../dbHandler";

function Home(props) {

    var username=window.localStorage.getItem("username");
    if (username===null||username.toString().trim()===""){
        props.history.push('/signin')
    }
    useEffect(()=>{
        getUsers().then( r=>{
                props.addAllUser(r)
            }).catch(err=>console.log(err));

        getAllPosts().then(r=>{

            props.addAllPosts(r)
        }).catch(err=>console.log(err))

        getAllRetweet().then(data=>{

            var ndata=[...data];
            ndata.forEach(post=>{
                var rid="r"+post.pid
                var data={...post,pid:rid,retweet:true}
                props.addNewPost(data);
            })


        }).catch(err=>console.log(err))

    },[]);
    useEffect(()=>{
        props.allUsers.forEach(user=>{
            if (user.username===`@${username.toString().trim()}`){
                props.setCurrentUser(user)
            }
        })
    },[props.allUsers,username]);




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
        setCurrentUser:(user)=>{dispatch({type:'currentUser',user:user})},
        addNewPost:(post)=>{dispatch({type:'addNewPost',post:post})},
    }
}
export default connect(mapStateToProps,mapDispathToProps)(Home);