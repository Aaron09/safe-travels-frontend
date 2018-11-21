import React, { Component } from "react";
import axios from "axios";
import ImageList from "./ImageList"
import ImageUpload from "./ImageUpload"
import CrimeDisplay from "./CrimeDisplay"
import "../styles/CountyInfo.css"
import CreateReview from "./CreateReview";
import ReviewList from "./ReviewList";
import { Link } from 'react-router-dom'


class CountyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false, imageUrls: [] };
  }

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_API_URL + "county/" + this.props.id)
      .then(response => {
        this.setState({
          name: response.data.name,
          state: response.data.state,
          population: response.data.population,
          imageUrls: response.data.image_urls,
          crimes: response.data.crimes,
          loaded: true
        });
      })
      .catch(e => {
        console.log(e.message);
        this.setState({
          name: "waaa",
          state: "waaa",
          population: "waaa",
          imageUrls: [],
          loaded: true
        });
      });
  }

  render() {
    return (
      <div className="master-container">
        {this.state.loaded ? (
          <div>
            <div className="center-text">
              <h5>{this.state.name}, {this.state.state}</h5>
            </div>

            <div className="left-master-container">
              <span className="bold-text">Share a photo of {this.state.name}!</span>
              <ImageUpload id={this.props.id} />
              <div className="image-viewer-div">
                <ImageList imageUrls={this.state.imageUrls} />
              </div>

              <h6 className="bold-text">Been to {this.state.name}? Share your thoughts!</h6>
              <CreateReview id={this.props.id} />
            </div>

            <div className="right-master-container">
              <CrimeDisplay crimes={this.state.crimes} population={this.state.population} />
            </div>

            <div className="center-text">
              <h6 className="bold-text">Read some reviews below!</h6>
            </div>
            <hr></hr>
            <ReviewList id={this.props.id} />
          </div>
        ) : (
          <div>None</div>
        )}
        <Link to="/">
          <button>Back to Home</button>
        </Link>
      </div>
    );
  }
}

export default CountyInfo;
