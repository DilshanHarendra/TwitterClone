import React from "react";
import "./Feed.css";
import NewFeed from "./NewFeed";
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import Post from "./Post";
import {connect} from "react-redux";

function Feed(props) {


    return <div className="feed">
        <div className="d-flex title justify-content-between p-3 ">
            <h1>Home </h1>
            <StarBorderOutlinedIcon className="mr-2"/>
        </div>
        <NewFeed/>

        {props.posts.length===0?(
            <div>
                <div className="no-post p-2 pt-4">
                    <h1 className="text-center">
                        Welcome to Twitter!
                    </h1>
                    <p className="text-center">
                        This is the best place to see what’s happening in your world.
                        Find some people and topics to follow now.
                    </p>
                    <button className="">Let's go!</button>
                </div>
                <br/>
            </div>
        ):(props.posts.map(post=>(
                    <Post data={post} key={post.id} />
                ))
        )}





    </div>
}
const mapStateToProps=state=>{
    return{
        ...state
    }
}

export default connect(mapStateToProps)(Feed);