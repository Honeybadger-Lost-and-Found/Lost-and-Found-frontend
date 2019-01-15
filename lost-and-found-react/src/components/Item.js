
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





// class Items extends Component{
//     renderItems(){
//         return this.props.items.map((item, index) => {
//                 return (
//                     <div className="" key={index}>
//                         <div>
//                             <img src={this.props.items.imageUrl} alt="" />
//                         </div>
//                         <div>
//                             <p>Name:{item.name}</p>
//                           <select>
//                             <option value="found"></option>
//                             <option value="lost"></option>
//                             {/* <p>Type:{item.type}</p> */}
//                             </select>
                            
//                             <p>Added By:{item.addedBy}</p>
//                             <p>Added date{items.addedDate}</p>
//                         </div>


//                     </div>
//                 )
//             })
//         }


//    render() {
//        return(<div> {this.renderItems() }</div>);
//    }
// }




