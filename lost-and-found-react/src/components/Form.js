import React, { Component } from 'react';
import ImageUpload from './ImageUpload';
import Map from '../components/Map';

class Form extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            description: '',
            type: 'found',
            imageUrl: '',
            lat: 0,
            lon: 0,
            addedBy: '',
            addedDate: ''
        }
    }
    handleSubmit(event) {
        event.preventDefault();

        //get current date and format it
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = mm + '/' + dd + '/' + yyyy;
        //

        const data = {
            name: this.state.name,
            description: this.state.description,
            type: this.state.type,
            imageUrl: this.state.imageUrl,
            lat: this.state.lat,
            lon: this.state.lon,
            addedBy: this.props.user.username,
            addedDate: today
        }

        console.log("SUBMITTING: ", data);
        const url = 'http://localhost:3000/items'
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(data => {
                console.log(data)
                console.log('Success')
                this.props.setView('myitems');
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleChange(event) {
        console.log('changes');
        let formData = {};
        formData[event.target.name] = event.target.value;
        this.setState(formData);
    }
    setImgUrl(url) {
        this.setState({ imageUrl: url });
    }
    setLongitude(longitude) {
        this.setState({ lon: longitude });
    }
    setLatitude(latitude) {
        this.setState({ lat: latitude });
    }

    render() {
        return (<div className="form">
            <h3>Lost/Found Something?</h3>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <Map mapMode='form'
                    setLongitude={this.setLongitude.bind(this)}
                    setLatitude={this.setLatitude.bind(this)}
                />
                <label>Item Name: </label><input type="text" onChange={this.handleChange.bind(this)} name="name" /><br />
                <label>Description: </label><textarea rows="4" cols="50"  name="description" onChange={this.handleChange.bind(this)}/><br />
                <label>Type: </label><select>
                    <option value='found' onChange={this.handleChange.bind(this)} >Found</option>
                    <option value='lost' onChange={this.handleChange.bind(this)} >Lost</option>
                </select><br />
                <label>Image: </label> <ImageUpload setImgUrl={this.setImgUrl.bind(this)} name="imageUrl" /><br />
                {/* <label>Latitude: </label><input type="number" onChange={this.handleChange.bind(this)} name="lat" /><br/>
        <label>Longitude: </label><input type="number" onChange={this.handleChange.bind(this)} name="lon" /><br/> */}
                <button>Submit</button>
            </form>
        </div>)
    }
}

export default Form;