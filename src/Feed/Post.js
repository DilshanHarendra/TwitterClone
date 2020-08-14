import React, {useEffect, useState} from "react";
import "./Post.css";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

import {connect} from "react-redux";

import ReTweet from "./ReTweet";


function Post(props) {


    const [showReTweet, setShowReTweet] = useState('none');
    useEffect(()=>{
        var btn = document.getElementById('retweet');
        if(!props.retweet){
            btn.setAttribute('disable',true);
        }else{
            btn.removeAttribute('disable');
        }

    },[props.retweet])

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
        function retweet() {
            if (props.retweet){
                setShowReTweet('block')
            }

           //console.log()



        }
        function closeRetweet() {
            setShowReTweet('none')
        }


    return <div className="post d-flex p-3">
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
                <button className="align-items-center bicon re-tweet-button"  onClick={()=>retweet()}  id="retweet" >
                    <i className="fa fa-retweet mr-1" aria-hidden="true"></i> 1
                </button>
                <div className="align-items-center bicon">
                    <FavoriteBorderOutlinedIcon className="mr-1"/> 2
                </div>
                <div className="align-items-center bicon">
                    <i className="fa fa-upload mr-1" aria-hidden="true"></i>2
                </div>
            </div>
        </div>

        <ReTweet  data={props.data} show={showReTweet} close={closeRetweet}/>

    </div>

}
const mapStateToProps = state => {
    return {
        ...state
    }
}
export default connect(mapStateToProps)(Post);
