import React from "react";



const Item = (props) => {

    return (
        <div className="item">
            <p className="p">{props.item.name}</p>
            <img className="img" src={props.item.imageurl} alt="" />
            <p className="p">{props.item.addedby}</p>
            <p className="p">{props.item.addeddate}</p>
        
           
        </div>
    )
}

export default Item;










