
import React, {Component} from "react";


class Items extends Component{
    renderItems(){
        return this.props.items.map((item, index) => {
                return (
                    <div className="" key={index}>
                        <div>
                            <img src={this.props.items.imageUrl} alt="" />
                        </div>
                        <div>
                            <p>Name:{item.name}</p>
                          <select>
                            <option value="found"></option>
                            <option value="lost"></option>
                            {/* <p>Type:{item.type}</p> */}
                            </select>
                            
                            <p>Added By:{item.addedBy}</p>
                            <p>Added date{item.addedDate}</p>
                        </div>


                    </div>
                )
            })
        }


   render() {
       return(<div> {this.renderItems() }</div>);
   }
}




export default Items;