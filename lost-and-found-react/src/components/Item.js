
import React  from "react";



const Item=(props)=>{
    return(
        <div className="item">
        <p>{props.activeView.name}</p>
        <p>{props.activeView.imageUrl}</p>
        <p>{props.activeView.addedBy}</p>
        <p>{props.activeView.addedDate}</p>
        
        </div>
    )
}

export default Item;










