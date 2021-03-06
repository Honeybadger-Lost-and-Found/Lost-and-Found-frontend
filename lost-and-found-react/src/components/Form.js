import React, { Component } from 'react';
import ImageUpload from './ImageUpload';
import Map from '../components/Map';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

            // console.log("SUBMITTING: ", data);
            const url = 'https://lost-and-found.herokuapp.com/items'
            fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    // console.log('Success');
                    this.props.concatMyItems(data);
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

            // console.log("EDITING: ", newItem);
            const url = `https://lost-and-found.herokuapp.com/${this.props.item.id}`
            fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newItem)
            })
                .then(response => response.json())
                .then(data => {
                    // console.log('EDIT Success for: ', data)
                    this.props.modifyMyItems(data);
                    // this.props.setCurrentItem(newItem)
                    // this.props.setView('itemshow');
                    // this.props.setFormType("new");
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    handleChange(event) {
        // console.log('changes');
        // let formData = {};
        // formData[event.target.name] = event.target.value;
        this.setState({ [event.target.name]: event.target.value });

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
        return (
        <div className="form-post">
        <div className="show-form">
        <br/>
            <h2>Lost/Found Something?</h2>

            <form className="formShow">
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

<div className="formBox">
                <label>Item Name:</label> <br></br> 
                <TextField type="text" onChange={this.handleChange.bind(this)} name="name" value={this.state.name} /> <br />
                <br></br>
                <label>Description: </label> <br>
                </br><TextField id="textArea" rows="4" cols="50" name="description" value={this.state.description} onChange={this.handleChange.bind(this)} /><br />
                <br></br>

                <label>Type: </label>


                <select name="type" onChange={this.handleChange.bind(this)}>
                    <option value='found' >Found</option>
                    <option value='lost' >Lost</option>
                    {(this.props.formType === "edit") ? <option value='archive' onChange={this.handleChange.bind(this)} >Archive</option> : ''}
                </select><br />

                <br></br>

                 <ImageUpload setImgUrl={this.setImgUrl.bind(this)} name="imageurl" /><br />

                <Button id="form-button"  onClick={this.handleSubmit.bind(this)}> Submit </Button>
                </div>
            </form>
            </div>
            

        </div>
        )
    }
}

export default Form;