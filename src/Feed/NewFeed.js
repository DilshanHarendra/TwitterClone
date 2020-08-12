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
        console.log(props.currentUser.id)
        function post() {
            if (message===""||img===""){
                setErr("block");
            }else{
                setErr("none");
                addNewPost(parseInt(props.currentUser.id) ,message,img).then(m=>{
                    getAllPosts().then(r=>{
                        console.log(r)
                        props.addAllPosts(r)
                    }).catch(err=>console.log(err))

                        setMessage("");
                        setErr("")

                }).catch(err=>{
                    console.log(err)
                })
            }
        }


    return <div className=" new-feed mt-2">
        <div className="d-flex">
            <img src={props.currentUser.profileImg||""} className="profile" alt="profile"/>
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
        addAllPosts:(posts)=>{dispatch({type:'addPosts',posts:posts})},

    }
}
export default connect(mapStateToProps,mapDispathToProps)(NewFeed);