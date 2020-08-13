import React, { useState} from "react";
import {connect} from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import {addNewPost, addReTweet, getAllPosts} from "../dbHandler";


function ReTweet(props) {

    const [mess,setMess]=useState('');
    const[err,setErr]=useState('')


    function retweet(post) {
        var rid=`r${post.pid}`
        if (mess===""){
            setErr("Enter Comment")
        }else{
            setErr("")
        }
        addReTweet(props.currentUser.uid, post.pid,mess).then(m=>{

            var ruser={
                ruid:props.currentUser.uid,
                rname:props.currentUser.name,
                rusername:props.currentUser.username,
                rpass:props.currentUser.pass,
                rprofileImg:props.currentUser.profileImg,
                rtime:new Date()
            }
            var post={...props.data,pid:rid,retweet:true,newmessage:mess,...ruser}
            props.addNewPost(post);
            props.close()
            }
        ).catch(err=>console.log(err))



    }

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

    return <div style={{display:props.show}} className="re-tweet-main"  >

        <div className="re-tweet">
            <div className="pb-3 p-1 re-tweet-close" onClick={props.close}>
                <CloseIcon/>
            </div>

            <div className="d-flex pl-3">
                <img src={props.currentUser.profileImg||"https://www.beaconmanagement.com/wp-content/uploads/2018/04/no-person.jpg"} className="tweet-my-profile-picture" alt={props.currentUser.name}/>

                <input type="text" placeholder="Add a comment" className="ml-3 re-tweet-mess" value={mess} onChange={(e)=>setMess(e.target.value)}/>
            </div>
            <p className="text-danger text-center">{err}</p>
            <div className="retweet-body">


                <div className="re-tweet-post d-flex p-3">
                    <img src={props.data.profileImg||"https://www.beaconmanagement.com/wp-content/uploads/2018/04/no-person.jpg"} className="profile-picture" alt={props.data.name}/>
                    <div className="post-data ml-3">
                        <div className="d-flex">
                            <h2>{props.data.name}</h2>
                            <p className="text-secondary ml-3">{props.data.username} {calTime(props.data.time)}h </p>
                        </div>

                        <p>{props.data.details}</p>
                        <img className="post-image" src={props.data.postImg} alt=""/>
                        <div className="d-flex mt-2 justify-content-between pl-2 pr-2 text-secondary">
                            <div className="align-items-center bicon">
                                <i className="fa fa-comment-o mr-1" aria-hidden="true"></i> 1
                            </div>
                            <div className="align-items-center bicon" onClick={()=>retweet(props.data.id)} >
                                <i className="fa fa-retweet mr-1" aria-hidden="true"></i> 1
                            </div>
                            <div className="align-items-center bicon">
                                <FavoriteBorderOutlinedIcon className="mr-1"/> 2
                            </div>
                            <div className="align-items-center bicon">
                                <i className="fa fa-upload mr-1" aria-hidden="true"></i>2
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-2 d-block">
                <button className="re-tweet-btn save ml-auto d-block" onClick={()=>retweet(props.data)} >
                    Retweet
                </button>
            </div>


        </div>

    </div>
}const mapStateToProps = state => {
    return {
        ...state
    }
}
const mapDispathToProps=dispatch=>{
    return{
        addNewPost:(post)=>{dispatch({type:'addNewPost',post:post})},
    }
}
export default connect(mapStateToProps,mapDispathToProps)(ReTweet);