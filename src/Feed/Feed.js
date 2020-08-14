import React from "react";
import "./Feed.css";
import NewFeed from "./NewFeed";
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import Post from "./Post";
import {connect} from "react-redux";

function Feed(props) {


    function calTime(h) {
        var postTime=new Date(h);
        var now= new  Date();
        var days=now.getDay()-postTime.getDay();
        var hours= Math.abs(now.getHours()-postTime.getHours())

        if (days===0){
            return hours;
        }else {
            return `${days}d ${hours}`;
        }


    }

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
        ):(props.posts.sort((a,b)=>a.time>b.time?-1:1).map(post=>(
                    post.retweet?(
                        <div  key={post.pid} className="p-3 re-post">
                            <div className="d-flex ml-3">
                                <img src={post.rprofileImg||"https://www.beaconmanagement.com/wp-content/uploads/2018/04/no-person.jpg"} alt={post.rname} className="profile-picture"/>
                                <div>
                                    <div className="d-flex post-data">
                                        <h2>{post.rname}</h2>
                                        <p className="text-secondary pt-3 ml-3">{post.rusername} {calTime(post.rtime)}h </p>
                                    </div>
                                    <p>{post.comment}</p>
                                    <Post data={post}  retweet={false} />
                                </div>
                            </div>

                        </div>
                    ):(
                        <Post data={post} key={post.pid} retweet={true}  />
                        )


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