import React, {Component} from 'react';
import "./Sidebar.css";
import SidebarLink from "./SidebarLink";

import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import TwitterIcon from "@material-ui/icons/Twitter";

import User from "../Widgets/User";
import {connect} from "react-redux";
class Sidebar extends Component {




    render() {
        return (
            <div id="sidebar" className="side-bar">
                <TwitterIcon className="twitter-icon ml-2 mt-2 mb-2"/>
                <SidebarLink name="Home" Icon={HomeIcon}/>
                <SidebarLink name="Explore" Icon={SearchIcon}/>
                <SidebarLink name="Notification" Icon={NotificationsNoneIcon}/>
                <SidebarLink name="Message" Icon={MailOutlineIcon}/>
                <SidebarLink name="Bookmarks" Icon={BookmarkBorderIcon}/>
                <SidebarLink name="Lists" Icon={ListAltIcon}/>
                <SidebarLink name="Profile" Icon={PermIdentityIcon}/>
                <SidebarLink name="More" Icon={MoreHorizIcon}/>

                <button className="twitter-button mx-auto mb-4 mt-3"> Twitter</button>

                <User data={this.props.currentUser}/>
            </div>

        );
    }
}
const mapStateToProps=state=>{
    return{
        ...state
    }
}

export default connect(mapStateToProps)(Sidebar);