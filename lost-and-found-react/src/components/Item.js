
import React  from "react";



const Item=(props)=>{
    return(
        <div className="item">
        <p>{props.item.name}</p>
        <p>{props.item.imageUrl}</p>
        <p>{props.item.addedBy}</p>
        <p>{props.item.addedDate}</p>
        
        </div>
    )
}

export default Item;










