import React, {useState} from "react";
import "./NewFeed.css";
import PublicIcon from '@material-ui/icons/Public';
import PanoramaIcon from '@material-ui/icons/Panorama';
import GifIcon from '@material-ui/icons/Gif';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import InsertEmoticonOutlinedIcon from '@material-ui/icons/InsertEmoticonOutlined';
import {connect} from "react-redux";
import {addNewPost, getAllPosts} from "../dbHandler";

function NewFeed(props) {
        const [message, setMessage]=useState("");
        const [img, setImg]=useState("");
        const [err, setErr]=useState("none");

        function post() {
            if (message===""||img===""){
                setErr("block");
            }else{
                setErr("none");
                addNewPost(parseInt(props.currentUser.uid) ,message,img).then(m=>{
                    setMessage("");
                    setImg("")
                    var post={
                        details:message,
                        name: props.currentUser.name,
                        pass: props.currentUser.pass,
                        pid: props.posts.length+1,
                        postImg: img,
                        profileImg: props.currentUser.profileImg,
                        time: new Date(),
                        uid: props.currentUser.uid,
                        username: props.currentUser.username
                    }
                    props.addNewPost(post)



                }).catch(err=>{
                    console.log(err)
                })
            }
        }


    return <div className=" new-feed mt-2">
        <div className="d-flex">
            <img src={props.currentUser.profileImg||"https://www.beaconmanagement.com/wp-content/uploads/2018/04/no-person.jpg"} className="profile" alt={props.currentUser.username}/>
            <div className="post-data ml-3" >
                <p className="text-left text-danger" style={{display:err}} >Please Fill All Details</p>
                <input type="text" placeholder="What's happening?" className="p-1" value={message} onChange={(e)=>setMessage(e.target.value)}/>
                <input type="text" placeholder="Image Url" className="p-1"  value={img} onChange={(e)=>setImg(e.target.value)}/>
                <p className="privacy"><PublicIcon/> Everyone can reply</p>
                <hr/>

            </div>
        </div>

        <div className="d-flex justify-content-between">
            <div className="d-flex bottom-icons">
                <PanoramaIcon className="m-1"/>
                <GifIcon className="m-1"/>
                <InsertChartIcon className="m-1" />
                <InsertEmoticonOutlinedIcon className="m-1"/>
            </div>
            <button className="tweet" onClick={post}>Tweet</button>
        </div>
    </div>
}
const mapStateToProps=state=>{
    return{
        ...state
    }
}
const mapDispathToProps=dispatch=>{
    return{
        addNewPost:(post)=>{dispatch({type:'addNewPost',post:post})},

    }
}
export default connect(mapStateToProps,mapDispathToProps)(NewFeed);