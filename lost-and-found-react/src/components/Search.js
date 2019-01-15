import React, { Component } from 'react';
import Item from '../components/Item'

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
    const url = ('http://localhost:3000/items')
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('get data from the api: ', data)
        this.setState({ items: data });
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
          console.log("\n\n\n\n\n\n ************", item[key], key)
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
      return(
        <div>
          <p>No results found.</p>
        </div>
      )
    }
    else {

      return this.state.results.map((result, index) => {

        return <Item key={index} item={result} />
      })
    }
  }


  render() {
    return (
      <div>

        <div className="back"> Back</div>

        <div className="search-container">

          <form className="search" onSubmit={this.handleSubmit.bind(this)}>

            <input type="text" onChange={this.handleChange.bind(this)} />
            <button> <img src="https://i.imgur.com/WX7bym4.png" alt="" /> </button>

          </form>

          {(this.state.searched) ? this.renderResults() : ""}

        </div>

      </div>
    )
  }
}


export default Search;