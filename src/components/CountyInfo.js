import React, { Component } from "react";
import axios from "axios";

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

  uploadPhoto = e => {
    e.preventDefault();

    var input = this.refs["county-file-upload"]
    if (!input.files) {
      return;
    }

    var image = input.files[0];

    var formData = new FormData();
    formData.append("image", image);

    axios
      .post(
        process.env.REACT_APP_API_URL + "picture/new/" + this.props.id + "/",
        formData,
        { headers: {'Content-Type': 'multipart/form-data'}},
      )
      .then(() => {
        console.log("Success");
      })
      .catch(e => {
        console.log(e);
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
            <span>Share a photo of {this.state.name}!</span>
            <br></br>
            <form>
              <input type="file" ref="county-file-upload" accept="image/png, image/jpeg"></input>
              <button onClick={this.uploadPhoto}>Upload</button>
            </form>
            <br></br>
            <br></br>
            <div>
              <span>All photos of {this.state.name}</span>
              {this.state.imageUrls.map(url => (
                <img key={url} src={url} alt={"Unavailable."}></img>
              ))}
            </div>
            <iframe name="hiddenFrame" width="0" height="0" border="0" style={{display: "none"}}></iframe>
          </div>
        ) : (
          <div>None</div>
        )}
      </div>
    );
  }
}

export default CountyInfo;
