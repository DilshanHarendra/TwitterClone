import React from "react";

function ListItem({Subject,Topic,Tweets}) {

    return <div className="list-item widget-box">
        <p className="item-top text-secondary p-0 m-0">
            {Subject} . Trends
        </p>
        <p className="item-center mb-1">
            {Topic}
        </p>
        <p className="item-bottom text-secondary p-0 m-0">
            {Tweets} Tweets
        </p>
    </div>
}export default ListItem;