import React, { Component } from 'react';
import Item from './Item';
class MyItems extends Component{
    constructor(){
        super();
        this.state={
            myItems:[]
        }
    }
    componentDidMount(){
        const url=`http://localhost:3000/items/users/${this.props.user.id}`//filter through users
        fetch(url)
        .then(response=>response.json())
        .then(data=>{
       console.log(data)
      this.setState({
          myItems: data
      })
        })
        .catch(error=>{
            console.log(error)
        })
    }
    renderItems(allItems){
        return allItems.map((item)=>{
        return(

            <div className="items" key={item}> 
            
            <Item item={this.state.myItems}/>
            </div>
        )
        })
    }

    render(){
        return(
            <div className="my-items">
            {(this.state.myItems.length === 0) ? <p>No Items Founds.</p> : this.renderItems() }
            
            
            </div>
        )
    }
}

export default MyItems;