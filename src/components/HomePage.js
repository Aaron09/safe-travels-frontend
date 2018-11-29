import React, { Component } from "react";
import axios from "axios"
import { Typeahead } from 'react-bootstrap-typeahead'
import { Link } from 'react-router-dom'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false, counties: [{id: 6273, label: 'abc'}, {id: 6214, label: 'bcd'}], selected: [] };
  }

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_API_URL + "county/")
      .then(response => {
        const counties = response.data.counties.map(county => ({label: county.fields.name + ', ' + county.fields.state, id: county.pk}))
        this.setState({
          counties,
          loaded: true
        });
      })
      .catch(e => {
        console.log(e.message);
        this.setState({
          loaded: true
        });
      });
  }

  render() {
    return (
      <div className="background-container">
        <div className="center-transparent-box">
          <h1>Welcome to SafeTravels!</h1>
          <h5>Start typing a county...</h5>
          <Typeahead options={this.state.counties} onChange={selected => this.setState({selected})}/>      
          {this.state.selected.length > 0 ? (<Link to={"/county/" + this.state.selected[0].id}>
            <button className="searchButton" type="submit">
              Submit
            </button>
          </Link>) : (<div/>)}
        </div>
      </div>
    );
  }
}

export default HomePage
