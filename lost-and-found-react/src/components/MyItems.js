import React, { Component } from 'react';
import Item from './Item';
import Card from '@material-ui/core/Card';


class MyItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myItems: props.myItems
        }
    }
    renderItems() {

        return this.state.myItems.map((item, index) => {
            // console.log("THE ITEM: ", item);
            return (
                <div key={index} onClick={() =>{
                   
                    this.props.setCurrentItem(item);
                    this.props.setView("itemshow");
                }}>
                <Item item={item} user={this.props.user}/>
                </div>

            )
        })
    }
    

    render() {
        return (
            <Card id="myItemsCard">
            <div className="my-items">
                <h1>My Items</h1>
                {(this.state.myItems.length === 0) ?
                  <p>No Items Found.</p>
                 : this.renderItems()}
            </div>
            </Card>

        )
    }
}

export default MyItems;