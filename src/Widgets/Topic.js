import React from "react";


function Topic({Topic, Icon} ) {

    return <div className="d-flex justify-content-between topic mt-3">
        <h1 className="list-Topic ml-3">
            {Topic}
        </h1>
        {Icon&&<Icon className="setting mr-3"/>}

    </div>
}export default Topic;