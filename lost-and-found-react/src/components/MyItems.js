import React, { Component } from 'react';
import Item from './Item';

class MyItems extends Component {
    constructor() {
        super();
        this.state = {
            myItems: []
        }
    }
    componentDidMount() {
        const url = `http://localhost:3000/items/users/${this.props.user.username}`//filter through users
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log("DATAAAA", data)
                this.setState({
                    myItems: data
                }, function(){console.log(this.state.myItems)})
            })
            .catch(error => {
                console.log(error)
            })
    }
    renderItems() {

        return this.state.myItems.map((item, index) => {
            console.log("THE ITEM: ", item);
            return (
                <div key={index} onClick={() =>{
                   
                    this.props.setCurrentItem(item);
                    this.props.setView("itemshow");
                }}>
                <Item item={item} user={this.props.user} modifyMyItems={this.modifyMyItems.bind(this)}/>
                </div>


            )
        })
    }

    modifyMyItems(id){

    }
    

    render() {
        return (
            <div className="my-items">

                <h1>My Items</h1>
                {(this.state.myItems.length === 0) ?
                  <p>No Items Found.</p>
                 : this.renderItems()}

            </div>


        )

    }
}

export default MyItems;