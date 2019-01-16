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
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    renderItems() {
        return this.state.myItems.map((item, index) => {
            return (
                <div key={index}>
                    <Item item={item} />
                </div>
            )
        })
    }

    render() {
        return (
            <div className="my-items">
                {(this.state.myItems.length === 0) ? <p>No Items Found.</p> 
                : this.renderItems()}
            </div>
        )
    }
}

export default MyItems;