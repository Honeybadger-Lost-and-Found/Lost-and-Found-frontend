import React, { Component } from 'react';
import Notifications, { notify } from 'react-notify-toast'
import Spinner from './imageUpload/Spinner'
import Images from './imageUpload/Images'
import Buttons from './imageUpload/Buttons'
import WakeUp from './imageUpload/WakeUp'

import { API_URL } from '../config'

const toastColor = {
    background: '#505050',
    text: '#fff'
}

class ImageUpload extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            uploading: false,
            images: []
        }
    }

    componentDidMount() {
        fetch(`${API_URL}/wake-up`)
            .then(res => {
                if (res.ok) {
                    return this.setState({ loading: false })
                }
                const msg = 'Something is went wrong with Heroku'
                this.toast(msg, 'custom', 2000, toastColor)
            })
    }

    toast = notify.createShowQueue()

    //my work
    handleUploadPhoto (){
  const url = 'http://localhost:3000/items';
  fetch(url)
}

  onChange = e => {
    const errs = [] 
    const files = Array.from(e.target.files)

    if (files.length > 3) {
      const msg = 'Only 3 images can be uploaded at a time'
      return this.toast(msg, 'custom', 2000, toastColor)  
    }

    const formData = new FormData()
    const types = ['image/png', 'image/jpeg', 'image/gif']

    files.forEach((file, i) => {

      if (types.every(type => file.type !== type)) {
        errs.push(`'${file.type}' is not a supported format`)
      }

      if (file.size > 150000) {
        errs.push(`'${file.name}' is too large, please pick a smaller file`)
      }

      formData.append(i, file)
    })

    if (errs.length) {
      return errs.forEach(err => this.toast(err, 'custom', 2000, toastColor))
    }

    this.setState({ uploading: true })

    fetch(`${API_URL}/image-upload`, {
      method: 'POST',
      body: formData
    })
    .then(res => {
      if (!res.ok) {
        throw res
      }
      return res.json()
    })
    .then(images => {
      this.setState({
        uploading: false, 
        images
      })
      console.log(images);
      this.props.setImgUrl(images[0].url);
      // take images and send to your api
    })
    .catch(err => {
      err.json().then(e => {
        this.toast(e.message, 'custom', 2000, toastColor)
        this.setState({ uploading: false })
      })
    })
  }

  filter = id => {
    return this.state.images.filter(image => image.public_id !== id)
  }

  removeImage = id => {
    this.setState({ images: this.filter(id) })
  }

  onError = id => {
    this.toast('Oops, something went wrong', 'custom', 2000, toastColor)
    this.setState({ images: this.filter(id) })
  }

  render(){
    const { loading, uploading, images } = this.state
    
    const content = () => {
      switch(true) {
        case loading:
          return <WakeUp />
        case uploading:
          return <Spinner />
        case images.length > 0:
          return <Images 
                  images={images} 
                  removeImage={this.removeImage} 
                  onError={this.onError}
                 />
        default:
          return <Buttons onChange={this.onChange} />
      }
    }
    return(
        <div className='form'>
        <Notifications />

        <div className='buttons'>
          {content()}
        </div> 

      </div>
    )
  }

}

export default ImageUpload;