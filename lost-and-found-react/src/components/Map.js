import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import React, { Component } from 'react';

const MapBox = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiZ290aGFtZXkiLCJhIjoiY2pxejRzMjVhMDlyZjQ1bGh4ZHdzaXkzMyJ9.3nRJUHgfnPtcOJvi9q06hw"
});
class Map extends Component {
  constructor() {
    super();
    this.state = {
      center: {
        lng: 46.70469633381731,
        lat: 24.633948443770308
      }
    }
  }

  render() {

    return (
      <MapBox
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "50vh",
          width: "50vw"
        }}
        center={[this.state.center.lng, this.state.center.lat]}
        onMove={(event) => {
          this.setState({ center: event.transform.center }, console.log(this.state.center))
          // console.log(event.transform.center);
        }}>
        <Layer
          type="symbol"
          id="marker"
          layout={{ "icon-image": "harbor-15" }}>
          <Feature coordinates={[this.state.center.lng, this.state.center.lat]} />
        </Layer>
      </MapBox>

    )
  }
}

export default Map;
