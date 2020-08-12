import React from 'react';
import "./SidebarLink.css";
function SidebarLink({name, Icon}){

        return (
            <div className="d-flex side-bar-link ">
                <Icon/>
                <h1>{name}</h1>
            </div>
        );

}

export default SidebarLink;