import React, {useEffect, useState} from "react";
import "./Post.css";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

import {connect} from "react-redux";
function Post(props) {

    const [user, setUser] = useState([]);

    useEffect(()=>{
        props.allUsers.forEach(user => {
            if (user.id === props.data.userid) {
                setUser(user);
            }
        })
    },[props])
    function calTime(h) {
        var time = new Date(h).getHours();
        var now = new Date().getHours();
        return now - time;
    }



    return <div className="post d-flex p-3">
        <img src={user.profileImg||"https://www.beaconmanagement.com/wp-content/uploads/2018/04/no-person.jpg"} className="profile-picture" alt={user.name}/>
        <div className="post-data ml-3">
            <div className="d-flex">
                <h2>{user.name}</h2>
                <p className="text-secondary ml-3">{user.username} {calTime(props.data.time)}h </p>
            </div>

            <p>{props.data.details}</p>
            <img className="post-image" src={props.data.postImg} alt=""/>
            <div className="d-flex mt-2 justify-content-between pl-2 pr-2 text-secondary">
                <div className="align-items-center">
                    <i className="fa fa-comment-o mr-1" aria-hidden="true"></i> 1
                </div>
                <div className="align-items-center">
                    <i className="fa fa-retweet mr-1" aria-hidden="true"></i> 2
                </div>
                <div className="align-items-center">
                    <FavoriteBorderOutlinedIcon className="mr-1"/> 2
                </div>
                <div className="align-items-center">
                    <i className="fa fa-upload mr-1" aria-hidden="true"></i>2
                </div>
            </div>
        </div>
    </div>

}
const mapStateToProps = state => {
    return {
        ...state
    }
}
export default connect(mapStateToProps)(Post);
