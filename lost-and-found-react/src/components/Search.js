import React, { Component } from 'react';
import Item from '../components/Item'
import Map from '../components/Map';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';


class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      items: [],
      results: [],
      searched: false
    }
  }


  componentDidMount() {
    const url = ('https://lost-and-found.herokuapp.com/items')
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // console.log('get data from the api: ', data)
        this.setState({
          items: data,
          searched: false,
          results: []
        });
      })
      .catch(error => {
        console.log(error);
      })
  }


  handleChange(event) {
    this.setState({
      searchTerm: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    // const filteredArray = this.state.items.includes("S");
    const filteredArray = this.state.items.filter(item => {

      let found = false;
      for (let key in item) {
        if (item[key].toString().includes(this.state.searchTerm)) {
          // console.log("\n\n\n\n\n\n ************", item[key], key)
          found = true;
        }
      }

      return found

    })
    this.setState({
      results: filteredArray,
      searched: true
    });
  }


  renderResults() {
    if (this.state.results.length === 0) {
      return (
        <div>
          <p>No results found.</p>
        </div>
      )
    }
    else {

      return this.state.results.map((result, index) => {
        return (
          <div key={index} onClick={() => {
            // console.log("THE RESULT: ", result);
            this.props.setCurrentItem(result);
            this.props.setView("itemshow");
          }}>
            <Item item={result} />
          </div>
        )
      })
    }
  }


  render() {
    return (
      <div>

        <div>
          {this.state.searched ?
            <Map mode="search" items={this.state.results}
              lon={46.70469633381731}
              lat={24.633948443770308}
              setView={this.props.setView}
              setCurrentItem={this.props.setCurrentItem} />
            : <Map mode="search" items={this.state.items}
              lon={46.70469633381731}
              lat={24.633948443770308}
              setView={this.props.setView}
              setCurrentItem={this.props.setCurrentItem} />
          }

          <form className="search" >
            <br></br><input className="input-text" type="text" placeholder="Search.." onChange={this.handleChange.bind(this)} />
          <br></br><Button id="search-button" onClick={this.handleSubmit.bind(this)}>Submit</Button>
          </form>

          
          <Card id="resultCard">  

          {(this.state.searched) ? this.renderResults() : ""}

          </Card>

        </div>

      </div>
    )
  }
}


export default Search;