import React from "react";
import "./Post.css";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import userData from "../userData";
function Post() {

    return <div className="post d-flex p-3">
        <img src={userData.profilePicture} className="profile-picture" alt={userData.username}/>
        <div className="post-data ml-3">
            <div className="d-flex">
                <h2>Username</h2>
                <p className="text-secondary ml-3">@Username 4h </p>
            </div>

            <p>The new Cabinet will be sworn in tomorrow at the Auditorium, Magul Maduwa, in Kandy. 28 Cabinet Ministers and 40 State Ministers to be appointed.
                Live via
                <span>@GotabayaR</span>

                Facebook page.
                <span>#SriLanka</span> <span>#LKA</span> <span>#CabinetSL</span> <span>#GenElecSL</span>    </p>
            <img className="post-image" src={userData.profilePicture} alt=""/>
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
}export default Post;
