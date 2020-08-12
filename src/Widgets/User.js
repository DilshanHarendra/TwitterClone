import React from "react";

import './User.css';
function User({data,follow}) {
    return <div className="d-flex user-info mx-auto">
        <div className="d-flex">
            <img className="profile-picture" src={data.profileImg||""} alt={data.name}/>
            <div className="ml-2">
                <p className="name">{data.name}</p>
                <p className="text-secondary">{data.username}</p>
            </div>
        </div>

        {follow&&<button className="follow-btn">Follow</button>}

    </div>
}export default User;