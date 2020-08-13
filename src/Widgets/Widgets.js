import React, {useEffect, useState} from "react";
import "./Widgets.css";
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

import Topic from "./Topic";
import ListItem from "./ListItem";
import User from "./User";
import {connect} from "react-redux";
function Widget(props) {
    const [id,setId]=useState('');


    useEffect(()=>{
        setId(props.currentUser.uid)
    },[props.currentUser]);


    return(<div className="widget pt-2 pl-5">
            <input type="text" className="search p-2 pl-4" placeholder="&#xf002; Search Twitter"/>

            <div className="list">
                <Topic Topic="Trends for you" Icon={SettingsOutlinedIcon}/>
                <ListItem  Topic="Russia" Subject="Politics" Tweets={"471k"}/>
                <ListItem Topic="Prime Minister" Subject="Politics" Tweets={"104k"}/>
                <ListItem Topic="#coronavirus" Subject="Politics" Tweets={"157k"}/>
                <ListItem Topic="jungkook" Subject="kpop" Tweets={"904k"}/>
                <ListItem Topic="hobi" Subject="kpop" Tweets={"321k"}/>
                <div className="p-3 widget-box-end">
                    Show more
                </div>
            </div>


            <div className="list">
                <Topic Topic="Who to follow" />
                { props.allUsers.map(user=>((user.uid!==id)?(
                        <div className="p-3 widget-box" key={user.uid}>
                            <User data={user} follow={true}/>
                        </div>
                ):(<div key={user.uid}></div>)

                ))}



                <div className="p-3 widget-box-end">
                    Show more
                </div>

            </div>

            </div>
    )
}
const mapStateToProps=state=>{
    return{
        ...state
    }
}
export default connect(mapStateToProps)(Widget);