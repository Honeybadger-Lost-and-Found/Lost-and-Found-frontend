import React, { Component } from 'react';
import ImageUpload from './ImageUpload';
import Map from '../components/Map';

class Form extends Component {
    constructor(props) {
        super(props);
        if (props.formType === "edit") {
            this.state = {
                name: props.item.name,
                description: props.item.description,
                type: props.item.type,
                imageurl: props.item.imageurl,
                lat: props.item.lat,
                lon: props.item.lon
            }
        }
        else {
            this.state = {
                name: '',
                description: '',
                type: 'found',
                imageurl: '',
                lat: 24.633948443770308,
                lon: 46.70469633381731
            }
        }
        //     this.state = {
        //     name: props.item ? props.item.name : '',
        //     description: props.item ? props.item.description : '',
        //     type: props.item ? props.item.type : 'found',
        //     imageurl: props.item ? props.item.imageurl : '',
        //     lat: props.item ? props.item.lat : '',
        //     lon: props.item ? props.item.lon : '',
        //     addedby: props.item ? props.item.addedby : '',
        //     addeddate: props.item ? props.item.addeddate : '',
        //     id: props.item ? props.item.id : null
        // }


    }
    handleSubmit(event) {


        event.preventDefault();
        if (this.props.formType === "new") {

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
            today = dd + '/' + mm + '/' + yyyy;
            //

            const data = {
                name: this.state.name,
                description: this.state.description,
                type: this.state.type,
                imageurl: this.state.imageurl,
                lat: this.state.lat,
                lon: this.state.lon,
                addedby: this.props.user.username,
                addeddate: today
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
                // .then(response => response.json())
                .then(data => {
                    console.log(data)
                    console.log('Success')
                    this.props.setView('myitems');
                })
                .catch(error => {
                    console.log(error)
                })

        }
        else {
            const newItem = {
                name: this.state.name,
                description: this.state.description,
                type: this.state.type,
                imageurl: this.state.imageurl,
                lat: this.state.lat,
                lon: this.state.lon,
                addedby: this.props.user.username,
                addeddate: this.props.item.addeddate
            }

            console.log("EDITING: ", newItem);
            const url = `http://localhost:3000/items/${this.props.item.id}`
            fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newItem)
            })
                // .then(response => response.json())
                .then(data => {
                    console.log(data)
                    console.log('EDIT Success')
                    this.props.setCurrentItem(newItem)
                    this.props.setView('itemshow');
                    this.props.setFormType("new");
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    handleChange(event) {
        console.log('changes');
        // let formData = {};
        // formData[event.target.name] = event.target.value;
        this.setState({ [event.target.name]: event.target.value }, console.log("THE STATE: ", this.state));

    }
    setImgUrl(url) {
        this.setState({ imageurl: url });
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
                {this.props.formType === "new" ?
                    <Map mode='form'
                        lon={46.70469633381731}
                        lat={24.633948443770308}
                        setLongitude={this.setLongitude.bind(this)}
                        setLatitude={this.setLatitude.bind(this)}
                    /> :
                    <Map mode='form'
                        lon={this.props.item.lon}
                        lat={this.props.item.lat}
                        setLongitude={this.setLongitude.bind(this)}
                        setLatitude={this.setLatitude.bind(this)}
                    />
                }


                <label>Item Name: <input type="text" onChange={this.handleChange.bind(this)} name="name" value={this.state.name} /> </label> <br />
                <label>Description: </label><textarea rows="4" cols="50" name="description" value={this.state.description} onChange={this.handleChange.bind(this)} /><br />
                <label>Type: </label><select name="type" onChange={this.handleChange.bind(this)}>
                    <option value='found' >Found</option>
                    <option value='lost' >Lost</option>
                    {(this.props.formType === "edit") ? <option value='archive' onChange={this.handleChange.bind(this)} >Archive</option> : ''}
                </select><br />

                <label>Image: </label> <ImageUpload setImgUrl={this.setImgUrl.bind(this)} name="imageurl" /><br />

                <button>Submit</button>
            </form>
        </div>
        )
    }
}

export default Form;