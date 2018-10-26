import React, { Component } from "react";
import axios from "axios";

class CountyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_API_URL + "county/" + this.props.id)
      .then(response => {
        this.setState({
          name: response.data.name,
          state: response.data.state,
          population: response.data.population,
          loaded: true
        });
      })
      .catch(e => {
        console.log(e.message);
        this.setState({
          name: "waaa",
          state: "waaa",
          population: "waaa",
          loaded: true
        });
      });
  }

  render() {
    return (
      <div className="App">
        {this.state.loaded ? (
          <div>
            <div>Name: {this.state.name}</div>
            <div>State: {this.state.state}</div>
            <div>Population: {this.state.population}</div>
          </div>
        ) : (
          <div>None</div>
        )}
      </div>
    );
  }
}

export default CountyInfo;
