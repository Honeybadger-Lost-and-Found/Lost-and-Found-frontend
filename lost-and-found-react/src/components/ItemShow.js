import React, { Component } from 'react'

class ItemShow extends Component {
    constructor() {
        super();
        this.state = {
            modal: false
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
                <h2>{this.props.currentItem.name}</h2>
                <img src={this.props.currentItem.imageurl} alt="Item_Image" />
                <p>Description: {this.props.currentItem.description}</p>
                <p>Type: {this.props.currentItem.type}</p>
                <p>Added By:{this.props.currentItem.addedby}</p>
                <p>Added on:{this.props.currentItem.addeddate}</p>
                {/* <Map lon={this.props.item.lon}
                    lat={this.props.item.lat} /> */}


                {/* <form className="show-form"onSubmit={this.handleSubmit.bind(this)}/>

            <label>Name:</label><input type="text" value={this.state.name} name="name" onChange={this.handelChange.bind(this)}/><br/>
            <label>Type:</label><input type="text" value={this.state.type} name="type" onChange={this.handelChange.bind(this)}/><br/>
            <label>Image:</label><input type="text" value={this.state.imageUrl} name="imageUrl" onChange={this.handelChange.bind(this)}/><br/>
            <label>Lat:</label><input type="number" value={this.state.lat} name="lat" onChange={this.handelChange.bind(this)}/><br/>
            <label>Lon:</label><input type="number" value={this.state.lon} name="lon" onChange={this.handelChange.bind(this)}/><br/>
            <label>Added by:</label><input type="text" value={this.state.addedBy} name="addedBy" onChange={this.handelChange.bind(this)}/><br/>
            <label>Added date:</label><input type="text" value={this.state.addedDate} name="addedDate" onChange={this.handelChange.bind(this)} /><br/> */}

                {(this.props.user.username === this.props.currentItem.addedby) ?
                    <div className="buttons">
                        <button onClick={() => { 
                            this.props.deleteItem();
                            this.props.setView("myitems");
                             }}>Delete</button>
                        <button onClick={() => { this.toggleModal() }}>Edit</button>
                    </div>
                    : ''}


            </div>
        )
    }
}
export default ItemShow;