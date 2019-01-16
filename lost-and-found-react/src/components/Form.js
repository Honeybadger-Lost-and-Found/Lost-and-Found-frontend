import React, { Component } from 'react';
import ImageUpload from './ImageUpload';

class Form extends Component {
constructor(props){
    super(props);
    this.state = {
        name : '',
        type : '',
        imageUrl : '',
        lat : 0,
        lon : 0 ,
        addedBy : '',
        addedDate : ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
}
    handleSubmit(event){
        event.preventDefault();
        const now = new Date();
        const data = {
            name : this.state.name,
            type : this.state.type,
            imageUrl : this.state.imageUrl,
            lat : this.state.lat,
            lon : this.state.lon,
            addedBy : this.props.user.username,
            addedDate : now
        }

        console.log( "SUBMITTING: ", data);
        const url = 'http://localhost:3000/items'
        fetch(url,{
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
          .then(data => {
              console.log(data)
              console.log('Success')
          })
          .catch(error => {
              console.log(error)
          })
    }

    handelChange(event){
        console.log('changes');
        let formData = {};
        formData[event.target.name] = event.target.value;
        this.setState(formData);
    }
    setImgUrl(url){
        this.setState({imageUrl: url});
    }

    render(){
        return(<div className="form">
        <h3>Lost/Found Somthing?</h3>
        <form onSubmit ={this.handleSubmit.bind(this)}>
        <label>Item Name: </label><input type="text"  onChange={this.handelChange.bind(this)} name="name" /><br/>
        <label>Type: </label><select>
        <option value='found' onChange={this.handelChange.bind(this)} >Found</option>
        <option value='lost' onChange={this.handelChange.bind(this)} >Lost</option>
        </select><br/>
        <label>Image: </label> <ImageUpload setImgUrl={this.setImgUrl.bind(this)} onChange={this.handelChange.bind(this)}   name="imageUrl" /><br/>
        <label>Latitude: </label><input type="number" onChange={this.handelChange.bind(this)}  name="lat" /><br/>
        <label>Longitude: </label><input type="number" onChange={this.handelChange.bind(this)}   name="lon" /><br/>
        <button>Submit</button>
        </form>
        </div>)
    }
}

export default Form;