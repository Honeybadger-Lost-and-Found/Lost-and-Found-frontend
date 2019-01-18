import React, { Component } from 'react'
import Map from '../components/Map';

class ItemShow extends Component {
    constructor() {
        super();
        this.state = {
            // modal: false,
            // name: props.setCurrentItem ? props.setCurrentItem.name : '',
            // type: props.setCurrentItem ? props.setCurrentItem.type : '',
            // imageUrl: props.setCurrentItem ? props.setCurrentItem.imageUrl : '',
            // lat: props.setCurrentItem ? props.setCurrentItem.lat : '',
            // lon: props.setCurrentItem ? props.setCurrentItem.lon : '',
            // addedBy: props.setCurrentItem ? props.setCurrentItem.addedBy : '',
            // addedDate: props.setCurrentItem ? props.setCurrentItem.addedDate : '',
            // id: props.setCurrentItem ? props.setCurrentItem.id : null,
        }
    }

    handelChange(event) {
        const currInput = event.target.name;
        const newValue = event.target.value;
        console.log('current input', currInput);
        console.log('new value:', newValue);

        this.setState({
            [currInput]: newValue
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.handleSubmit(this.state)
    }

    toggleModal() {
        this.setState({ modal: !this.state.modal });
    }


    render() {
        return (
            <div className="showItem">
                <Map mode="show" item={this.props.currentItem} 
                     lon={this.props.currentItem.lon}
                     lat={this.props.currentItem.lat}/>
                <h2>{this.props.currentItem.name}</h2>
                <img src={this.props.currentItem.imageurl} alt="Item_Image" />
                <p>Description: {this.props.currentItem.description}</p>
                <p>Type: {this.props.currentItem.type}</p>
                <p>Added By:{this.props.currentItem.addedby}</p>
                <p>Added on:{this.props.currentItem.addeddate}</p>


                {/* BEFORE MERGE */}
                {/* { (this.props.user && (this.props.user.username === this.props.currentItem.addedby)) ?
                
                {(this.props.user.username === this.props.currentItem.addedby) ? */}

                    <div className="buttons">
                        <button onClick={() => { 
                            this.props.deleteItem();
                            this.props.setView("landing");
                             }}>Delete</button>

                        <button onClick={() => { 
                      
                        this.props.setFormType("edit");
                        this.props.setView("form");
                        }}>Edit</button>

                    </div>
                    : ''}


            </div>
        )
    }
}
export default ItemShow;