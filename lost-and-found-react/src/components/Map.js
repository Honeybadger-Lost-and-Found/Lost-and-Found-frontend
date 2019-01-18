import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import React, { Component } from 'react';

const MapBox = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiZ290aGFtZXkiLCJhIjoiY2pxejRzMjVhMDlyZjQ1bGh4ZHdzaXkzMyJ9.3nRJUHgfnPtcOJvi9q06hw"
});
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: props.mode,
      center: {
        lng: props.lon,
        lat: props.lat
      },
      hover: false,
      hoveredItem: null
    }
  }
  onToggleHover(item, cursor, event) {
    // console.log(event)
    event.map.getCanvas().style.cursor = cursor;

    this.setState({
      hovered: !this.state.hovered,
      hoveredItem: item
    })
  }

  renderMap() {
    if (this.state.mode === "form") {
      return (
        <MapBox
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "50vh",
            width: "75vw"
          }}
          center={[this.state.center.lng, this.state.center.lat]}
          onMove={(event) => {
            this.setState({ center: event.transform.center }, console.log(this.state.center))
            // console.log(event.transform.center);
            this.props.setLongitude(event.transform.center.lng);
            this.props.setLatitude(event.transform.center.lat);
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
    else if (this.state.mode === "show") {
      return (
        <MapBox
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "50vh",
            width: "50vw"
          }}
          center={[this.state.center.lng, this.state.center.lat]}
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "harbor-15" }}>
            <Feature coordinates={[this.props.item.lon, this.props.item.lat]} />
          </Layer>
        </MapBox>
      )
    }
    else if (this.state.mode === "edit") {
      // return (
      //   <div></div>
      // )
    }
    else if (this.state.mode === "search") {
      return (
        <MapBox
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "50vh",
            width: "75vw"
          }}
          
          center={[this.state.center.lng, this.state.center.lat]}
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "harbor-15" }}>
            {this.props.items.map((item, index) => (
              <Feature key={index}
                onMouseEnter={this.onToggleHover.bind(this, item, 'pointer')}
                onMouseLeave={this.onToggleHover.bind(this, {}, '')}
                onClick={() => {
                  const newCenter = {
                    lng: item.lon,
                    lat: item.lat
                  }
                  this.setState({
                    center: newCenter
                  })
                  // this.props.setCurrentItem(item);
                  // this.props.setView("itemshow");
                }}
                onDblClick={() => {
                  // doubleClickZoom.disable
                  console.log("HIIIIIIIII");
                  this.props.setCurrentItem(item);
                  this.props.setView("itemshow");
                }}
                coordinates={[item.lon, item.lat]}
              />
            ))}
            {/* <Feature coordinates={[this.state.center.lng, this.state.center.lat]} /> */}
          </Layer>
          {(this.state.hovered) &&
            (<Popup key={this.state.hoveredItem.id} coordinates={[this.state.hoveredItem.lon, this.state.hoveredItem.lat]}>
              <div>
                <div>{this.state.hoveredItem.name}</div>
                <div>Added by: {this.state.hoveredItem.addedby}</div>
                <div>Added on: {this.state.hoveredItem.addeddate}</div>
              </div>
            </Popup>)}
        </MapBox>
      )
    }
  }

  render() {

    return (
      <div className="mapContainer">

        {this.renderMap()}

      </div>

    )
  }
}

export default Map;
